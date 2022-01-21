import _ from 'lodash';
import {getRepository, In} from 'typeorm';
import {getClaActionAreas} from '../controllers/Clarisa';
import * as entities from '../entity';
import {ProposalSections} from '../interfaces/FullProposalSectionsInterface';
import {ToolsSbt} from '../utils/toolsSbt';
import {BaseError} from './BaseError';
import {InitiativeStageHandler} from './InitiativeStageDomain';

export class ProposalHandler extends InitiativeStageHandler {
  public sections: ProposalSections = <ProposalSections>{
    general_information: null,
    context: null
  };

  private metaData_;

  /**
   * Getter
   * @returns stage section metadata
   */
  public get metaData() {
    return this.metaData_;
  }

  /**
   * Setter
   * @set section name
   */
  public set metaData(sectionName: any) {
    try {
      this.metaData_ = this.queryRunner.query(
        ` SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_}) ORDER BY stages_meta.order`
      );
    } catch (error) {
      throw new BaseError('Get Metadata', 400, error.message, false);
    }
  }

  /*****  FULL PROPOSAL GETTERS *******/

  /**
   *
   * @returns { generalInfo }
   */
  async getGeneralInformation() {
    // get initiative by stage id from intitiative
    const initvStg = await this.initvStage;

    let generalInfo;

    // string = this.initvStgId_;
    try {
      // general information sql query

      if (initvStg.length == 0 || initvStg == undefined) {
        generalInfo = [];
      } else {
        const GIquery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                general.id AS generalInformationId,
                IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
            
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
            
            WHERE initvStgs.id = ${initvStg[0].id};
            
        `;

        generalInfo = await this.queryRunner.query(GIquery);
      }

      return generalInfo[0];
    } catch (error) {
      throw new BaseError('Get general information', 400, error.message, false);
    }
  }

  /**
   *
   * @returns { context }
   */
  async getContext() {
    // get initiative by stage id from intitiative
    const initvStgId: string = this.initvStgId_;
    try {
      // contex sql query
      const contextQuery = `SELECT * FROM context WHERE initvStgId = ${initvStgId}`;

      const context = await this.queryRunner.query(contextQuery);

      return context[0];
    } catch (error) {
      throw new BaseError('Get context', 400, error.message, false);
    }
  }

  async getWorkPackage() {
    // const initvStgId: string = this.initvStgId_;
    const initvStg = await this.initvStage;

    try {
      let COquery = `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE initvStgId = ${initvStg.id ? initvStg.id : initvStg[0].id}
                 AND active = 1
              GROUP BY id,country_id`,
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE initvStgId = ${
                   initvStg.id ? initvStg.id : initvStg[0].id
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
                    initvStg.id ? initvStg.id : initvStg[0].id
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

  async getWorkPackageId(id) {
    // const initvStgId: string = this.initvStgId_;
    // const initvStg = await this.initvStage
    const wpRepo = getRepository(entities.WorkPackages);

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

  async requestAllWorkPackages() {
    // const initvStgId: string = this.initvStgId_;
    // const initvStg = await this.initvStage

    try {
      let COquery = `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE active = 1
              GROUP BY id,country_id`,
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE active = 1
                GROUP BY id,region_id
                `,
        WPquery = `
                    SELECT wp.initvStgId,init.initiativeId,init.stageId,wp.*
                      FROM work_packages wp
                      JOIN initiatives_by_stages init
                     WHERE wp.initvStgId = init.id
                       AND wp.active = 1
                    `;

      // var workPackages = await wpRepo.find({ where: { active: 1 } });
      var workPackages = await this.queryRunner.query(WPquery);
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
      throw new BaseError('Get All work packages', 400, error.message, false);
    }
  }

  /*******  FULL PROPOSAL SETTERS   *********/

  /**
   ** UPSERT GENERAL INFORMATION
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
    action_area_description?
  ) {
    const gnralInfoRepo = getRepository(entities.GeneralInformation);

    //  create empty object
    let generalInformation: entities.GeneralInformation;
    try {
      // get current intiative by stage
      // const initvStg = await this.initvStage;
      const initvStg = await this.setInitvStage();

      // get clarisa action action areas
      const actionAreas = await getClaActionAreas();

      // get select action areas for initiative
      const selectedActionArea = actionAreas.find(
        (area) => area.id == action_area_id
      ) || {name: null};

      // if null, create object
      if (generalInformationId == null) {
        generalInformation = new entities.GeneralInformation();
        generalInformation.name = name;

        generalInformation.action_area_description =
          action_area_description || selectedActionArea.name;
        generalInformation.action_area_id = action_area_id;
        // assign initiative by stage
        generalInformation.initvStg = initvStg.id;
      } else {
        generalInformation = await gnralInfoRepo.findOne(generalInformationId);
        generalInformation.name = name ? name : generalInformation.name;
        generalInformation.action_area_description = selectedActionArea.name;
        generalInformation.action_area_id = action_area_id
          ? action_area_id
          : generalInformation.action_area_id;
      }
      // upserted data
      let upsertedInfo = await gnralInfoRepo.save(generalInformation);

      //    update initiative name
      let initiative = await this.initiativeRepo.findOne(initvStg.initiativeId);
      initiative.name = upsertedInfo.name;
      initiative = await this.initiativeRepo.save(initiative);

      // retrieve general information
      const GIquery = ` 
            SELECT
            initvStgs.id AS initvStgId,
            general.id AS generalInformationId,
            IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
            
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
            
            WHERE initvStgs.id = ${initvStg.id};
            `;
      const generalInfo = await this.queryRunner.query(GIquery);

      return generalInfo[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'General information : Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT CONTEXT
   * @param contextId?
   * @param challenge_statement
   * @param smart_objectives
   * @param key_learnings
   * @param priority_setting
   * @param comparative_advantage
   * @param participatory_design
   * @returns context
   */
  async upsertContext(
    contextId?,
    challenge_statement?,
    smart_objectives?,
    key_learnings?,
    priority_setting?,
    comparative_advantage?,
    participatory_design?
  ) {
    const contextRepo = getRepository(entities.Context);
    //  create empty object
    let context: entities.Context;
    try {
      // get current intiative by stage
      const initvStg = await this.initvStage;

      // if null, create object
      if (contextId == null) {
        context = new entities.Context();
        // assign initiative by stage
        context.initvStg = initvStg[0].id;
      } else {
        context = await contextRepo.findOne(contextId);
      }
      // console.log(contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design);

      context.challenge_statement = challenge_statement
        ? challenge_statement
        : context.challenge_statement;
      context.smart_objectives = smart_objectives
        ? smart_objectives
        : context.smart_objectives;
      context.key_learnings = key_learnings
        ? key_learnings
        : context.key_learnings;
      context.priority_setting = priority_setting
        ? priority_setting
        : context.priority_setting;
      context.comparative_advantage = comparative_advantage
        ? comparative_advantage
        : context.comparative_advantage;
      context.participatory_design = participatory_design
        ? participatory_design
        : context.participatory_design;

      // upserted data
      const upsertedContext = await contextRepo.save(context);

      return upsertedContext;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert context - full proposal',
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
  async upsertWorkPackages(newWP?) {
    const wpRepo = getRepository(entities.WorkPackages);
    // get current intiative by stage
    const initvStg = await this.initvStage;

    var upsertedInfo;

    try {
      if (newWP.id !== null) {
        var savedWP = await this.queryRunner.query(` SELECT *
                FROM work_packages 
               WHERE id = ${newWP.id}`);

        wpRepo.merge(savedWP[0], newWP);

        upsertedInfo = await wpRepo.save(savedWP[0]);
      } else {
        newWP.initvStgId = initvStg[0].id ? initvStg[0].id : initvStg.id;

        upsertedInfo = await wpRepo.save(newWP);
      }

      return upsertedInfo;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Work Package: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT WORK PACKAGES REPLICATION
   * @param workPackageId
   * @param acronym
   * @param name
   * @param pathway_content
   * @returns workPackageInfo
   */
  async upsertWorkPackagesRepl(fullProposalWP?, conceptWP?) {
    const wpRepo = getRepository(entities.WorkPackages);

    //  create empty object
    var workPackage = [];
    try {
      // get current intiative by stage
      const initvStg = await this.setInitvStage();

      if (fullProposalWP.length > 0) {
        for (let index = 0; index < fullProposalWP.length; index++) {
          const proposalWP = fullProposalWP[index];

          for (let index = 0; index < conceptWP.length; index++) {
            var conceptWp = conceptWP[index];
            conceptWp.initvStg = initvStg.id;

            if (proposalWP.acronym == conceptWp.acronym) {
              workPackage.push(proposalWP);
            }
          }
        }
      } else {
        for (let index = 0; index < conceptWP.length; index++) {
          var conceptWp = conceptWP[index];
          conceptWp.initvStg = initvStg.id;

          workPackage.push(conceptWp);
        }
      }

      // upserted data
      await wpRepo.save(workPackage);

      // retrieve general information
      const WPquery = ` 
             SELECT acronym,name,pathway_content,initvStgId
               FROM work_packages
              WHERE initvStgId = ${initvStg.id}
                AND active = 1;
            `;
      const workPackageInfo = await this.queryRunner.query(WPquery);

      return workPackageInfo[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Work Package Replication: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT PROJECTION BENEFITS
   * @param projectionBenefitsId
   * @param impact_area_id
   * @param impact_area_name
   * @param impact_area_indicator_id
   * @param impact_area_indicator_name
   * @param notes
   * @param depth_scale_id
   * @param probability_id
   * @param impact_area_active
   * @param active
   * @param dimensions
   * @returns { upsertedPjectionBenefits, upsertedDimensions }
   */
  async upsertProjectionBenefits(
    projectionBenefitsId?,
    impact_area_id?,
    impact_area_name?,
    impact_area_indicator_id?,
    impact_area_indicator_name?,
    notes?,
    depth_scale_id?,
    depthScaleName?,
    probability_id?,
    probabilityName?,
    impact_area_active?,
    active?,
    dimensions?
  ) {
    const projBeneRepo = getRepository(entities.ProjectionBenefits);
    const dimensionsRepo = getRepository(entities.Dimensions);
    const initvStg = await this.setInitvStage();
    var newWorkProjectionBenefits = new entities.ProjectionBenefits();
    var newDimensions = new entities.Dimensions();
    var upsertedPjectionBenefits;
    var upsertedDimensions;

    newWorkProjectionBenefits.id = projectionBenefitsId;
    newWorkProjectionBenefits.impact_area_id = impact_area_id;
    newWorkProjectionBenefits.impact_area_name = impact_area_name;
    newWorkProjectionBenefits.impact_area_indicator_id =
      impact_area_indicator_id;
    newWorkProjectionBenefits.impact_area_indicator_name =
      impact_area_indicator_name;
    newWorkProjectionBenefits.notes = notes;
    newWorkProjectionBenefits.depth_scale_id = depth_scale_id;
    newWorkProjectionBenefits.depth_scale_name = depthScaleName;
    newWorkProjectionBenefits.probability_id = probability_id;
    newWorkProjectionBenefits.probability_name = probabilityName;
    newWorkProjectionBenefits.impact_area_active = impact_area_active;
    newWorkProjectionBenefits.wrkPkg = null;
    newWorkProjectionBenefits.active = active;

    try {
      if (newWorkProjectionBenefits.id !== null) {
        var savedProjectionBenefits = await projBeneRepo.findOne(
          newWorkProjectionBenefits.id
        );

        projBeneRepo.merge(savedProjectionBenefits, newWorkProjectionBenefits);

        upsertedPjectionBenefits = await projBeneRepo.save(
          savedProjectionBenefits
        );
      } else {
        newWorkProjectionBenefits.initvStgId = initvStg.id;

        upsertedPjectionBenefits = await projBeneRepo.save(
          newWorkProjectionBenefits
        );
      }

      if (dimensions.length > 0) {
        for (let index = 0; index < dimensions.length; index++) {
          const dim = dimensions[index];

          newDimensions.id = dim.id;
          newDimensions.projectionId = upsertedPjectionBenefits.id;
          newDimensions.depthDescriptionId = dim.descriptionID;
          newDimensions.breadth_value = dim.breadth_value;
          newDimensions.active = dim.active;
          newDimensions.depth_description = dim.depthDescription;

          if (newDimensions.id !== null) {
            var savedDimensions: any = await dimensionsRepo.findOne(
              newDimensions.id
            );

            dimensionsRepo.merge(savedDimensions, newDimensions);

            upsertedDimensions = await dimensionsRepo.save(savedDimensions);
          } else {
            upsertedDimensions = await dimensionsRepo.save(newDimensions);
          }
        }
      }

      return {upsertedPjectionBenefits, upsertedDimensions};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Projection Benefits: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST PROJECTION BENEFITS
   * @returns { projectBenefits }
   */
  async requestProjectionBenefits() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const prjBenQuery = ` 
            SELECT  id,active,wrkPkgId,impact_area_indicator_id as impactAreaIndicator,
            impact_area_id as impactAreaId, impact_area_indicator_name as impactAreaIndicatorName,
            impact_area_name as impactAreaName,notes,created_at,updated_at,initvStgId,
            depth_scale_id as depthScaleId,probability_id as probabilityID,probability_name as probabilityName,impact_area_active
            FROM projection_benefits
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `,
        dimensionsQuery = `
                SELECT id,projectionId,depthDescriptionId as descriptionID,breadth_value,active,created_at,updated_at
                FROM dimensions
               WHERE projectionId in (SELECT id
                FROM projection_benefits
               WHERE initvStgId = ${initvStg.id})
                 AND active = 1
                `;

      const projectBenefits = await this.queryRunner.query(prjBenQuery);
      const dimensions = await this.queryRunner.query(dimensionsQuery);

      projectBenefits.map((pb) => {
        pb['dimensions'] = dimensions.filter((dim) => {
          return dim.projectionId === pb.id;
        });
      });

      return projectBenefits;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Projection Benefits: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST PROJECTION BENEFITS BY IMPACT AREA
   * @returns { projectBenefits }
   */
  async requestProjectionBenefitsByImpact(impactAreaId) {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const prjBenQuery = ` 
                SELECT  id,active,wrkPkgId,impact_area_indicator_id as impactAreaIndicator,
                impact_area_id as impactAreaId, impact_area_indicator_name as impactAreaIndicatorName,
                impact_area_name as impactAreaName,notes,created_at,updated_at,initvStgId,
                depth_scale_id as depthScaleId,probability_id as probabilityID,probability_name as probabilityName,impact_area_active
                FROM projection_benefits
               WHERE initvStgId = ${initvStg.id}
                 AND impact_area_id = ${impactAreaId}
                 AND active = 1;
                `,
        dimensionsQuery = `
                    SELECT id,projectionId,depthDescriptionId as descriptionID,breadth_value,active,created_at,updated_at
                    FROM dimensions
                   WHERE projectionId in (SELECT id
                    FROM projection_benefits
                   WHERE initvStgId = ${initvStg.id})
                     AND active = 1
                    `;

      const projectBenefits = await this.queryRunner.query(prjBenQuery);
      const dimensions = await this.queryRunner.query(dimensionsQuery);

      projectBenefits.map((pb) => {
        pb['dimensions'] = dimensions.filter((dim) => {
          return dim.projectionId === pb.id;
        });
      });

      return projectBenefits;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Projection Benefits: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT IMPACT STRATEGIES
   * @param impact_strategies_id
   * @param active
   * @param challenge_priorization
   * @param research_questions
   * @param component_work_package
   * @param performance_results
   * @param human_capacity
   * @param partners
   * @returns { upsertedImpactStrategies,upsertedPartners }
   */
  async upsertImpactStrategies(
    impact_strategies_id?,
    active?,
    challenge_priorization?,
    research_questions?,
    component_work_package?,
    performance_results?,
    human_capacity?,
    impact_area_id?,
    impact_area_name?,
    partners?
  ) {
    const impactStrategiesRepo = getRepository(entities.ImpactStrategies);
    const partnersRepo = getRepository(entities.Partners);
    const initvStg = await this.setInitvStage();
    var newImpactStrategies = new entities.ImpactStrategies();
    var newPartners = new entities.Partners();
    var upsertedImpactStrategies;
    var upsertedPartners;

    newImpactStrategies.id = impact_strategies_id;
    newImpactStrategies.active = active ? active : true;
    newImpactStrategies.challenge_priorization = challenge_priorization;
    newImpactStrategies.research_questions = research_questions;
    newImpactStrategies.component_work_package = component_work_package;
    newImpactStrategies.performance_results = performance_results;
    newImpactStrategies.human_capacity = human_capacity;
    newImpactStrategies.impact_area_id = impact_area_id;
    newImpactStrategies.impact_area_name = impact_area_name;

    try {
      if (newImpactStrategies.id !== null) {
        var savedImpactStrategies = await impactStrategiesRepo.findOne(
          newImpactStrategies.id
        );

        impactStrategiesRepo.merge(savedImpactStrategies, newImpactStrategies);

        upsertedImpactStrategies = await impactStrategiesRepo.save(
          savedImpactStrategies
        );
      } else {
        newImpactStrategies.initvStgId = initvStg.id;

        upsertedImpactStrategies = await impactStrategiesRepo.save(
          newImpactStrategies
        );
      }

      if (partners.length > 0) {
        for (let index = 0; index < partners.length; index++) {
          const par = partners[index];

          newPartners.id = par.id;
          newPartners.impact_strategies_id = upsertedImpactStrategies.id;
          newPartners.institutions_id = par.code;
          newPartners.institutions_name = par.name;
          newPartners.tag_id = par.tag_id ? par.tag_id : null;
          newPartners.type_id = par.institutionTypeId
            ? par.institutionTypeId
            : null;
          newPartners.type_name = par.institutionType;
          newPartners.active = par.active;
          newPartners.demand = par.demand;
          newPartners.innovation = par.innovation;
          newPartners.scaling = par.scaling;

          if (newPartners.id !== null) {
            var savedPartners = await partnersRepo.findOne(newPartners.id);

            partnersRepo.merge(savedPartners, newPartners);

            upsertedPartners = await partnersRepo.save(savedPartners);
          } else {
            upsertedPartners = await partnersRepo.save(newPartners);
          }
        }
      }

      return {upsertedImpactStrategies, upsertedPartners};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Impact Strategies: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST IMPACT STRATEGIES
   */
  async requestImpactStrategies(impact_area_id) {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const impStraQuery = ` 
            SELECT *
            FROM impact_strategies
           WHERE initvStgId = ${initvStg.id}
             AND impact_area_id = ${impact_area_id}
             AND active = 1;
            `,
        partnersQuery = `
                SELECT id,impact_strategies_id,institutions_id as code,
                       institutions_name as name,tag_id,demand,innovation,scaling,type_id as institutionTypeId,
                       type_name as institutionType,active,created_at,updated_at
                FROM partners
               WHERE impact_strategies_id in (SELECT id
                FROM impact_strategies
               WHERE initvStgId = ${initvStg.id}
               AND impact_area_id = ${impact_area_id}
               AND active = 1
               )
                 AND active = 1
                `;

      const impactStrategies = await this.queryRunner.query(impStraQuery);
      const partners = await this.queryRunner.query(partnersQuery);

      impactStrategies.map((imp) => {
        imp['partners'] = partners.filter((par) => {
          return par.impact_strategies_id === imp.id;
        });
      });

      return impactStrategies[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Impact Strategies: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT MELIA and Files
   * @param initiativeId
   * @param ubication
   * @param stege
   * @param meliaId
   * @param melia_plan
   * @param meliaActive
   * @param section
   * @param files
   * @param updateFiles
   * @returns { upsertedMelia, upsertedFile }
   */
  async upsertMeliaAndFiles(
    initiativeId?,
    ubication?,
    stege?,
    melia_plan?,
    section?,
    files?
  ) {
    const meliaRepo = getRepository(entities.Melia);
    const filesRepo = getRepository(entities.Files);
    const initvStg = await this.setInitvStage();
    var host = `${process.env.EXT_HOST}`;
    const path = 'uploads';

    var newMelia = new entities.Melia();
    var newFiles = new entities.Files();
    var upsertedMelia;
    var upsertedFile;

    try {
      melia_plan = typeof melia_plan === 'undefined' ? false : melia_plan;

      console.log(melia_plan);

      if (melia_plan) {
        newMelia.id = melia_plan.meliaId;
        newMelia.melia_plan = melia_plan.melia_plan;
        newMelia.active = melia_plan.meliaActive
          ? melia_plan.meliaActive
          : true;

        if (newMelia.id !== null) {
          var savedMelia = await meliaRepo.findOne(newMelia.id);

          meliaRepo.merge(savedMelia, newMelia);

          upsertedMelia = await meliaRepo.save(savedMelia);
        } else {
          newMelia.initvStgId = initvStg.id;
          console.log('else', newMelia);
          upsertedMelia = await meliaRepo.save(newMelia);
        }
      }
      /**
       *
       *! MELIA FILES
       *
       */

      if (host == 'http://localhost') {
        host = `${process.env.EXT_HOST}:${process.env.PORT}`;
      } else {
        host = `${process.env.EXT_HOST}`;
      }
      files = typeof files === 'undefined' ? [] : files;
      if (files) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          const urlDB = `${host}/${path}/INIT-${initiativeId}/${ubication}/stage-${stege.id}/${file.filename}`;
          newFiles.id = null;
          newFiles.active = file.active ? file.active : true;
          newFiles.meliaId = upsertedMelia.id;
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
      if (melia_plan) {
        melia_plan.updateFiles =
          typeof melia_plan.updateFiles === 'undefined'
            ? []
            : melia_plan.updateFiles;
        if (melia_plan.updateFiles.length > 0) {
          for (let index = 0; index < melia_plan.updateFiles.length; index++) {
            const updateFile = melia_plan.updateFiles[index];

            newFiles.id = updateFile.id;
            newFiles.active = updateFile.active ? updateFile.active : true;
            newFiles.meliaId = updateFile.meliaId;
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
      }

      return {upsertedMelia, upsertedFile};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert melia: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT MELIA RESULTS FRAMEWORK (TABLE A,B AND C)
   * @param initiativeId
   * @param ubication
   * @param stege
   * @returns { upsertedMelia, upsertedFile }
   */
  async upsertResultsFramework(tableA?, tableB?, tableC?) {
    /**
     * GET INITIATIVE BY STAGE CODE
     */
    const initvStg = await this.setInitvStage();

    try {
      tableA = typeof tableA === 'undefined' ? [] : tableA;
      tableB = typeof tableB === 'undefined' ? [] : tableB;
      tableC = typeof tableC === 'undefined' ? [] : tableC;

      let upsertedTableA = await this.upsertTableA(tableA, initvStg.id);
      let upsertedTableB = await this.upsertTableB(tableB, initvStg.id);

      return {upsertedTableA, upsertedTableB};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert melia: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT TABLE A (Global Targets, Impacts Indicators and SDG Targets)
   * @param tableA
   * @param initvStgId
   * @returns {upsertedGlobalTargets, upsertedImpactIndicators,upsertedSdgTargets}
   */
  async upsertTableA(tableA?, initvStgId?) {
    /**
     * REPOS TABLE A
     */
    const initGlobalTargetsRepo = getRepository(
      entities.InitImpactAreaGlobalTargets
    );
    const initImpactIndicatorsRepo = getRepository(
      entities.InitImpactAreaImpactIndicators
    );
    const initSdgTargetsRepo = getRepository(entities.InitImpactAreaSdgTargets);

    /*ARRAYS*/
    const globalTargets = [];
    const impactIndicators = [];
    const sdgTargets = [];

    /*IMPORT CLASS TOOLS SBT - FUNCTION MERGE DATA */
    let toolsSbt = new ToolsSbt();

    try {
      /*Init Global Targets*/
      tableA.global_targets =
        typeof tableA.global_targets === 'undefined'
          ? []
          : tableA.global_targets;
      for (let index = 0; index < tableA.global_targets.length; index++) {
        const element = tableA.global_targets[index];
        let newinitGlobalTargets = new entities.InitImpactAreaGlobalTargets();

        newinitGlobalTargets.initvStgId = initvStgId;
        newinitGlobalTargets.active = element.active;
        newinitGlobalTargets.global_target_id = element.global_target_id;

        globalTargets.push(
          toolsSbt.mergeData(
            initGlobalTargetsRepo,
            ` 
            SELECT *
              FROM init_impact_area_global_targets
             WHERE initvStgId = ${newinitGlobalTargets.initvStgId}
               AND global_target_id = ${newinitGlobalTargets.global_target_id}`,
            newinitGlobalTargets
          )
        );
      }

      /*Init Impact Indicators */
      tableA.impact_areas_indicators =
        typeof tableA.impact_areas_indicators === 'undefined'
          ? []
          : tableA.impact_areas_indicators;
      for (
        let index = 0;
        index < tableA.impact_areas_indicators.length;
        index++
      ) {
        const element = tableA.impact_areas_indicators[index];
        let newinitImpactIndicators =
          new entities.InitImpactAreaImpactIndicators();

        newinitImpactIndicators.initvStgId = initvStgId;
        newinitImpactIndicators.impact_indicator_id =
          element.impact_indicator_id;
        newinitImpactIndicators.active = element.active;

        impactIndicators.push(
          toolsSbt.mergeData(
            initImpactIndicatorsRepo,
            ` 
            SELECT *
              FROM init_impact_area_impact_indicators
             WHERE initvStgId = ${newinitImpactIndicators.initvStgId}
               AND impact_indicator_id = ${newinitImpactIndicators.impact_indicator_id}`,
            newinitImpactIndicators
          )
        );
      }
      /*Init SDG Targets */
      tableA.sdg_targets =
        typeof tableA.sdg_targets === 'undefined' ? [] : tableA.sdg_targets;
      for (let index = 0; index < tableA.sdg_targets.length; index++) {
        const element = tableA.sdg_targets[index];
        let newinitSdgTargets = new entities.InitImpactAreaSdgTargets();

        newinitSdgTargets.initvStgId = initvStgId;
        newinitSdgTargets.sdg_target_id = element.sdg_target_id;
        newinitSdgTargets.active = element.active;

        sdgTargets.push(
          toolsSbt.mergeData(
            initSdgTargetsRepo,
            ` 
            SELECT *
              FROM init_impact_area_sdg_targets
             WHERE initvStgId = ${newinitSdgTargets.initvStgId}
               AND sdg_target_id = ${newinitSdgTargets.sdg_target_id}`,
            newinitSdgTargets
          )
        );
      }

      /**
       * SAVE Init Global Targets
       */

      // Execute all promises (mergeData)
      let mergeGlobalTarget = await Promise.all(globalTargets);
      // Save data
      let upsertedGlobalTargets = await initGlobalTargetsRepo.save(
        mergeGlobalTarget
      );

      /**
       * SAVE Init Impact Indicators
       */

      // Execute all promises (mergeData)
      let mergeImpactIndicators = await Promise.all(impactIndicators);
      // Save data
      let upsertedImpactIndicators = await initImpactIndicatorsRepo.save(
        mergeImpactIndicators
      );

      /**
       * SAVE Init SDG Targets
       */
      let mergeSdgTargets = await Promise.all(sdgTargets);
      console.log(mergeSdgTargets);

      // Save data
      let upsertedSdgTargets = await initSdgTargetsRepo.save(mergeSdgTargets);
      console.log(upsertedSdgTargets);

      return {
        upsertedGlobalTargets,
        upsertedImpactIndicators,
        upsertedSdgTargets
      };
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert melia results framework tableA: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT TABLE B (Outcomes Indicators)
   * @param tableB
   * @param initvStgId
   * @returns {upsertedOutcomesIndicators}
   */
  async upsertTableB(tableB?, initvStgId?) {
    /**
     * REPOS TABLE B
     */

    const initOutcomesIndicatorsRepo = getRepository(
      entities.InitActionAreasOutcomesIndicators
    );

    /*ARRAYS*/
    const outcomesIndicators = [];

    let toolsSbt = new ToolsSbt();

    try {
      tableB.action_areas_outcomes_indicators =
        typeof tableB.action_areas_outcomes_indicators === 'undefined'
          ? []
          : tableB.action_areas_outcomes_indicators;
      for (
        let index = 0;
        index < tableB.action_areas_outcomes_indicators.length;
        index++
      ) {
        const element = tableB.action_areas_outcomes_indicators[index];
        let newActionAreasOutcomesIndicators =
          new entities.InitActionAreasOutcomesIndicators();

        newActionAreasOutcomesIndicators.initvStgId = initvStgId;
        newActionAreasOutcomesIndicators.outcomes_indicators_id =
          element.outcome_indicator_id;
        newActionAreasOutcomesIndicators.active = element.active;

        outcomesIndicators.push(
          toolsSbt.mergeData(
            initOutcomesIndicatorsRepo,
            ` 
                SELECT *
                  FROM init_action_areas_out_indicators
                 WHERE initvStgId = ${newActionAreasOutcomesIndicators.initvStgId}
                   AND outcomes_indicators_id = ${newActionAreasOutcomesIndicators.outcomes_indicators_id}`,
            newActionAreasOutcomesIndicators
          )
        );
      }

      /**
       * SAVE Init Outcomes Indicatos
       */
      let mergeOutcomesIndicators = await Promise.all(outcomesIndicators);

      // Save data
      let upsertedOutcomesIndicators = await initOutcomesIndicatorsRepo.save(
        mergeOutcomesIndicators
      );

      return {upsertedOutcomesIndicators};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert melia results framework tableB: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT TABLE C (Results)
   * @param tableC
   * @param initvStgId
   * @returns {upsertedOutcomesIndicators}
   */
  async upsertTableC(tableC?, initvStgId?) {
    /**
     * REPOS TABLE C
     */

    const resultsRepo = getRepository(entities.Results);
    const resultsIndicatorsRepo = getRepository(entities.ResultsIndicators);
    const resultsDataManagementRepo = getRepository(
      entities.ResultsDataManagement
    );
    const resultsRegionsRepo = getRepository(entities.ResultsRegions);
    const resultsCountriesRepo = getRepository(entities.ResultsCountries);
  }

  /**
   * REQUEST MELIA
   * @param sectionName
   * @returns {melia}
   */
  async requestMeliaFiles(sectionName) {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const meliaQuery = ` 
            SELECT * 
            FROM melia
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `,
        filesQuery = `
                    SELECT * 
                    FROM files 
                   WHERE meliaId in (SELECT id
                    FROM melia
                   WHERE initvStgId = ${initvStg.id}
                     AND active = 1)
                     AND section = "${sectionName}"
                     AND active = 1
                `;

      const melia = await this.queryRunner.query(meliaQuery);
      const files = await this.queryRunner.query(filesQuery);

      melia.map((mel) => {
        mel['files'] = files.filter((f) => {
          return f.meliaId === mel.id;
        });
      });

      return melia[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get melia and files: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT Manage plan risk and files
   * @param initiativeId
   * @param ubication
   * @param stege
   * @param managePlanId
   * @param management_plan
   * @param managePlanActive
   * @param section
   * @param files
   * @param updateFiles
   * @returns { upsertedManagePlan, upsertedFile }
   */
  async upsertManagePlanAndFiles(
    initiativeId?,
    ubication?,
    stege?,
    managePlanId?,
    management_plan?,
    managePlanActive?,
    section?,
    files?,
    updateFiles?
  ) {
    const manageRepo = getRepository(entities.ManagePlanRisk);
    const filesRepo = getRepository(entities.Files);
    const initvStg = await this.setInitvStage();
    var host = `${process.env.EXT_HOST}`;
    const path = 'uploads';

    var newManagePlan = new entities.ManagePlanRisk();
    var newFiles = new entities.Files();
    var upsertedManagePlan;
    var upsertedFile;

    newManagePlan.id = managePlanId;
    newManagePlan.management_plan = management_plan;
    newManagePlan.active = managePlanActive ? managePlanActive : true;

    try {
      if (host == 'http://localhost') {
        host = `${process.env.EXT_HOST}:${process.env.PORT}`;
      } else {
        host = `${process.env.EXT_HOST}`;
      }

      if (newManagePlan.id !== null) {
        var savedManagePlan = await manageRepo.findOne(newManagePlan.id);

        manageRepo.merge(savedManagePlan, newManagePlan);

        upsertedManagePlan = await manageRepo.save(savedManagePlan);
      } else {
        newManagePlan.initvStgId = initvStg.id;

        upsertedManagePlan = await manageRepo.save(newManagePlan);
      }

      files = typeof files === 'undefined' ? [] : files;
      if (files) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          const urlDB = `${host}/${path}/INIT-${initiativeId}/${ubication}/stage-${stege.id}/${file.filename}`;
          newFiles.id = null;
          newFiles.active = file.active ? file.active : true;
          newFiles.manage_plan_risk_id = upsertedManagePlan.id;
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
          newFiles.active = updateFile.active ? updateFile.active : true;
          newFiles.manage_plan_risk_id = updateFile.managePlanId;
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

      return {upsertedManagePlan, upsertedFile};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert management plan risk: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST Manage plan risk and files data
   * @param sectionName
   * @returns {managePlan}
   */
  async requestManagePlanFiles(sectionName) {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const managePlanQuery = ` 
            SELECT * 
            FROM manage_plan_risk
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `,
        filesQuery = `
                    SELECT * 
                    FROM files 
                   WHERE manage_plan_risk_id in (SELECT id
                    FROM manage_plan_risk
                   WHERE initvStgId = ${initvStg.id}
                     AND active = 1)
                     AND section = "${sectionName}"
                     AND active = 1
                `,
        riskAssessmentQuery = `
                SELECT id,risks_achieving_impact,risks_theme,
                       description_risk,likelihood,impact,
                       risk_score,manage_plan_risk_id,active,add_by_user
                 FROM risk_assessment
                WHERE manage_plan_risk_id in (
                SELECT id
	              FROM manage_plan_risk
                 WHERE initvStgId = ${initvStg.id}
                   AND active = 1
                     )
                    `,
        opportinitiesQuery = `
                    SELECT id,opportunities_description,
                           risk_assessment_id,active
                    FROM opportunities
                   WHERE risk_assessment_id in (
                   SELECT id
                     FROM risk_assessment
                    WHERE manage_plan_risk_id in (
                   SELECT id
	                 FROM manage_plan_risk
                    WHERE initvStgId = ${initvStg.id}
                      AND active = 1
                     )
                    )
                    AND active = 1;
                    
                    `;

      const managePlan = await this.queryRunner.query(managePlanQuery);
      const files = await this.queryRunner.query(filesQuery);
      const risk = await this.queryRunner.query(riskAssessmentQuery);
      const opportinities = await this.queryRunner.query(opportinitiesQuery);

      risk.map((ri) => {
        ri['opportinities'] = opportinities.filter((op) => {
          return op.risk_assessment_id === ri.id;
        });
      });

      managePlan.map((mel) => {
        mel['files'] = files.filter((f) => {
          return f.manage_plan_risk_id === mel.id;
        });
        mel['riskassessment'] = risk.filter((ri) => {
          return ri.manage_plan_risk_id === mel.id;
        });
      });

      return managePlan[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get manage plan risk and files: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT RISK ASSESSMENT
   * @param managePlanRiskId
   * @param riskAssessment
   * @returns {upsertedRiskAssessment}
   */
  async upsertRiskAssessment(managePlanRiskId, riskAssessment) {
    riskAssessment =
      typeof riskAssessment === 'undefined' ? [] : riskAssessment;

    const riskAssessmentRepo = getRepository(entities.RiskAssessment);
    const opportinitiesRepo = getRepository(entities.Opportunities);

    var newRiskAssessment = new entities.RiskAssessment();
    var newOpportinities = new entities.Opportunities();

    var riskSaved;
    var opportunitiesSaved;
    var upsertedRiskAssessment = [];
    var upsertedOpportunities = [];

    try {
      if (managePlanRiskId) {
        /**RISK ASSESSMENT */
        if (riskAssessment.length > 0) {
          for (let index = 0; index < riskAssessment.length; index++) {
            const risk = riskAssessment[index];

            newRiskAssessment.id = risk.id;
            newRiskAssessment.risks_theme = risk.risks_theme;
            newRiskAssessment.risks_achieving_impact =
              risk.risks_achieving_impact;
            newRiskAssessment.description_risk = risk.description_risk;
            newRiskAssessment.likelihood = risk.likelihood;
            newRiskAssessment.impact = risk.impact;
            newRiskAssessment.risk_score = risk.risk_score;
            newRiskAssessment.active = risk.active;
            newRiskAssessment.manage_plan_risk_id = managePlanRiskId;
            newRiskAssessment.add_by_user = risk.add_by_user;

            /**UPDATE RISK ASSESSMENT */
            if (newRiskAssessment.id !== null) {
              var savedRiskAssessment = await riskAssessmentRepo.findOne(
                newRiskAssessment.id
              );

              riskAssessmentRepo.merge(savedRiskAssessment, newRiskAssessment);

              riskSaved = await riskAssessmentRepo.save(savedRiskAssessment);

              upsertedRiskAssessment.push(riskSaved);
            } else {
              /**CREATE NEW RISK ASSESSMENT */
              riskSaved = await riskAssessmentRepo.save(newRiskAssessment);

              upsertedRiskAssessment.push(riskSaved);
            }

            /**
             * OPPORTUNITIES
             */
            risk.opportinities =
              typeof risk.opportinities === 'undefined'
                ? []
                : risk.opportinities;
            if (risk.opportinities.length > 0) {
              for (let index = 0; index < risk.opportinities.length; index++) {
                const opportunities = risk.opportinities[index];

                newOpportinities.id = opportunities.id;
                newOpportinities.opportunities_description =
                  opportunities.opportunities_description;
                newOpportinities.risk_assessment_id = riskSaved.id;
                newOpportinities.active = opportunities.active;

                if (newOpportinities.id !== null) {
                  var savedOpportunities = await opportinitiesRepo.findOne(
                    newOpportinities.id
                  );

                  opportinitiesRepo.merge(savedOpportunities, newOpportinities);

                  opportunitiesSaved = await opportinitiesRepo.save(
                    savedOpportunities
                  );

                  upsertedOpportunities.push(opportunitiesSaved);
                } else {
                  opportunitiesSaved = await opportinitiesRepo.save(
                    newOpportinities
                  );

                  upsertedOpportunities.push(opportunitiesSaved);
                }
              }
            }
          } //End FOR
        }
      }

      upsertedRiskAssessment.map(
        (risk) =>
          (risk['opportunities'] = upsertedOpportunities.filter((op) => {
            return op.risk_assessment_id === risk.id;
          }))
      );

      return {upsertedRiskAssessment};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Risk Assessment: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT Human Resources and Files
   * @param initiativeId
   * @param ubication
   * @param stege
   * @param humanResourcesId
   * @param gender_diversity_inclusion
   * @param capacity_development
   * @param humanResourcesActive
   * @param section
   * @param files
   * @param updateFiles
   * @returns { upsertedHumanResources, upsertedFile }
   */

  async upsertHumanResourcesAndFiles(
    initiativeId?,
    ubication?,
    stege?,
    humanResourcesId?,
    gender_diversity_inclusion?,
    capacity_development?,
    humanResourcesActive?,
    section?,
    files?,
    updateFiles?
  ) {
    const humanResourcesRepo = getRepository(entities.HumanResources);
    const filesRepo = getRepository(entities.Files);
    const initvStg = await this.setInitvStage();
    var host = `${process.env.EXT_HOST}`;
    const path = 'uploads';

    var newHumanResources = new entities.HumanResources();
    var newFiles = new entities.Files();
    var upsertedHumanResources;
    var upsertedFile;

    newHumanResources.id = humanResourcesId;
    newHumanResources.gender_diversity_inclusion = gender_diversity_inclusion;
    newHumanResources.capacity_development = capacity_development;
    newHumanResources.active = humanResourcesActive;

    try {
      if (host == 'http://localhost') {
        host = `${process.env.EXT_HOST}:${process.env.PORT}`;
      } else {
        host = `${process.env.EXT_HOST}`;
      }

      if (newHumanResources.id !== null) {
        var savedHumanResources = await humanResourcesRepo.findOne(
          newHumanResources.id
        );

        humanResourcesRepo.merge(savedHumanResources, newHumanResources);

        upsertedHumanResources = await humanResourcesRepo.save(
          savedHumanResources
        );
      } else {
        newHumanResources.initvStgId = initvStg.id;

        upsertedHumanResources = await humanResourcesRepo.save(
          newHumanResources
        );
      }

      if (files) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          const urlDB = `${host}/${path}/INIT-${initiativeId}/${ubication}/stage-${stege.id}/${file.filename}`;
          newFiles.id = null;
          newFiles.active = file.active ? file.active : true;
          newFiles.humanId = upsertedHumanResources.id;
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

      if (updateFiles.length > 0) {
        for (let index = 0; index < updateFiles.length; index++) {
          const updateFile = updateFiles[index];

          newFiles.id = updateFile.id;
          newFiles.active = updateFile.active ? updateFile.active : true;
          newFiles.humanId = updateFile.humanResourcesId;
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

      return {upsertedHumanResources, upsertedFile};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert human Resources: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT INITIATIVE TEAM (SECTION HUMAN RESOURCES)
   * @param humanResourcesId
   * @param initvTeam
   * @returns{upsertedInitiativeTeam}
   */
  async upsertInitiativeTeam(
    humanResourcesId,
    initvTeam
  ): Promise<{upsertedInitiativeTeam: any}> {
    initvTeam = typeof initvTeam === 'undefined' ? [] : initvTeam;

    const initiativeTeamRepo = getRepository(entities.InitiativeTeam);
    const newInitiativeTeam = new entities.InitiativeTeam();

    var initiativeTeamSaved;
    var upsertedInitiativeTeam = [];

    try {
      if (humanResourcesId) {
        if (initvTeam.length > 0) {
          for (let index = 0; index < initvTeam.length; index++) {
            const initvTeamArray = initvTeam[index];

            newInitiativeTeam.id = initvTeamArray.id;
            newInitiativeTeam.category = initvTeamArray.category;
            newInitiativeTeam.area_expertise = initvTeamArray.area_expertise;
            newInitiativeTeam.key_accountabilities =
              initvTeamArray.key_accountabilities;
            newInitiativeTeam.human_resources_id = humanResourcesId;
            newInitiativeTeam.active = initvTeamArray.active;

            if (newInitiativeTeam.id !== null) {
              /**UPDATE NEW INITIATIVE TEAM */
              var oldInitiativeTeam = await initiativeTeamRepo.findOne(
                newInitiativeTeam.id
              );

              initiativeTeamRepo.merge(oldInitiativeTeam, newInitiativeTeam);

              initiativeTeamSaved = await initiativeTeamRepo.save(
                oldInitiativeTeam
              );

              upsertedInitiativeTeam.push(initiativeTeamSaved);
            } else {
              /**CREATE NEW INITIATIVE TEAM */
              initiativeTeamSaved = await initiativeTeamRepo.save(
                newInitiativeTeam
              );

              upsertedInitiativeTeam.push(initiativeTeamSaved);
            }
          }
        }
      }

      return {upsertedInitiativeTeam};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR PATCH Initiative Team : Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST Human Resources and files data
   * @param sectionName
   * @returns {humanResources}
   */
  async requestHumanResourcesFiles(sectionName) {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const humanResourcesQuery = ` 
            SELECT * 
            FROM human_resources
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `,
        filesQuery = `
                    SELECT * 
                    FROM files 
                   WHERE humanId in (SELECT id
                    FROM human_resources
                   WHERE initvStgId = ${initvStg.id}
                     AND active = 1)
                     AND section = "${sectionName}"
                     AND active = 1
                `,
        initiativeTeamQuery = `SELECT * 
                FROM initiative_team
              WHERE human_resources_id in ( SELECT id
                          FROM human_resources
                         WHERE initvStgId = ${initvStg.id}
                           AND active = 1)
                           AND active=1;`;

      const humanResources = await this.queryRunner.query(humanResourcesQuery);
      const files = await this.queryRunner.query(filesQuery);
      const initiativeTeam = await this.queryRunner.query(initiativeTeamQuery);

      humanResources.map((hr) => {
        hr['files'] = files.filter((f) => {
          return f.humanId === hr.id;
        });

        hr['initvTeam'] = initiativeTeam.filter((ini) => {
          return (ini.human_resources_id = hr.id);
        });
      });

      return humanResources[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get human resources and files: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT Financial Resourches
   * @param initiativeId
   * @param ubication
   * @param stage
   * @param financialResourcesId
   * @param budget_value
   * @param financialResourcesActive
   * @param section
   * @param files
   * @param updateFiles
   * @returns { upsertedFinancialResources, upsertedFile }
   */
  async upsertFinancialResources(upsertArray?, initvStg?, sectionName?) {
    const financialResourcesRepo = getRepository(entities.FinancialResources);

    try {
      let upsertFRArr = [],
        finYearArr = [];
      upsertArray.forEach((upsEle) => {
        let objt = {
          id: null,
          yearsArray: []
        };

        // const fResource = new FinancialResources();
        // fResource.active = upsEle.active;
        // fResource.col_name = upsEle.col_name;
        // fResource.table_name = upsEle.table_name;
        // fResource.id = upsEle.id == null || upsEle.id == '' ? null : upsEle.id;
        // fResource.financial_type_id = upsEle.financial_type_id == null || upsEle.financial_type_id == '' ? null : upsEle.financial_type_id;
        // fResource.financial_type = upsEle.financial_type;
        // fResource.initvStg = initvStg;
        // let fResource = []

        upsertFRArr.push(this.upsertFinancialRS(initvStg, upsEle));

        objt.id = upsEle.id;

        if (!_.isEmpty(upsEle.valuesList)) {
          for (const key in upsEle.valuesList) {
            if (Object.prototype.hasOwnProperty.call(upsEle.valuesList, key)) {
              const _year = new entities.FinancialResourcesYears();
              const val = upsEle.valuesList[key];
              _year.active = true;
              _year.year = key;
              _year.value = val;
              objt.yearsArray.push(_year);
            }
          }
        }
        finYearArr.push(objt);
      });

      const FRS = await Promise.all(upsertFRArr);

      const upstFRArr = await financialResourcesRepo.save(FRS);
      const upsertedYears = [];
      for (let index = 0; index < upstFRArr.length; index++) {
        const fR = upstFRArr[index];
        upsertedYears.push(this.upsertYear(fR, finYearArr[index]));
      }

      await Promise.all(upsertedYears);

      const financialResourcesQuery = ` 
            SELECT
            fR.*, GROUP_CONCAT(fRY. YEAR SEPARATOR ';') AS years,
            GROUP_CONCAT(fRY.value SEPARATOR ';') AS values_
            FROM
                financial_resources fR
            LEFT JOIN financial_resources_years fRY ON fR.id = fRY.financialResourcesId
            
            WHERE initvStgId = ${initvStg.id}
            AND fR.financial_type = "${sectionName}"
            AND fR.active = 1
            GROUP BY
                fR.id;
            `;

      const financialResources = await this.queryRunner.query(
        financialResourcesQuery
      );
      return financialResources;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert financial Resources: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async upsertFinancialRS(initvStg, financialRSObject) {
    try {
      const financialResourcesRepo = getRepository(entities.FinancialResources);

      const existingFR = await financialResourcesRepo.findOne({
        where: {
          initvStg,
          col_name: financialRSObject.col_name,
          table_name: financialRSObject.table_name,
          financial_type_id: financialRSObject.financial_type_id
        }
      });
      let fResource = new entities.FinancialResources();
      if (!existingFR) {
        fResource.active = financialRSObject.active;
        fResource.col_name = financialRSObject.col_name;
        fResource.table_name = financialRSObject.table_name;
        fResource.id =
          financialRSObject.id == null || financialRSObject.id == ''
            ? null
            : financialRSObject.id;
        fResource.financial_type_id =
          financialRSObject.financial_type_id == null ||
          financialRSObject.financial_type_id == ''
            ? null
            : financialRSObject.financial_type_id;
        fResource.financial_type = financialRSObject.financial_type;
        fResource.initvStg = initvStg;
      } else {
        fResource = existingFR;
      }
      return fResource;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert financial Resources: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async upsertYear(financialResource, financialYearsArr) {
    const financialResourcesYearRepo = getRepository(
      entities.FinancialResourcesYears
    );
    try {
      let upsertedYears = [];
      if (financialYearsArr.yearsArray.length > 0) {
        let yearsUpsert = financialYearsArr.yearsArray.map((yU) => ({
          ...yU,
          financialResources: financialResource
        }));
        const foundYears = await financialResourcesYearRepo.find({
          where: {
            year: In(yearsUpsert.map((y) => y.year)),
            financialResources: financialResource.id
          }
        });
        if (foundYears.length > 0) {
          for (let index = 0; index < foundYears.length; index++) {
            let fY = foundYears[index];
            const yearIndx = yearsUpsert.findIndex((yU) => yU.year == fY.year);
            foundYears[index].active = yearsUpsert[yearIndx].active;
            foundYears[index].value = yearsUpsert[yearIndx].value;
            upsertedYears.push(foundYears[index]);
          }
        } else {
          for (let index = 0; index < yearsUpsert.length; index++) {
            const uY = yearsUpsert[index];
            upsertedYears.push(uY);
          }
        }
        upsertedYears = await financialResourcesYearRepo.save(upsertedYears);
      }
      return upsertedYears;
    } catch (error) {
      throw new BaseError(
        'Upsert financial Resources Years: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST Finanacial Resources
   * @param sectionName
   * @returns {financialResources}
   */
  async requestFinancialResources(sectionName) {
    const initvStg = await this.setInitvStage();
    try {
      const financialResourcesQuery = ` 
            SELECT
            fR.*, GROUP_CONCAT(fRY. YEAR SEPARATOR ';') AS years,
            GROUP_CONCAT(fRY.value SEPARATOR ';') AS values_
            FROM
                financial_resources fR
            LEFT JOIN financial_resources_years fRY ON fR.id = fRY.financialResourcesId
            
            WHERE initvStgId = ${initvStg.id}
            AND fR.financial_type = "${sectionName}"
            AND fR.active = 1
            GROUP BY
                fR.id;
            `;

      const financialResources = await this.queryRunner.query(
        financialResourcesQuery
      );

      return financialResources;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get financial resources and files: Full proposal.',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT POLICY AND COMPLIANCE
   * @param policyComplianceId
   * @param research_governance_policy
   * @param open_fair_data_policy
   * @param open_fair_data_details
   * @param policyComplianceActive
   * @returns upsertedPolicyCompliance
   */
  async upsertPolicyComplianceOversight(
    policyComplianceId?,
    research_governance_policy?,
    open_fair_data_policy?,
    open_fair_data_details?,
    policyComplianceActive?
  ) {
    const PolicyComplianceRepo = getRepository(
      entities.PolicyComplianceOrversight
    );
    const initvStg = await this.setInitvStage();

    var newPolicyCompliance = new entities.PolicyComplianceOrversight();
    var upsertedPolicyCompliance;

    newPolicyCompliance.id = policyComplianceId;
    newPolicyCompliance.research_governance_policy = research_governance_policy;
    newPolicyCompliance.open_fair_data_policy = open_fair_data_policy;
    newPolicyCompliance.open_fair_data_details = open_fair_data_details;
    newPolicyCompliance.active = policyComplianceActive
      ? policyComplianceActive
      : true;

    try {
      if (newPolicyCompliance.id !== null) {
        var savedPolicyCompliance = await PolicyComplianceRepo.findOne(
          newPolicyCompliance.id
        );

        PolicyComplianceRepo.merge(savedPolicyCompliance, newPolicyCompliance);

        upsertedPolicyCompliance = await PolicyComplianceRepo.save(
          savedPolicyCompliance
        );
      } else {
        newPolicyCompliance.initvStgId = initvStg.id;

        upsertedPolicyCompliance = await PolicyComplianceRepo.save(
          newPolicyCompliance
        );
      }

      return {upsertedPolicyCompliance};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert policy compliance oversight: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST POLICY AND COMPLIANCE
   * @returns policyCompliance
   */
  async requestPolicyComplianceOversight() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const policyComplianceQuery = ` 
            SELECT * 
            FROM policy_compliance_oversight
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `;

      const policyCompliance = await this.queryRunner.query(
        policyComplianceQuery
      );

      return policyCompliance[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get policy compliance oversight.',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT INNOVATION PACKAGES
   * @param innovationPackageId
   * @param key_principles
   * @param innovationPackageActive
   * @returns upsertedInnovationPackages
   */
  async upsertInnovationPackages(
    innovationPackageId?,
    key_principles?,
    innovationPackageActive?
  ) {
    const innovationPackagesRepo = getRepository(entities.InnovationPackages);
    const initvStg = await this.setInitvStage();

    var newInnovationPackages = new entities.InnovationPackages();
    var upsertedInnovationPackages;

    newInnovationPackages.id = innovationPackageId;
    newInnovationPackages.key_principles = key_principles;
    newInnovationPackages.active = innovationPackageActive
      ? innovationPackageActive
      : true;

    try {
      if (newInnovationPackages.id !== null) {
        var savedInnovationPackages = await innovationPackagesRepo.findOne(
          newInnovationPackages.id
        );

        innovationPackagesRepo.merge(
          savedInnovationPackages,
          newInnovationPackages
        );

        upsertedInnovationPackages = await innovationPackagesRepo.save(
          savedInnovationPackages
        );
      } else {
        newInnovationPackages.initvStgId = initvStg.id;

        upsertedInnovationPackages = await innovationPackagesRepo.save(
          newInnovationPackages
        );
      }

      return {upsertedInnovationPackages};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Innovation Packages: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST INNOVATION PACKAGES
   * @returns
   */
  async requestInnovationPackages() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const innovationPackagesQuery = ` 
            SELECT * 
            FROM innovation_packages
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `;

      const innovationPackages = await this.queryRunner.query(
        innovationPackagesQuery
      );

      return innovationPackages[0];
    } catch (error) {
      console.log(error);
      throw new BaseError('Get InnovationPackages.', 400, error.message, false);
    }
  }

  /**
   ** REQUEST PREVIEW PARTNERS
   * @returns previewPartners
   */
  async requestPreviewPartners() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve preview partners
      const previewPartnersQuery = `
            SELECT ci.code,ci.acronym as acronym,ci.institutionType as institution_type,
                   JSON_UNQUOTE(ci.data -> "$.hqLocationISOalpha2") as office_location,
                   p.institutions_name as name,gi.action_area_description as action_area,
                   p.demand,p.innovation,p.scaling,JSON_UNQUOTE(ci.data-> "$.websiteLink") as website
             FROM impact_strategies i
             JOIN partners p
             JOIN clarisa_institutions ci
             JOIN initiatives_by_stages ist
             JOIN initiatives ini
             JOIN general_information gi
            WHERE i.id = p.impact_strategies_id
              AND p.institutions_id = ci.code
              AND i.initvStgId = ist.id
              AND ist.initiativeId = ini.id
              AND i.initvStgId = gi.initvStgId
              AND i.initvStgId = ${initvStg.id}
              AND i.active > 0
            ORDER BY ini.id asc     
            `;

      const previewPartners = await this.queryRunner.query(
        previewPartnersQuery
      );

      return previewPartners;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Preview Partners: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT TOCS
   */
  async upsertTocs(toc) {
    const tocsRepo = getRepository(entities.TOCs);
    const initvStg = await this.setInitvStage();

    var newTocs = new entities.TOCs();
    var results = [];
    var savedToc;

    try {
      if (toc.length > 0) {
        for (let index = 0; index < toc.length; index++) {
          const element = toc[index];

          newTocs.id = null;
          newTocs.toc_id = element.tocId;
          newTocs.narrative = element.narrative;
          newTocs.diagram = element.diagram;
          newTocs.type = element.type;
          newTocs.work_package = element.work_package;
          newTocs.active = element.active ? element.active : true;

          newTocs.initvStgId = initvStg.id;

          var savedInnovationPackages: any = await tocsRepo.find({
            where: {toc_id: newTocs.toc_id}
          });
          if (savedInnovationPackages.length > 0) {
            tocsRepo.merge(savedInnovationPackages, newTocs);

            savedToc = await tocsRepo.save(savedInnovationPackages);

            results[index] = savedToc;
          } else {
            newTocs.initvStgId = initvStg.id;

            savedToc = await tocsRepo.save(newTocs);
            results[index] = savedToc;
          }
        }
      }
      return {savedTocs: results};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert TOC: Full proposal',
        400,
        error.message,
        false
      );
    }
  }
}
