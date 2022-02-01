import {getRepository} from 'typeorm';
import {GeneralInformation} from '../entity/GeneralInformation';
import {Narratives} from '../entity/Narratives';
import {ConceptSections} from '../interfaces/ConceptSectionsInterface';
import {BaseError} from './BaseError';
import {ProposalHandler} from './FullProposalDomain';
import {InitiativeHandler} from './InitiativesDomain';
import {ConceptValidation} from './validation/ConceptSectionValidation';

export class ConceptHandler extends ConceptValidation {
  public sections: ConceptSections = <ConceptSections>{
    general_information: null,
    narratives: null,
    initial_theory_of_change: null,
    work_packages: null,
    key_partners: null
  };

  private metaData_;

  /**
   * @returns stage section metadata
   */
  public get metaData() {
    try {
      this.metaData_ = this.queryRunner.query(
        `SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_})`
      );
      return this.metaData_;
    } catch (error) {
      throw new BaseError('Get Metadata', 400, error.message, false);
    }
  }

  /***** REPLICATION PROCESS - forward *******/

  async forwardStage() {
    try {
      // current intiative by stage entity
      const curruentInitvByStg = await this.initvStage;
      // get full proposal stage id
      const pplStage = await this.queryRunner.query(
        `SELECT * FROM stages WHERE description LIKE 'Full Proposal'`
      );

      // create proposal (next stage) object

      const proposalObject = new ProposalHandler(
        null,
        pplStage[0].id,
        curruentInitvByStg[0].initiativeId
      );

      /**GENERAL INFORMATION */

      // get concept general information data
      const conceptGeneralInformation = await this.getGeneralInformation();

      // get general information if exists from proposalObject
      const proposalGI = await proposalObject.getGeneralInformation();

      // upsert full proposal general infomation
      const pplGeneralInformation =
        await proposalObject.upsertGeneralInformation(
          proposalGI ? proposalGI.generalInformationId : null,
          conceptGeneralInformation.name,
          conceptGeneralInformation.action_area_id,
          conceptGeneralInformation.action_area_description
        );

      /**WORK PACKAGES*/

      //get concept  work packages information data
      const conceptWorkPackagesInformation = await this.getWorkPackages();

      // get  work packages if exists from proposalObject
      const proposalWP = await proposalObject.getWorkPackage();

      // upsert full proposal work Package
      const pplWorkPackageInformation =
        await proposalObject.upsertWorkPackagesRepl(
          proposalWP,
          conceptWorkPackagesInformation
        );

      /**GEOGRAPHIC SCOPE*/

      await this.forwardGeoScope(pplStage[0]);
      const pplGeoScope = await proposalObject.getGeoScope();

      // return null;
      return {pplGeneralInformation, pplGeoScope, pplWorkPackageInformation};
    } catch (error) {
      throw new BaseError('Concept: Forward', 400, error.message, false);
    }
  }

  /**
   *
   * @returns { narratives }
   */
  async getNarratives() {
    // get initiative by stage id from intitiative
    const initvStgId: string = this.initvStgId_;
    try {
      // general information sql query
      const GIquery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                narr.challenges AS challenge,
                narr.objectives AS objecives,
                narr.results AS results,
                narr.highlights AS highlights
            
            FROM
                initiatives_by_stages initvStgs
            LEFT JOIN narratives narr ON narr.initvStgId = initvStgs.id
            
            WHERE initvStgs.id = ${initvStgId};
        `;
      const narratives = await this.queryRunner.query(GIquery);

      return narratives[0];
    } catch (error) {
      throw new BaseError('Get narratives', 400, error.message, false);
    }
  }

  async getWorkPackages() {
    const initvStgId: string = this.initvStgId_;

    try {
      const WPquery = `
            SELECT acronym,name,pathway_content,initvStgId
              FROM work_packages
             WHERE initvStgId = ${initvStgId}
               AND active = 1
            `;

      const workPackages = await this.queryRunner.query(WPquery);

      return workPackages;
    } catch (error) {
      throw new BaseError('Get Work Packages', 400, error.message, false);
    }
  }

  /**
   * UPSERT GENERAL INFORMATION
   * @param generalInformationId?
   * @param name
   * @param action_area_id
   * @param action_area_description
   * @returns generalInformation
   */
  async upsertGeneralInformation(
    generalInformationId?,
    name?,
    action_area_id?,
    action_area_description?,
    acronym?
  ) {
    const gnralInfoRepo = getRepository(GeneralInformation);
    //  create empty object
    let generalInformation: GeneralInformation;
    try {
      // get current intiative by stage
      const initvStg = await this.initvStage;
      // get clarisa action action areas
      // create new Meta Data object
      const initiativeshandler = new InitiativeHandler();
      const actionAreas = await initiativeshandler.requestActionAreas();

      // get select action areas for initiative
      const selectedActionArea = actionAreas.find(
        (area) => area.id == action_area_id
      ) || {name: null};

      // if null, create object
      if (generalInformationId == null) {
        generalInformation = new GeneralInformation();
        generalInformation.name = name;
        generalInformation.acronym = acronym;
        generalInformation.action_area_description =
          action_area_description || selectedActionArea.name;
        generalInformation.action_area_id = action_area_id;
        // assign initiative by stage
        generalInformation.initvStg = initvStg[0].id;
      } else {
        generalInformation = await gnralInfoRepo.findOne(generalInformationId);
        generalInformation.name = name ? name : generalInformation.name;
        generalInformation.acronym = acronym
          ? acronym
          : generalInformation.acronym;
        generalInformation.action_area_description = selectedActionArea.name;
        generalInformation.action_area_id = action_area_id
          ? action_area_id
          : generalInformation.action_area_id;
      }
      // upserted data
      let upsertedInfo = await gnralInfoRepo.save(generalInformation);

      //    update initiative name
      let initiative = await this.initiativeRepo.findOne(
        initvStg[0].initiativeId
      );
      initiative.name = upsertedInfo.name;
      initiative.acronym = upsertedInfo.acronym;
      initiative = await this.initiativeRepo.save(initiative);

      // retrieve general information
      const GIquery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                general.id AS generalInformationId,
                IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
                IF(general.acronym IS NULL OR general.acronym = '' , (SELECT acronym FROM initiatives WHERE id = initvStgs.initiativeId ), general.acronym) AS acronym,
                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
            
                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                                        
                general.action_area_description AS action_area_description,
                general.action_area_id AS action_area_id
            
            FROM
                initiatives_by_stages initvStgs
            LEFT JOIN general_information general ON general.initvStgId = initvStgs.id
            
            WHERE initvStgs.id = ${this.initvStgId_};
            `;
      const generalInfo = await this.queryRunner.query(GIquery);

      return generalInfo[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'General information : Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * GET GENERAL INFORMATION
   * @returns { generalInfo }
   */
  async getGeneralInformation() {
    // get initiative by stage id from intitiative
    const initvStgId: string = this.initvStgId_;
    try {
      // general information sql query
      const GIquery = ` 
              SELECT
                  initvStgs.id AS initvStgId,
                  general.id AS generalInformationId,
                  IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
                  IF(general.acronym IS NULL OR general.acronym = '' , (SELECT acronym FROM initiatives WHERE id = initvStgs.initiativeId ), general.acronym) AS acronym,
                  (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                  (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                  (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
              
                  (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                  (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                  (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                                          
                  general.action_area_description AS action_area_description,
                  general.action_area_id AS action_area_id
              
              FROM
                  initiatives_by_stages initvStgs
              LEFT JOIN general_information general ON general.initvStgId = initvStgs.id
              
              WHERE initvStgs.id = ${initvStgId};
          `;
      const generalInfo = await this.queryRunner.query(GIquery);

      return generalInfo[0];
    } catch (error) {
      throw new BaseError('Get general information', 400, error.message, false);
    }
  }

  /**
   * UPSERT NARRATIVES
   * @param generalInformationId?
   * @param name
   * @param action_area_id
   * @param action_area_description
   * @returns generalInformation
   */

  async upsertNarratives(
    narrativeId?,
    challenge?,
    objectives?,
    results?,
    highlights?
  ) {
    const narrativesRepo = getRepository(Narratives);
    //  create empty object
    let narrative: Narratives;
    try {
      // get current intiative by stage
      await this.initvStage;

      // if null, create object
      if (narrativeId == null) {
        narrative = new Narratives();
      } else {
        narrative = await narrativesRepo.findOne(narrativeId);
      }
      narrative.challenge = challenge;
      narrative.objectives = objectives;
      narrative.results = results;
      narrative.highlights = highlights;

      // upserted data
      await narrativesRepo.save(narrative);

      // retrieve general information
      const sqlQuery = ` 
            SELECT
                challenge,
                objectives,
                results,
                highlights

            FROM
                narratives
            WHERE initvStgs.id = ${this.initvStgId_};
            `;
      const narratives = await this.queryRunner.query(sqlQuery);

      return narratives[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'General information : Concept',
        400,
        error.message,
        false
      );
    }
  }

  async upsertIntialToc(
    initiativeId?,
    ubication?,
    tocs_id?,
    narrative?,
    active?,
    section?,
    updateFiles?
  ) {}
}
