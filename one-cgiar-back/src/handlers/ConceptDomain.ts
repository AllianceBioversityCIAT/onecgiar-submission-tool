import {getRepository} from 'typeorm';
import {
  Context,
  Files,
  TOCs,
  GeneralInformation,
  Highlights,
  Narratives,
  WorkPackages
} from '../entity';
import {ConceptSections} from '../interfaces/ConceptSectionsInterface';
import {ToolsSbt} from '../utils/toolsSbt';
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

  /**
   * UPSERT INITIAL TOC AND FILE
   * @param initiativeId
   * @param ubication
   * @param stage
   * @param tocs_id
   * @param narrative
   * @param active
   * @param section
   * @param files
   * @param updateFiles
   * @returns  {upsertedInitialTocs, upsertedFile};
   */
  async upsertIntialToc(
    initiativeId?,
    ubication?,
    stage?,
    tocs_id?,
    narrative?,
    active?,
    section?,
    files?,
    updateFiles?
  ) {
    const initialTocsRepo = getRepository(TOCs);
    const filesRepo = getRepository(Files);

    var host = `${process.env.EXT_HOST}`;
    const path = 'uploads';
    const initvStgId = this.initvStgId_;

    let newInitialTocs = new TOCs();
    let newFiles = new Files();

    var upsertedInitialTocs;
    var upsertedFile;

    try {
      newInitialTocs.id = tocs_id;
      newInitialTocs.narrative = narrative;
      newInitialTocs.active = active;

      if (newInitialTocs.id !== null) {
        var savedInitialTocs = await initialTocsRepo.findOne(newInitialTocs.id);

        initialTocsRepo.merge(savedInitialTocs, newInitialTocs);

        upsertedInitialTocs = await initialTocsRepo.save(savedInitialTocs);
      } else {
        newInitialTocs.initvStgId = initvStgId;

        upsertedInitialTocs = await initialTocsRepo.save(newInitialTocs);
        
      }

      if (host == 'http://localhost') {
        host = `${process.env.EXT_HOST}:${process.env.PORT}`;
      } else {
        host = `${process.env.EXT_HOST}`;
      }

      files = typeof files === 'undefined' ? [] : files;
      if (files) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          const urlDB = `${host}/${path}/INIT-${initiativeId}/${ubication}/stage-${stage.id}/${file.filename}`;
          newFiles.id = null;
          newFiles.active = file.active;
          newFiles.tocsId = upsertedInitialTocs.id;
          newFiles.section = section;
          newFiles.url = urlDB;
          newFiles.name = file.originalname;

          if (newFiles.id !== null) {
            var savedFiles = await filesRepo.findOne(newFiles.id);

            filesRepo.merge(savedFiles, file);

            upsertedFile = await filesRepo.save(savedFiles);
          } else {
            upsertedFile = await filesRepo.save(newFiles);
          }
        }
      }
      updateFiles = typeof updateFiles === 'undefined' ? [] : updateFiles;
      if (updateFiles.length > 0) {
        for (let index = 0; index < updateFiles.length; index++) {
          const updateFile = updateFiles[index];

          newFiles.id = updateFile.id;
          newFiles.active = updateFile.active;
          newFiles.tocsId = updateFile.tocsId;
          newFiles.section = updateFile.section;
          newFiles.url = updateFile.urlDB;
          newFiles.name = updateFile.originalname;

          if (newFiles.id !== null) {
            var savedFiles = await filesRepo.findOne(newFiles.id);

            filesRepo.merge(savedFiles, updateFile);

            upsertedFile = await filesRepo.save(savedFiles);
          } else {
            upsertedFile = await filesRepo.save(newFiles);
          }
        }
      }

      return {upsertedInitialTocs, upsertedFile};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert initial Tocs: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST INITIAL TOC AND FILE
   * @param sectionName
   * @returns initialToc[0]
   */
  async requestInitialToc(sectionName:any) {
    const initvStgId = this.initvStgId_;

  
    try {
      // retrieve general information
      const filesQuery = `
                    SELECT * 
                    FROM files 
                   WHERE tocsId in (SELECT id
                    FROM tocs
                   WHERE initvStgId = ${initvStgId}
                     AND active = 1)
                     AND section = "${sectionName}"
                     AND active = 1
                `,
        intialTocQuery = `
        SELECT id,initvStgId,narrative,type,active
         FROM tocs
        WHERE initvStgId = ${initvStgId}
          AND active = 1
                    `;
      const files = await this.queryRunner.query(filesQuery);
      const initialToc = await this.queryRunner.query(intialTocQuery);

      initialToc.map((toc) => {
        toc['files'] = files.filter((f) => {
          return f.tocId === toc.id;
        });
      });

      return initialToc[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get manage Initial Toc and files: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * UPSERT HIGHLIGHTS INITIATIVE STATEMENT
   * @param highlights
   * @returns
   */
  async upsertHighlights(highlights?: any) {
    const initvStgId = this.initvStgId_;

    const highlightsRepo = getRepository(Highlights);
    const toolsSbt = new ToolsSbt();
    const highlightsArray = [];

    try {
      for (let index = 0; index < highlights.length; index++) {
        const element = highlights[index];
        const newHighlights = new Highlights();
        newHighlights.id = element.id;
        newHighlights.initvStgId = initvStgId;
        newHighlights.name = element.name;
        newHighlights.description = element.description;
        newHighlights.active;

        highlightsArray.push(
          toolsSbt.mergeData(
            highlightsRepo,
            `SELECT * 
             FROM highlights
            WHERE id = ${newHighlights.id}
              and initvStgId = ${initvStgId}`,
            newHighlights
          )
        );
      }

      let mergeHighligths = await Promise.all(highlightsArray);

      let upsertHighligths = await highlightsRepo.save(mergeHighligths);

      return upsertHighligths;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert highlight: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * UPSERT INITIATIVE STATEMENT
   * @param context
   * @returns
   */
  async upsertContext(context?: any) {
    const initvStgId = this.initvStgId_;
    const contextRepo = getRepository(Context);
    const newContextPreconcept = new Context();
    const toolsSbt = new ToolsSbt();

    try {
      newContextPreconcept.id = context.id;
      newContextPreconcept.initvStg = initvStgId;
      newContextPreconcept.challenge_statement = context.challengeStatement;
      newContextPreconcept.smart_objectives = context.objectiveStament;
      newContextPreconcept.active = context.active;

      const contextMerge = await toolsSbt.mergeData(
        contextRepo,
        `SELECT * 
           FROM context
          WHERE id = ${newContextPreconcept.id}
            and initvStgId = ${initvStgId}`,
        newContextPreconcept
      );

      const contextSaved = await contextRepo.save(contextMerge);

      return contextSaved;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Context: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST INITIATIVE STATEMENT
   * (HIGHLIGHTS AND CONTEXT)
   */

  async requestInitiativeStatement() {
    const initvStgId = this.initvStgId_;

    try {
      // retrieve general information
      const highlightsQuery = `
      SELECT * 
      FROM highlights
     WHERE initvStgId = ${initvStgId}
                `,
        contextQuery = `
        SELECT * 
        FROM context 
       WHERE initvStgId = ${initvStgId};
                    `;
      const highlights = await this.queryRunner.query(highlightsQuery);
      let context = await this.queryRunner.query(contextQuery);

      context = context[0];

      return {highlights, context};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Initiative Statement: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT WORK PACKAGES
   * @param newWP
   * @returns upsertedInfo
   */
   async upsertWorkPackages(newWP?:any) {
    const wpRepo = getRepository(WorkPackages);
    // get current intiative by stage
    const initvStgId = this.initvStgId_;

    var upsertedInfo:any;

    try {
      if (newWP.id !== null) {
        var savedWP = await this.queryRunner.query(` SELECT *
                FROM work_packages 
               WHERE id = ${newWP.id}`);

        wpRepo.merge(savedWP[0], newWP);

        upsertedInfo = await wpRepo.save(savedWP[0]);
      } else {
        newWP.initvStgId =initvStgId;

        upsertedInfo = await wpRepo.save(newWP);
      }

      return upsertedInfo;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Work Package: Pre Concept',
        400,
        error.message,
        false
      );
    }
  }

/**
 * GET WORK PACKAGES BY INITIATIVE
 * @returns 
 */
  async getWorkPackage() {
    // const initvStgId: string = this.initvStgId_;
    const initvStgId: string = this.initvStgId_;

    try {
      let COquery = `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE initvStgId = ${initvStgId}
                 AND active = 1
              GROUP BY id,country_id`,
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE initvStgId = ${
                  initvStgId
                 }
                   AND active = 1
                GROUP BY id,region_id
                `,
        /*eslint-disable*/
        WPquery = `
                    SELECT id, initvStgId,name, active, acronym,pathway_content,is_global,
                    IF (
                        name IS NULL
                        OR name = ''
                        OR pathway_content IS NULL
                        OR pathway_content = ''
                        OR acronym IS NULL
                        OR acronym = ''
                        OR ((LENGTH(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>',''))) 
                        - (LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1)) > 3 
                        OR ((LENGTH(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>',''))) 
                        - (LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1)) > 30
                        OR ((LENGTH(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>',''))) 
                        - (LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1)) > 100
                        OR (SELECT COUNT(id) FROM countries_by_initiative_by_stage WHERE wrkPkgId = wp.id ) = 0
                        OR (SELECT COUNT(id) FROM regions_by_initiative_by_stage WHERE wrkPkgId = wp.id  ) = 0,
                        false,
                        true
                    ) AS validateWP
                   FROM work_packages wp 
                  WHERE wp.initvStgId =  ${
                    initvStgId
                  }
                    AND wp.active = 1                    
                    `;
      /*eslint-enable*/

      // var workPackages = await wpRepo.find({ where: { initvStg: initvStg.id ? initvStg.id : initvStg[0].id, active: 1 } });
      var workPackages = await this.queryRunner.query(WPquery);

      workPackages.map((wp) => {
        wp.validateWP = parseInt(wp.validateWP);
      });

      const regions = await this.queryRunner.query(REquery);
      const countries = await this.queryRunner.query(COquery);

      if (workPackages == undefined || workPackages.length == 0) {
        workPackages = [];
      } else {
        // Map Initiatives
        workPackages.map((wp) => {
          wp['regions'] = regions.filter((reg) => {
            return reg.wrkPkgId === wp.id;
          });

          wp['countries'] = countries.filter((cou) => {
            return cou.wrkPkgId === wp.id;
          });
        });
      }

      return workPackages;
    } catch (error) {
      throw new BaseError('Get workpackage', 400, error.message, false);
    }
  }


 /**
  * GET WORK PACKAGE BY ID
  * @param id 
  * @returns 
  */
    async getWorkPackageId(id) {
    // const initvStgId: string = this.initvStgId_;
    // const initvStg = await this.initvStage
    const wpRepo = getRepository(WorkPackages);

    try {
      let COquery = `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE wrkPkgId = ${id}
                 AND active = 1
              GROUP BY id,country_id`,
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE wrkPkgId = ${id}
                   AND active = 1
                GROUP BY id,region_id
                `;

      var workPackages = await wpRepo.find({where: {id: id, active: 1}});
      const regions = await this.queryRunner.query(REquery);
      const countries = await this.queryRunner.query(COquery);

      if (workPackages == undefined || workPackages.length == 0) {
        workPackages = [];
      } else {
        // Map Initiatives
        workPackages.map((geo) => {
          geo['regions'] = regions.filter((wp) => {
            return wp.wrkPkgId === geo.id;
          });

          geo['countries'] = countries.filter((wp) => {
            return wp.wrkPkgId === geo.id;
          });
        });
      }

      return workPackages[0];
    } catch (error) {
      throw new BaseError('Get workpackage', 400, error.message, false);
    }
  }

}
