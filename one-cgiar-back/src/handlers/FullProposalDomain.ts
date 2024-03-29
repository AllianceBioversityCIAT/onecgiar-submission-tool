import _ from 'lodash';
import {getRepository, In, Not, getCustomRepository} from 'typeorm';
import * as entities from '../entity';
import {MeliaStudiesActivities} from '../entity/MeliaStudiesActivities';
import {ProposalSections} from '../interfaces/FullProposalSectionsInterface';
import {IsdcResponsesRepository} from '../repositories/isdcResponsesRepository';
import {TocResponsesRepository} from '../repositories/tocResponsesRepository';
import {ToolsSbt} from '../utils/toolsSbt';
import {BaseError} from './BaseError';
import {InitiativeHandler} from './InitiativesDomain';
import {InitiativeStageHandler} from './InitiativeStageDomain';
import {ProjectionBenefitsDepthScales} from '../entity/ProjectionBenefitsDepthScales';
import {pusherOST} from '../utils/pusher-util';
import {initiativeParser} from '../utils/initiative-parser';
import {MeliaToc} from '../entity/MeliaToc';

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
    // get initiative by stage id from initiative
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
    // get initiative by stage id from initiative
    const initvStgId: string = this.initvStgId_;
    try {
      // context sql query
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
                    SELECT id, initvStgId,name, active, acronym,pathway_content,is_global,wp_official_code,
                    CASE
                    WHEN (SELECT acronym FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id = wp.id) IS NULL 
                      OR (SELECT acronym FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1  AND id = wp.id) = ''
                      OR (SELECT if(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>','') = '', 0, 
                      char_length(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>','')) - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
                    FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id =wp.id) < 1
                    OR (SELECT name FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id = wp.id) IS NULL
                    OR (SELECT name FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1  AND id = wp.id) = ''
                    OR (SELECT if(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>','') = '', 0, 
                    char_length(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>','')) - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
                          FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id = wp.id) < 1
		                OR (SELECT pathway_content FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id = wp.id) IS NULL
                    OR (SELECT pathway_content FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1  AND id = wp.id) = ''
                    OR (SELECT if(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>','') = '', 0, 
                    char_length(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>','')) - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
                          FROM work_packages WHERE initvStgId = wp.initvStgId AND ACTIVE = 1 AND id = wp.id) < 1
                     THEN FALSE
                       ELSE case 
                       when   (select is_global  FROM work_packages WHERE initvStgId  = wp.initvStgId and id = wp.id AND ACTIVE = 1 ) = 1
                         OR (SELECT COUNT(id) FROM countries_by_initiative_by_stage WHERE initvStgId = wp.initvStgId and wrkPkgId = wp.id AND ACTIVE = 1 ) > 0
                    OR (SELECT COUNT(id) FROM regions_by_initiative_by_stage WHERE initvStgId = wp.initvStgId and wrkPkgId = wp.id AND ACTIVE = 1) > 0
                       then TRUE
                       else FALSE
                       end
                       END AS validateWP
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

  async getWorkPackageId(wpOficialCode) {
    const initvStgId: string = this.initvStgId_;
    //const initvStg = await this.initvStage
    const wpRepo = getRepository(entities.WorkPackages);

    try {
      let workPackages: any = await wpRepo.find({
        where: {
          wp_official_code: wpOficialCode,
          active: 1,
          initvStgId: initvStgId
        }
      });
      let COquery = `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE wrkPkgId = ${workPackages[0].id}
                 AND active = 1
              GROUP BY id,country_id`,
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE wrkPkgId = ${workPackages[0].id}
                   AND active = 1
                GROUP BY id,region_id
                `,
        tocQuery = `
                SELECT id, initvStgId,narrative,diagram,type,toc_id,work_package,work_package_id,created_at,updated_at
                  FROM tocs
                 WHERE active = 1
                  and type = 0
                  and work_package_id = ${wpOficialCode}
                `;

      const regions = await this.queryRunner.query(REquery);
      const countries = await this.queryRunner.query(COquery);
      const tocs = await this.queryRunner.query(tocQuery);

      if (workPackages == undefined || workPackages.length == 0) {
        workPackages = [];
      } else {
        // Map Geo
        workPackages.map((geo) => {
          geo['regions'] = regions.filter((re) => {
            return re.wrkPkgId === geo.id;
          });

          geo['countries'] = countries.filter((co) => {
            return co.wrkPkgId === geo.id;
          });
        });

        // Map toc
        workPackages.map((wp) => {
          wp['toc'] = tocs.filter((toc) => {
            return (toc.work_package_id = wp.id);
          });
        });
      }

      return workPackages[0];
    } catch (error) {
      throw new BaseError('Get workpackage', 400, error.message, false);
    }
  }

  /***
   * GET ALL WORK PACKAGES FULL PROPOSAL
   * Is only for stage full proposal
   */
  async requestAllWorkPackagesProposal() {
    try {
      let COquery = `
              SELECT id,country_id,initvStgId,wrkPkgId
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
        SELECT init.initiativeId as initiative_id,i.name as init_name, init.stageId as stage_id, 
          wp.id as wp_id, wp.active, wp.name, wp.results, wp.pathway_content, 
          wp.is_global, wp.initvStgId, wp.created_at, wp.updated_at, wp.acronym,
          wp.wp_official_code 
         FROM work_packages wp
         JOIN initiatives_by_stages init
           on wp.initvStgId  = init.id
         inner join initiatives i on i.id = init.initiativeId 
        WHERE init.stageId = 3
         AND wp.active = 1
        ORDER BY initiativeId asc;`;

      var workPackages = await this.queryRunner.query(WPquery);
      const regions = await this.queryRunner.query(REquery);
      const countries = await this.queryRunner.query(COquery);

      if (workPackages == undefined || workPackages.length == 0) {
        workPackages = [];
      } else {
        // Map Initiatives
        workPackages.map((wp) => {
          wp['regions'] = regions.filter((reg) => {
            return reg.wrkPkgId === wp.wp_id;
          });

          wp['countries'] = countries.filter((cou) => {
            return cou.wrkPkgId === wp.wp_id;
          });
        });
      }

      return workPackages;
    } catch (error) {
      throw new BaseError(
        'Get All work packages for stage Full Proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** GET ALL WORK PACKAGES
   * !THIS FUNCTION IS USED BY CLARISA
   * It is used from the previews API
   */
  async requestAllWorkPackages() {
    try {
      /* query Countries */
      let COquery = `
              SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE active = 1
               GROUP BY id,country_id`,
        /* query Regions */
        REquery = `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE active = 1
                GROUP BY id,region_id
                `,
        WPquery = `
        SELECT init.initiativeId as initiative_id, i.official_code as init_official_code, init.stageId as stage_id,
               wp.id as wp_id,wp.wp_official_code, wp.active, wp.name, wp.results, wp.pathway_content, 
               wp.is_global, wp.initvStgId, wp.created_at, wp.updated_at, wp.acronym,
               wp.wp_official_code, init.active  as initiative_status
          FROM work_packages wp
          JOIN initiatives_by_stages init
            on wp.initvStgId  = init.id
          JOIN initiatives i
			      on i.id = init.initiativeId
         WHERE wp.active = 1
         ORDER BY initiativeId asc, init.stageId asc,wp.wp_official_code asc`;

      var workPackages = await this.queryRunner.query(WPquery);
      const regions = await this.queryRunner.query(REquery);
      const countries = await this.queryRunner.query(COquery);

      if (workPackages == undefined || workPackages.length == 0) {
        workPackages = [];
      } else {
        // Map Regions and Countries into WP
        workPackages.map((wp) => {
          wp['regions'] = regions.filter((reg) => {
            return reg.wrkPkgId === wp.wp_id;
          });

          wp['countries'] = countries.filter((cou) => {
            return cou.wrkPkgId === wp.wp_id;
          });
        });
      }

      return workPackages;
    } catch (error) {
      throw new BaseError(
        'Get All work packages to all stages',
        400,
        error.message,
        false
      );
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
    action_area_description?,
    acronym?
  ) {
    const gnralInfoRepo = getRepository(entities.GeneralInformation);

    //  create empty object
    let generalInformation: entities.GeneralInformation;
    try {
      // get current intiative by stage
      // const initvStg = await this.initvStage;
      const initvStg = await this.setInitvStage();

      // get clarisa action action areas
      const initiativeshandler = new InitiativeHandler();
      const actionAreas = await initiativeshandler.requestActionAreas();

      // get select action areas for initiative
      const selectedActionArea = actionAreas.find(
        (area) => area.id == action_area_id
      ) || {name: null};

      // if null, create object
      if (generalInformationId == null) {
        generalInformation = new entities.GeneralInformation();
        generalInformation.name = name;
        generalInformation.acronym = acronym;
        generalInformation.action_area_description =
          action_area_description || selectedActionArea.name;
        generalInformation.action_area_id = action_area_id;
        // assign initiative by stage
        generalInformation.initvStg = initvStg.id;
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
      let initiative = await this.initiativeRepo.findOne(initvStg.initiativeId);
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
  async upsertWorkPackages(
    acronym,
    name,
    pathway_content,
    is_global,
    id,
    active,
    wp_official_code?
  ) {
    const wpRepo = getRepository(entities.WorkPackages);
    // get current intiative by stage
    const initvStg = await this.initvStage;

    var upsertedInfo;

    var newWorkPackage = new entities.WorkPackages();

    newWorkPackage.id = id;
    newWorkPackage.acronym = acronym;
    newWorkPackage.name = name;
    newWorkPackage.pathway_content = pathway_content;
    newWorkPackage.is_global = is_global;
    newWorkPackage.active = active;
    newWorkPackage.wp_official_code = wp_official_code ? wp_official_code : id;

    try {
      if (newWorkPackage.id !== null) {
        var savedWP = await this.queryRunner.query(` SELECT *
                FROM work_packages 
               WHERE id = ${newWorkPackage.id}`);

        wpRepo.merge(savedWP[0], newWorkPackage);

        upsertedInfo = await wpRepo.save(savedWP[0]);
      } else {
        newWorkPackage.initvStgId = initvStg[0].id
          ? initvStg[0].id
          : initvStg.id;

        upsertedInfo = await wpRepo.save(newWorkPackage);

        //Insert Work Pakcage Official Code
        upsertedInfo.wp_official_code = wp_official_code
          ? wp_official_code
          : upsertedInfo.id;
        await wpRepo.save(upsertedInfo);
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
      // get current initiative by stage
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
    dimensions?,
    depthScaleList?
  ) {
    const depthScalesRepo = getRepository(entities.DepthScales);
    const projectionBenefitsDepthScalesRepo = getRepository(
      ProjectionBenefitsDepthScales
    );
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

    //projectedScales = depthScaleList.map(el => ({depthScalesId:el.depthScaleId, active:el.selected, projectionBenefitsId:projectionBenefitsId}));

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

      depthScaleList.forEach(async (el) => {
        let isSave: any;
        const returnData = await projectionBenefitsDepthScalesRepo.findOne({
          where: {
            projectionBenefitsId: newWorkProjectionBenefits.id,
            depthScalesId: el.depthScaleId
          }
        });
        if (returnData) {
          isSave = {...returnData, active: !!el.active};
        } else {
          isSave = {
            depthScalesId: el.depthScaleId,
            active: !!el.active,
            projectionBenefitsId: projectionBenefitsId
              ? projectionBenefitsId
              : upsertedPjectionBenefits.id
          };
        }

        await projectionBenefitsDepthScalesRepo.save(isSave);
      });
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
                `,
        depthScalesListQuery = `
        select pbds.id, pbds.projectionBenefitsId, pbds.active, res.id as depthScaleId, res.name as depthScaleName from projection_benefits_depth_scales pbds 
        inner join (select distinct(depthScale.id), depthScale.name 
              from clarisa_projected_benefits cpb, json_table(cpb.depthScales , '$[*]' columns(
                          id int path '$.depthScaleId',
                      name text path '$.depthScaleName'
                      )) depthScale
                order by depthScale.id asc ) res on res.id = pbds.depthScalesId 
      where pbds.projectionBenefitsId in (SELECT  id
            FROM projection_benefits
           WHERE initvStgId = ${initvStg.id}
             AND active = 1)
          AND pbds.active > 0;`;

      const depthScalesList = await this.queryRunner.query(
        depthScalesListQuery
      );
      const projectBenefits = await this.queryRunner.query(prjBenQuery);
      const dimensions = await this.queryRunner.query(dimensionsQuery);

      projectBenefits.map((pb) => {
        pb['dimensions'] = dimensions.filter((dim) => {
          return dim.projectionId === pb.id;
        });

        pb['depthScaleList'] = depthScalesList.filter((dim) => {
          return dim.projectionBenefitsId === pb.id;
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
                    `,
        depthScalesListQuery = `
        select pbds.id, pbds.projectionBenefitsId, pbds.active, res.id as depthScaleId, res.name as depthScaleName from projection_benefits_depth_scales pbds 
                inner join (select distinct(depthScale.id), depthScale.name 
                			from clarisa_projected_benefits cpb, json_table(cpb.depthScales , '$[*]' columns(
													        id int path '$.depthScaleId',
															name text path '$.depthScaleName'
															)) depthScale
												order by depthScale.id asc ) res on res.id = pbds.depthScalesId 
              where pbds.projectionBenefitsId in (SELECT  id
                    FROM projection_benefits
                   WHERE initvStgId = ${initvStg.id}
                     AND active = 1)
                  AND pbds.active > 0;`;

      const projectBenefits = await this.queryRunner.query(prjBenQuery);
      const dimensions = await this.queryRunner.query(dimensionsQuery);
      const depthScalesList = await this.queryRunner.query(
        depthScalesListQuery
      );

      projectBenefits.map((pb) => {
        pb['dimensions'] = dimensions.filter((dim) => {
          return dim.projectionId === pb.id;
        });

        pb['depthScaleList'] = depthScalesList
          ? depthScalesList.filter((dim) => {
              return dim.projectionBenefitsId === pb.id;
            })
          : [];
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
          newPartners.type_id = par.institutionTypeId;
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
   ** REQUEST IMPACT STATEMENTS BY IMPACT AREA
   */
  async requestImpactStrategiesByIA(impact_area_id) {
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
        'Get Impact Strategies by impact area: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST IMPACT STATEMENTS BY INITIATIVE
   */
  async requestImpactStrategies() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve general information
      const impStraQuery = ` 
            SELECT *
            FROM impact_strategies
           WHERE initvStgId = ${initvStg.id}
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

      return impactStrategies;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Impact Strategies by initiative: Full proposal',
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

      if (melia_plan) {
        newMelia.id = melia_plan.id;
        newMelia.melia_plan = melia_plan.melia_plan;
        newMelia.active = melia_plan.active ? melia_plan.active : true;

        if (newMelia.id !== null) {
          var savedMelia = await meliaRepo.findOne(newMelia.id);

          meliaRepo.merge(savedMelia, newMelia);

          upsertedMelia = await meliaRepo.save(savedMelia);
        } else {
          newMelia.initvStgId = initvStg.id;
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

  async updateOldDataMeliaToC() {
    /**
     * GET INITIATIVE BY STAGE CODE
     */
    const initvStg = await this.setInitvStage();

    //**REPOSITORIES/
    const initGlobalTargetsRepo = getRepository(
      entities.InitImpactAreaGlobalTargets
    );
    const initImpactIndicatorsRepo = getRepository(
      entities.InitImpactAreaImpactIndicators
    );
    const initSdgTargetsRepo = getRepository(entities.InitImpactAreaSdgTargets);
    const initOutcomesIndicatorsRepo = getRepository(
      entities.InitActionAreasOutcomesIndicators
    );
    const resultsRepo = getRepository(entities.Results);
    const resultsIndicatorsRepo = getRepository(entities.ResultsIndicators);
    const resultsRegionsRepo = getRepository(entities.ResultsRegions);
    const resultsCountriesRepo = getRepository(entities.ResultsCountries);

    try {
      /**
       * Validate table A
       */

      const updatedInitGlobalTargets =
        await initGlobalTargetsRepo.query(` update init_impact_area_global_targets set active = 0 
      where initvStgId =${initvStg.id} `);
      const updatedInitImpactIndicators = await initImpactIndicatorsRepo.query(
        `update init_impact_area_impact_indicators set active = 0 
        where initvStgId =${initvStg.id}`
      );
      const updatedInitSdgTargets =
        await initSdgTargetsRepo.query(`update init_impact_area_sdg_targets set active = 0 
      where initvStgId =${initvStg.id}`);

      /**
       * Validate table B
       */

      const updatedInitOutcomesIndicators =
        await initOutcomesIndicatorsRepo.query(`update init_action_areas_out_indicators set active = 0 
        where initvStgId =${initvStg.id}`);

      /**
       * Validate table C
       */

      const updatedResultsIndicators =
        await resultsIndicatorsRepo.query(`update results_indicators set active = 0 
      where  results_id in (SELECT re.id
        FROM results re
       WHERE re.initvStgId = ${initvStg.id}
         AND re.active =1)`);
      const updatedResultsRegions =
        await resultsRegionsRepo.query(`update results_regions set active = 0 
        where  results_id in (SELECT re.id
          FROM results re
         WHERE re.initvStgId = ${initvStg.id}
           AND re.active =1)`);
      const updatedResultsCountries =
        await resultsCountriesRepo.query(`update results_countries set active = 0 
        where  results_id in (SELECT re.id
          FROM results re
         WHERE re.initvStgId = ${initvStg.id}
           AND re.active =1)`);
      const updatedResults =
        await resultsRepo.query(`update results set active = 0 
         where initvStgId =${initvStg.id}`);

      return {
        updatedInitGlobalTargets,
        updatedInitImpactIndicators,
        updatedInitSdgTargets,
        updatedInitOutcomesIndicators,
        updatedResults,
        updatedResultsIndicators,
        updatedResultsRegions,
        updatedResultsCountries
      };
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
      let upsertedTableC = await this.upsertTableC(tableC, initvStg.id);

      return {upsertedTableA, upsertedTableB, upsertedTableC};
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

  async tocIntegration(initiativeId){
    const toc_id = await  this.queryRunner.query(`select
    ibs.initiativeId,
    t.toc_id
  from
    tocs t
  inner join (
    select
      max(t2.updated_at) as max_date,
      t2.initvStgId
    from
      tocs t2
    inner join initiatives_by_stages ibs2
          on
      t2.initvStgId = ibs2.id
    where
      t2.active > 0
      and t2.type = 1
    GROUP by
      t2.initvStgId) tr on
    tr.initvStgId = t.initvStgId
    and tr.max_date = t.updated_at
  inner join initiatives_by_stages ibs
          on
    t.initvStgId = ibs.id
  where
    t.active > 0
    and t.type = 1 and ibs.initiativeId = ${initiativeId}
  order by
    ibs.initiativeId;`);

    return toc_id;
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

      /**Init Impact Indicators */
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
        newinitSdgTargets.impact_area_id = element.impact_area_id;

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
       * ****************************************************************
       *                           SAVE DATA
       * ****************************************************************
       * /
       
      /** SAVE Init Global Targets
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
      // console.log(mergeSdgTargets);

      // Save data
      let upsertedSdgTargets = await initSdgTargetsRepo.save(mergeSdgTargets);
      // console.log(upsertedSdgTargets);
      if (
        mergeSdgTargets.length > 0 ||
        mergeImpactIndicators.length > 0 ||
        mergeGlobalTarget.length > 0
      ) {
        let {initiativeId} = await initiativeParser.getInitParams(initvStgId);
        pusherOST.tocTrigger('table-a', initiativeId);
      }
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
        newActionAreasOutcomesIndicators.outcome_id = element.outcome_id;
        newActionAreasOutcomesIndicators.action_area_id =
          element.action_area_id;

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
       * ****************************************************************
       *                           SAVE DATA
       * ****************************************************************
       * /

      /**
       * SAVE Init Outcomes Indicator
       */
      let mergeOutcomesIndicators = await Promise.all(outcomesIndicators);
      // Save data
      let upsertedOutcomesIndicators = await initOutcomesIndicatorsRepo.save(
        mergeOutcomesIndicators
      );

      if (mergeOutcomesIndicators.length > 0) {
        let {initiativeId} = await initiativeParser.getInitParams(initvStgId);
        pusherOST.tocTrigger('table-b-outcomes', initiativeId);
      }

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
   * TODO Validate update of information since it is being duplicated
   * TODO Update with wp id for outcomes and outputs
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
    const resultsRegionsRepo = getRepository(entities.ResultsRegions);
    const resultsCountriesRepo = getRepository(entities.ResultsCountries);

    let toolsSbt = new ToolsSbt();
    const resultsArray = [];
    const resultsIndicatorsArray = [];
    const resultsRegionsArray = [];
    const resultsCountriesArray = [];

    try {
      let upsertResults: any;
      tableC.results =
        typeof tableC.results === 'undefined' ? [] : tableC.results;

      for (let index = 0; index < tableC.results.length; index++) {
        const result = tableC.results[index];

        let newResults = new entities.Results();

        newResults.id = result.id ? result.id : null;
        newResults.initvStgId = initvStgId;
        newResults.result_type_id = result.result_type;
        newResults.result_title = result.result_title;
        newResults.is_global = result.is_global;
        newResults.active = result.active;
        newResults.work_package_id = result.wp_id;
        newResults.result_description = result.result_description;
        newResults.toc_result_id = result.toc_result_id;

        const mergeResult = await toolsSbt.mergeData(
          resultsRepo,
          ` 
                  SELECT  *
                    FROM results
                   WHERE initvStgId = ${newResults.initvStgId}
                     and toc_result_id = "${newResults.toc_result_id}"`,
          newResults
        );

        upsertResults = await resultsRepo.save(mergeResult);

        if (!!upsertResults && upsertResults.active == false) {
          const responses = await this.queryRunner.query(
            `update melia_toc mt inner join results r on r.id = mt.outcomeIdId set mt.active = 0 where r.toc_result_id = '${upsertResults.toc_result_id}'`
          );
        }

        resultsArray.push(upsertResults);

        result.indicators =
          typeof result.indicators === 'undefined' ? [] : result.indicators;
        for (let index = 0; index < result.indicators.length; index++) {
          const indicators = result.indicators[index];
          let newResultsIndicators = new entities.ResultsIndicators();

          newResultsIndicators.id = indicators.id ? indicators.id : null;
          newResultsIndicators.results_id = upsertResults.id;
          newResultsIndicators.active = indicators.active;
          newResultsIndicators.baseline_value = indicators.baseline_value;
          newResultsIndicators.baseline_year = indicators.baseline_year;
          newResultsIndicators.data_collection_method =
            indicators.data_collection;
          newResultsIndicators.data_source = indicators.data_source;
          newResultsIndicators.frequency_data_collection =
            indicators.frequency_data_collection;
          newResultsIndicators.target_value = indicators.target_value;
          newResultsIndicators.target_year = indicators.target_year;
          newResultsIndicators.unit_measurement = indicators.unit_messurament;
          newResultsIndicators.name = indicators.indicator_name;
          newResultsIndicators.toc_result_indicator_id =
            indicators.toc_result_indicator_id;

          resultsIndicatorsArray.push(
            toolsSbt.mergeData(
              resultsIndicatorsRepo,
              ` 
                    SELECT *
                      FROM results_indicators
                     WHERE toc_result_indicator_id = "${newResultsIndicators.toc_result_indicator_id}" 
                       and results_id = ${newResultsIndicators.results_id}`,
              newResultsIndicators
            )
          );
        }

        // Geo Scope
        result.geo_scope =
          typeof result.geo_scope === 'undefined' ? [] : result.geo_scope;
        result.geo_scope.regions =
          typeof result.geo_scope.regions === 'undefined'
            ? []
            : result.geo_scope.regions;
        for (let index = 0; index < result.geo_scope.regions.length; index++) {
          const regions = result.geo_scope.regions[index];
          let newResultsRegions = new entities.ResultsRegions();

          // newResultsRegions.id = regions.id ? regions.id : null;
          newResultsRegions.results_id = upsertResults.id;
          newResultsRegions.region_id = regions.region_id;
          newResultsRegions.active = regions.active;

          resultsRegionsArray.push(
            toolsSbt.mergeData(
              resultsRegionsRepo,
              ` 
                    SELECT *
                      FROM results_regions
                     WHERE  region_id = ${newResultsRegions.region_id} 
                       and results_id = ${newResultsRegions.results_id}`,
              newResultsRegions
            )
          );
        }

        result.geo_scope.countries =
          typeof result.geo_scope.countries === 'undefined'
            ? []
            : result.geo_scope.countries;
        for (
          let index = 0;
          index < result.geo_scope.countries.length;
          index++
        ) {
          const countries = result.geo_scope.countries[index];
          let newResultsCountries = new entities.ResultsCountries();

          // newResultsCountries.id = countries.id ? countries.id : null;
          newResultsCountries.results_id = upsertResults.id;
          newResultsCountries.country_id = countries.country_id;
          newResultsCountries.active = countries.active;

          resultsCountriesArray.push(
            toolsSbt.mergeData(
              resultsCountriesRepo,
              ` 
                    SELECT *
                      FROM results_countries
                     WHERE country_id = ${newResultsCountries.country_id} 
                       and results_id = ${newResultsCountries.results_id}`,
              newResultsCountries
            )
          );
        }
      }

      //Merge and Save ResultsIndicators
      let mergeResultsIndicators = await Promise.all(resultsIndicatorsArray);
      let mergeResultsRegions = await Promise.all(resultsRegionsArray);
      let mergeResultsCountries = await Promise.all(resultsCountriesArray);

      /**
       * ****************************************************************
       *                           SAVE DATA
       * ****************************************************************
       */

      let upsertResultsIndicators: any = await resultsIndicatorsRepo.save(
        mergeResultsIndicators
      );

      let upsertResultsRegions: any = await resultsRegionsRepo.save(
        mergeResultsRegions
      );
      let upsertResultsCountries: any = await resultsCountriesRepo.save(
        mergeResultsCountries
      );
      if (
        mergeResultsIndicators.length > 0 ||
        mergeResultsRegions.length > 0 ||
        mergeResultsCountries.length > 0
      ) {
        let {initiativeId} = await initiativeParser.getInitParams(initvStgId);
        pusherOST.tocTrigger('table-c', initiativeId);
      }
      return {
        upsertResults: resultsArray,
        upsertResultsIndicators,
        upsertResultsRegions,
        upsertResultsCountries
      };
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert melia results framework table C: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST MELIA
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
                `,
        globalTargetsQuery = `
                SELECT igt.initvStgId,igt.id,igt.global_target_id,cgt.target,igt.active,
                       cgt.impact_area_id
                  FROM init_impact_area_global_targets igt
                  JOIN clarisa_global_targets cgt
                    ON igt.global_target_id = cgt.id
                 WHERE igt.initvStgId =${initvStg.id}
                   AND igt.active =1;`,
        impactAreasIndicatorsQuery = `
        SELECT iai.initvStgId,iai.id,iai.impact_indicator_id,
               ciai.indicatorStatement,ciai.impactAreaId as impact_area_id,
               iai.active
          FROM init_impact_area_impact_indicators iai
          JOIN clarisa_impact_areas_indicators ciai
            ON iai.impact_indicator_id = ciai.id
         WHERE iai.initvStgId = ${initvStg.id}
           AND iai.active =1;
        `,
        sdgTargetsQuery = `
        SELECT sdt.initvStgId,sdt.id, sdt.sdg_target_id,
               csdt.sdg_target,csdt.sdg_target,sdt.impact_area_id
          FROM init_impact_area_sdg_targets sdt
          JOIN clarisa_sdg_targets csdt
            ON sdt.sdg_target_id = csdt.id
         WHERE sdt.initvStgId = ${initvStg.id}
           AND sdt.active =1;
        `,
        outIndicatorsQuery = `
        SELECT outi.initvStgId,outi.id, couti.id,
outi.outcomes_indicators_id,
couti.outcome_id,
couti.action_area_name,
        couti.outcome_id,couti.outcome_statement,
        couti.outcome_indicator_id,
        couti.outcome_indicator_smo_code,
        couti.outcome_indicator_statement,
        couti.action_area_id
         FROM init_action_areas_out_indicators outi
JOIN clarisa_action_areas_outcomes_indicators couti
           ON outi.outcomes_indicators_id = couti.outcome_indicator_id
          and outi.outcome_id = couti.outcome_id
          and if(outi.action_area_id is not null, outi.action_area_id = couti.action_area_id, couti.action_area_id = couti.action_area_id )
        WHERE outi.initvStgId = ${initvStg.id}
          AND outi.active =1
          order by couti.outcome_id asc;
          
        `,
        outIndicatorsQueryLastUpdate = `
        SELECT outi.initvStgId, max(couti.updated_at) as updated_at
         FROM init_action_areas_out_indicators outi
    LEFT JOIN clarisa_action_areas_outcomes_indicators couti
           ON outi.outcomes_indicators_id = couti.outcome_indicator_id
          and outi.outcome_id  = couti.outcome_id 
        WHERE outi.initvStgId =${initvStg.id}
          AND outi.active =1;
        `,
        resultsQuery = `
        SELECT re.initvStgId,re.id,rt.name as type_name,wp.name as wp_name,
               wp.acronym wp_acronym,re.result_type_id as result_type,
               re.result_title,re.is_global,re.active
        FROM results re
        join results_types rt 
          on rt.id = re.result_type_id 
   left join work_packages wp 
          on wp.wp_official_code = re.work_package_id 
          AND wp.initvStgId = re.initvStgId
       WHERE re.initvStgId = ${initvStg.id}
         AND re.active =1
        order by re.result_type_id,wp.id;
        `,
        resultsIndicatorsQuery = `
        SELECT ri.id, ri.name as indicator_name, ri.unit_measurement, 
        ri.results_id, ri.baseline_value, ri.baseline_year,
        ri.target_value, ri.target_year, ri.active, ri.data_source, 
        ri.data_collection_method as data_collection, ri.frequency_data_collection,
        ri.created_at, ri.updated_at
          FROM results_indicators ri
         WHERE ri.results_id in (SELECT re.id
          FROM results re
         WHERE re.initvStgId = ${initvStg.id}
           AND re.active =1);
        `,
        resultsRegionsQuery = `SELECT reg.id,reg.region_id,cr.name as region_name,reg.results_id ,reg.active,reg.created_at,reg.updated_at 
        FROM results_regions reg
        join clarisa_regions cr 
          on cr.um49Code  = reg.region_id 
       WHERE reg.results_id in (SELECT re.id
        FROM results re
       WHERE re.initvStgId = ${initvStg.id}
         AND re.active =1);`,
        resultsCountriesQuery = `
        SELECT co.id,co.country_id,cc.name as country_name,co.results_id ,co.active ,co.created_at, co.updated_at 
        FROM results_countries co
        join clarisa_countries cc 
          on cc.code  = co.country_id 
       WHERE co.results_id in (SELECT re.id
        FROM results re
       WHERE re.initvStgId = ${initvStg.id}
         AND re.active =1);`,
        lastUpdateTableASql = `
      select 
case 
	when d.updated_at >= g.updated_at and d.updated_at >= s.updated_at then d.updated_at
	when g.updated_at >= d.updated_at and g.updated_at >= s.updated_at then g.updated_at 
	when s.updated_at  >= d.updated_at and d.updated_at >= g.updated_at then s.updated_at 
	else d.updated_at
end as udate_at
from  initiatives_by_stages ibs 
	left join(SELECT max(csdt.updated_at) as updated_at, sdt.initvStgId 
          FROM init_impact_area_sdg_targets sdt
          JOIN clarisa_sdg_targets csdt
            ON sdt.sdg_target_id = csdt.id
         WHERE sdt.initvStgId = ${initvStg.id}
           AND sdt.active =1) as s on s.initvStgId = ibs.id
	
	left join (SELECT Max(outi.updated_at) as updated_at, outi.initvStgId 
         FROM init_action_areas_out_indicators outi
    LEFT JOIN clarisa_action_areas_outcomes_indicators couti
           ON outi.outcomes_indicators_id = couti.outcome_indicator_id
          and outi.outcome_id  = couti.outcome_id 
        WHERE outi.initvStgId = ${initvStg.id}
          AND outi.active =1) as d on d.initvStgId = ibs.id
          
    left join (SELECT max(igt.updated_at) as updated_at, igt.initvStgId
                  FROM init_impact_area_global_targets igt
                  JOIN clarisa_global_targets cgt
                    ON igt.global_target_id = cgt.id
                 WHERE igt.initvStgId =${initvStg.id}
                   AND igt.active =1) as g on g.initvStgId = ibs.id
                   
	where  ibs.id = ${initvStg.id}
      `,
        lastUpdateTableCSql = `
      SELECT max(re.updated_at) as updated_at
        FROM results re
        join results_types rt 
          on rt.id = re.result_type_id 
   left join work_packages wp 
          on wp.wp_official_code = re.work_package_id 
          AND wp.initvStgId = re.initvStgId
       WHERE re.initvStgId = ${initvStg.id}
         AND re.active =1
        order by re.result_type_id,wp.id;
      `,
        resultsByMelia = `
      select msa.id as meliaStudiesId, mt.outcomeIdId, cmst.name 
      from melia_toc mt 
      	inner join melia_studies_activities msa on msa.id = mt.meliaIdId 
      	inner join clarisa_melia_study_types cmst on cmst.id = msa.type_melia_id 
      where mt.initvStgIdId = ${initvStg.id}
              and mt.active > 0;
      `;
      // MELIA PLAN
      const meliaPlan = await this.queryRunner.query(meliaQuery);
      const files = await this.queryRunner.query(filesQuery);

      meliaPlan.map((mel) => {
        mel['files'] = files.filter((f) => {
          return f.meliaId === mel.id;
        });
      });

      //TABLE A

      const globalTargets = await this.queryRunner.query(globalTargetsQuery);
      const lasUpdateTableA = await this.queryRunner.query(lastUpdateTableASql);
      const impactAreasIndicators = await this.queryRunner.query(
        impactAreasIndicatorsQuery
      );
      const sdgTargets = await this.queryRunner.query(sdgTargetsQuery);
      const tableA = {
        global_targets: globalTargets,
        impact_areas_indicators: impactAreasIndicators,
        sdg_targets: sdgTargets,
        updated_at: lasUpdateTableA
      };

      //TABLE B

      const actionAreasOutcomesIndicators = await this.queryRunner.query(
        outIndicatorsQuery
      );
      const actionAreasOutcomesIndicatorsLastUpdate =
        await this.queryRunner.query(outIndicatorsQueryLastUpdate);
      const tableB = {
        update_at: actionAreasOutcomesIndicatorsLastUpdate,
        action_areas_outcomes_indicators: actionAreasOutcomesIndicators
      };

      //TABLE C

      const results = await this.queryRunner.query(resultsQuery);
      const resultsIndicators = await this.queryRunner.query(
        resultsIndicatorsQuery
      );

      const meliaTocResult = await this.queryRunner.query(resultsByMelia);
      const resultsRegions = await this.queryRunner.query(resultsRegionsQuery);
      const lastUpdateTableC = await this.queryRunner.query(
        lastUpdateTableCSql
      );
      const resultsCountries = await this.queryRunner.query(
        resultsCountriesQuery
      );

      results.map((res) => {
        res['indicators'] = resultsIndicators.filter((resi) => {
          return res.id === resi.results_id;
        });

        res['meliasStudies'] = meliaTocResult.filter((ms) => {
          return res.id === ms.outcomeIdId;
        });

        const reg = resultsRegions.filter((reg) => {
          return res.id === reg.results_id;
        });

        const cou = resultsCountries.filter((co) => {
          return res.id === co.results_id;
        });

        res['geo_scope'] = {regions: reg, countries: cou};
      });

      const tableC = {
        results: results,
        updated_at: lastUpdateTableC
      };

      return {
        meliaPlan: meliaPlan[0],
        resultFramework: {tableA, tableB, tableC}
      };
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
   ** UPSERT MELIA studies and activities
   * @param meliaStudiesActivitiesData
   * @returns meliaStudiesActivitiesSave
   */
  async upsertMeliaStudiesActivities(
    meliaStudiesActivitiesData: any,
    userId?: number
  ) {
    const meliaStudiesActivitiesRepo = getRepository(
      entities.MeliaStudiesActivities
    );
    const meliaTocRepo = getRepository(MeliaToc);
    const initvStg = await this.setInitvStage();
    let toolsSbt = new ToolsSbt();
    let meliaStudiesActivitiesArray = [];
    let regionsMeliaStd = [];
    let countriesMeliaStd = [];
    let initiativesMeliaStd = [];

    try {
      meliaStudiesActivitiesData =
        typeof meliaStudiesActivitiesData === 'undefined'
          ? []
          : meliaStudiesActivitiesData;
      for (let index = 0; index < meliaStudiesActivitiesData.length; index++) {
        const element = meliaStudiesActivitiesData[index];
        let meliaDataId: number;
        if (element.id) {
          const newMeliaStudiesActivities = new MeliaStudiesActivities();
          meliaDataId = element.id;

          newMeliaStudiesActivities.id = element.id ? element.id : null;
          newMeliaStudiesActivities.initvStgId = initvStg.id;
          newMeliaStudiesActivities.type_melia_id = element.type_melia_id;
          newMeliaStudiesActivities.other_melia = element.other_melia;
          newMeliaStudiesActivities.result_title = element.result_title;
          newMeliaStudiesActivities.anticipated_year_completion =
            element.anticipated_year_completion;
          newMeliaStudiesActivities.co_delivery = element.co_delivery;
          newMeliaStudiesActivities.management_decisions_learning =
            element.management_decisions_learning;
          newMeliaStudiesActivities.is_global = element.is_global;
          newMeliaStudiesActivities.active = element.active;
          newMeliaStudiesActivities.updateUser = userId ? userId : null;

          meliaStudiesActivitiesArray.push(
            toolsSbt.mergeData(
              meliaStudiesActivitiesRepo,
              ` 
             SELECT *
               FROM melia_studies_activities
              WHERE id = ${newMeliaStudiesActivities.id}
                and initvStgId =${newMeliaStudiesActivities.initvStgId}`,
              newMeliaStudiesActivities
            )
          );

          countriesMeliaStd = countriesMeliaStd.concat(element.countries || []);
          regionsMeliaStd = regionsMeliaStd.concat(element.regions || []);
          initiativesMeliaStd = initiativesMeliaStd.concat(
            element.initiatives || []
          );
        } else {
          const newMeliaStudy = new MeliaStudiesActivities();

          newMeliaStudy.id = null;
          newMeliaStudy.initvStgId = initvStg.id;
          newMeliaStudy.type_melia_id = element.type_melia_id;
          newMeliaStudy.other_melia = element.other_melia;
          newMeliaStudy.result_title = element.result_title;
          newMeliaStudy.anticipated_year_completion =
            element.anticipated_year_completion;
          newMeliaStudy.co_delivery = element.co_delivery;
          newMeliaStudy.management_decisions_learning =
            element.management_decisions_learning;
          newMeliaStudy.is_global = element.is_global;
          newMeliaStudy.active = element.active;
          newMeliaStudy.updateUser = userId ? userId : null;

          //Save new MELIA Studies to get ID and then save relations
          const newMeliaResponse = await meliaStudiesActivitiesRepo.save(
            newMeliaStudy
          );

          meliaDataId = newMeliaResponse.id;

          element.countries.map((coun) => {
            coun.meliaStudyId = newMeliaResponse.id;
          });
          element.regions.map((reg) => {
            reg.meliaStudyId = newMeliaResponse.id;
          });
          element.initiatives.map((reg) => {
            reg.meliaStudyId = newMeliaResponse.id;
          });

          countriesMeliaStd = countriesMeliaStd.concat(element.countries || []);
          regionsMeliaStd = regionsMeliaStd.concat(element.regions || []);
          initiativesMeliaStd = initiativesMeliaStd.concat(
            element.initiatives || []
          );
        }

        const saveLinkResult: MeliaTocData[] = [];
        for (let rindex = 0; rindex < element.selectResults.length; rindex++) {
          const selectedResults = element.selectResults[rindex];

          if (!!selectedResults.id) {
            let resultData: MeliaTocData = await meliaTocRepo.findOne(
              selectedResults.id
            );
            resultData.active = selectedResults.active ? 1 : 0;
            saveLinkResult.push(resultData);
          } else {
            let data: MeliaTocData = await meliaTocRepo.findOne({
              where: {
                initvStgId: initvStg.id,
                meliaId: meliaDataId,
                outcomeId: selectedResults.resultId
              }
            });
            if (data) {
              data.active = selectedResults.active ? 1 : 0;
              saveLinkResult.push(data);
            } else {
              let newData: MeliaTocData = {
                active: selectedResults.active ? 1 : 0,
                initvStgId: initvStg.id,
                meliaId: meliaDataId,
                outcomeId: selectedResults.resultId
              };
              saveLinkResult.push(newData);
            }
          }
        }

        const updateResultMeliaResponse = await meliaTocRepo.save(
          saveLinkResult
        );
      }

      const upsertedGeoScope = await this.upsertGeoScopesMeliaStudies(
        regionsMeliaStd,
        countriesMeliaStd
      );

      const upsertedInitiativesByMelia =
        await this.upsertInitiativesByMeliaStudies(initiativesMeliaStd);
      const meliaStudiesActivitiesMerge = await Promise.all(
        meliaStudiesActivitiesArray
      );
      const meliaStudiesActivitiesSave = await meliaStudiesActivitiesRepo.save(
        meliaStudiesActivitiesMerge
      );

      return meliaStudiesActivitiesSave;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert MELIA studies and activities: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async requestSelectResultsByMelias() {
    const initvStg = await this.setInitvStage();
    try {
      let results = await this.queryRunner.query(`
      select 	r.id as resultId, 
      		r.result_title as resultTitle, 
      		rt.id as typeId, 
      		rt.name as typeName,
      		wp.acronym  as wpAcronym,
      		wp.name  as wpName,
      		wp.id as wpId,
      	  concat('(',rt.name,') ',r.result_title)  as fullResultTitle
      from results r 
      	inner join results_types rt on rt.id = r.result_type_id 
      	left join work_packages wp on wp.id = r.work_package_id 
      	where r.initvStgId = ${initvStg.id}
      	and r.active > 0
      `);
      return results;
    } catch (error) {
      throw new BaseError(
        'GET Results by MELIA studies and activities: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async requestMeliaStudiesActivities() {
    const initvStg = await this.setInitvStage();
    const meliaStudiesActivitiesRepo = getRepository(
      entities.MeliaStudiesActivities
    );

    try {
      let meliaStudiesActivities = await this.queryRunner.query(`SELECT msa.id,
      msa.initvStgId,
      msa.type_melia_id,
      IF(msa.type_melia_id = 8,concat(cmst.name,ifnull(concat(' - ', if(msa.other_melia = '', null,msa.other_melia)), '')), cmst.name) as type_melia,
      msa.other_melia,
      msa.result_title,
      msa.anticipated_year_completion,
      IF(group_concat(i.name) is null,msa.co_delivery,concat('<ul class="pl-3">',group_concat(concat('<li>',i.name, '</li>') separator ''), '</ul>')) as co_delivery,
      msa.management_decisions_learning,
      msa.is_global,
      msa.active
      FROM melia_studies_activities msa 
      left join clarisa_melia_study_types cmst on msa.type_melia_id = cmst.id
      left join initiatives_by_melia_study ibms on ibms.meliaStudyId = msa.id and ibms.active = 1
      left join initiatives i on i.id = ibms.initiativeId 
      WHERE msa.initvStgId = ${initvStg.id}
      and msa.active = 1
      group by id`);

      let meliasResultsSelect = await this.queryRunner.query(`
      select mt.id, 
          mt.active, 
          mt.meliaIdId, 
          mt.outcomeIdId, 
          mt.initvStgIdId,
          r.id as resultId, 
      	  r.result_title as resultTitle, 
      	  rt.id as typeId, 
      	  rt.name as typeName,
      	  concat('(',rt.name,') ',r.result_title)  as fullResultTitle,
          wp.wp_official_code 
      from melia_toc mt 
      	inner join results r on r.id = mt.outcomeIdId 
      	inner join results_types rt on rt.id = r.result_type_id 
        left join work_packages wp on wp.wp_official_code = r.work_package_id 
          AND wp.initvStgId = r.initvStgId
        where mt.initvStgIdId = ${initvStg.id}
        and mt.active > 0
      `);

      let countries = await this.queryRunner
        .query(`SELECT id,country_id,initvStgId,meliaStudyId
      FROM countries_by_melia_study 
      WHERE initvStgId = ${initvStg.id ? initvStg.id : initvStg[0].id}
      AND active = 1
      GROUP BY id,country_id`);

      let regions = await this.queryRunner.query(`
      SELECT id,region_id,initvStgId,meliaStudyId
        FROM regions_by_melia_study
       WHERE initvStgId = ${initvStg.id ? initvStg.id : initvStg[0].id}
         AND active = 1
      GROUP BY id,region_id`);

      if (
        meliaStudiesActivities == undefined ||
        meliaStudiesActivities.length == 0
      ) {
        meliaStudiesActivities = [];
      } else {
        // get Initiatives by melias
        const meliaIds = meliaStudiesActivities.map((mel) => mel.id);
        console.log({meliaIds});

        let initiatives = await this.queryRunner.query(`
      SELECT id,initiativeId,meliaStudyId
        FROM initiatives_by_melia_study
       WHERE meliaStudyId in (${meliaIds})
         AND active = 1
      GROUP BY id`);

        meliaStudiesActivities.map((melia) => {
          // Map regions
          melia['regions'] = regions.filter((reg) => {
            return reg.meliaStudyId === melia.id;
          });
          // Map countries
          melia['countries'] = countries.filter((cou) => {
            return cou.meliaStudyId === melia.id;
          });

          //Map initiatives
          melia['initiatives'] = initiatives.filter((init) => {
            return init.meliaStudyId === melia.id;
          });

          melia['selectResults'] = meliasResultsSelect.filter((res) => {
            return res.meliaIdId === melia.id;
          });
        });
      }

      return meliaStudiesActivities;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'GET MELIA studies and activities: Full proposal',
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
        SELECT ra.id,ra.risks_achieving_impact,ra.risks_theme,
               ra.description_risk,ra.likelihood,ra.impact,
               ra.risk_score,ra.manage_plan_risk_id,ra.active,ra.add_by_user, ra.risk_id 
        FROM risk_assessment ra
        WHERE ra.manage_plan_risk_id in (
          SELECT id
          FROM manage_plan_risk
           WHERE initvStgId = ${initvStg.id}
             AND active = 1
               )
          and ra.active > 0;
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
            newRiskAssessment.risk_id = risk.risk_id;

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
        files = typeof files === 'undefined' ? [] : files;
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
      updateFiles = typeof updateFiles === 'undefined' ? [] : updateFiles;
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
   ** UPSERT Financial Resources
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
        //console.log(upsEle)
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
              //console.log(val);
              _year.active = true;
              _year.year = key;
              _year.value = val;
              objt.yearsArray.push(_year);
            }
          }
        }
        // console.log(objt)
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

        console.log(yearsUpsert.map((y) => y.year));
        const foundYears = await financialResourcesYearRepo.find({
          where: {
            year: In(yearsUpsert.map((y) => y.year)),
            financialResources: financialResource.id
          }
        });

        for (let index = 0; index < yearsUpsert.length; index++) {
          const yUpsert = yearsUpsert[index];

          if (foundYears.find((fY) => fY.year == yUpsert.year)) {
            let fYearIndex = foundYears.findIndex(
              (fY) => fY.year == yUpsert.year
            );
            foundYears[fYearIndex].active = yUpsert.active;
            foundYears[fYearIndex].value = yUpsert.value;
            upsertedYears.push(foundYears[fYearIndex]);
          } else {
            upsertedYears.push(yUpsert);
            // const uY = yearsUpsert[index];
            // for (let index = 0; index < yearsUpsert.length; index++) {
            // }
          }
        }

        upsertedYears = await financialResourcesYearRepo.save(upsertedYears);

        // if (foundYears.length > 0) {
        //   for (let index = 0; index < foundYears.length; index++) {
        //     let fY = foundYears[index];
        //     const yearIndx = yearsUpsert.findIndex((yU) => yU.year == fY.year);
        //     foundYears[index].active = yearsUpsert[yearIndx].active;
        //     foundYears[index].value = yearsUpsert[yearIndx].value;
        //     upsertedYears.push(foundYears[index]);
        //   }
        // } else {
        //   for (let index = 0; index < yearsUpsert.length; index++) {
        //     const uY = yearsUpsert[index];
        //     upsertedYears.push(uY);
        //   }
        // }
        // console.log(upsertedYears)
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
   ** REQUEST Finanacial Resources by section
   * @param sectionName
   * @returns {financialResources}
   */
  async requestFinancialResourcesBySection(sectionName) {
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
   ** REQUEST all Finanacial Resources
   * @param sectionName
   * @returns {financialResources}
   */
  async requestFinancialResources() {
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
            AND fR.active = 1
            GROUP BY
                fR.id
            ORDER BY fR.financial_type ;
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
    const initvStg = await this.setInitvStage();

    var results = [];
    var savedToc;
    var savedFullInitiativeToc;
    var savedWpToc;

    try {
      if (toc.length > 0) {
        for (let index = 0; index < toc.length; index++) {
          const element = toc[index];
          var newTocs = new entities.TOCs();

          newTocs.id = null;
          newTocs.toc_id = element.tocId ? element.tocId : element.toc_id;
          newTocs.narrative = element.narrative;
          newTocs.diagram = element.diagram;
          newTocs.type = element.type; // 0 into wp and 1 to level initiative
          newTocs.work_package = element.work_package_acronym;
          newTocs.work_package_id = element.work_package_id;
          newTocs.active = element.active ? element.active : true;
          newTocs.initvStgId = initvStg.id;

          if (newTocs.type) {
            savedFullInitiativeToc = await this.upsertFullInitiativeToC(
              newTocs
            );

            results.push(savedFullInitiativeToc);
          } else {
            savedWpToc = await this.upsertWorkPackageToC(newTocs);
            results.push(savedFullInitiativeToc);
          }
        }
      }

      return {savedTocs: results};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert TOC: Full proposal Domain',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT FULL INITIATIVE TOC
   */
  async upsertFullInitiativeToC(newTocs) {
    const tocsRepo = getRepository(entities.TOCs);
    const initvStg = await this.setInitvStage();

    var results = [];
    var savedFullInitiativeToc;

    try {
      var savedTocs: any = await tocsRepo.find({
        select: [
          'id',
          'initvStgId',
          'narrative',
          'diagram',
          'type',
          'active',
          'toc_id',
          'work_package',
          'work_package_id'
        ],
        where: {toc_id: newTocs.toc_id, initvStgId: newTocs.initvStgId}
      });

      // Validate if the initiative has saved information
      if (savedTocs.length > 0) {
        /**
         * Old Data
         */

        newTocs.id = savedTocs[0].id;

        tocsRepo.merge(savedTocs[0], newTocs);

        savedFullInitiativeToc = await tocsRepo.save(savedTocs);

        results.push(savedFullInitiativeToc);
      } else {
        /**
         * New Data
         */

        var savedTocsType: any = await tocsRepo.find({
          where: {initvStgId: newTocs.initvStgId, type: 1}
        });

        if (savedTocsType.length > 0) {
          for (let index = 0; index < savedTocsType.length; index++) {
            const element = savedTocsType[index];

            element.active = 0;

            await tocsRepo.save(element);
          }
        }

        newTocs.initvStgId = initvStg.id;

        savedFullInitiativeToc = await tocsRepo.save(newTocs);
        results.push(savedFullInitiativeToc);
      }

      return results;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Full Initiative ToC: Full proposal Domain',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT WORK PACKAGE TOC
   */
  async upsertWorkPackageToC(newTocs) {
    const tocsRepo = getRepository(entities.TOCs);
    const initvStg = await this.setInitvStage();

    var results = [];
    var savedWorkPackageToc;

    try {
      var savedTocs: any = await tocsRepo.find({
        select: [
          'id',
          'initvStgId',
          'narrative',
          'diagram',
          'type',
          'active',
          'toc_id',
          'work_package',
          'work_package_id'
        ],
        where: {
          work_package_id: newTocs.work_package_id,
          initvStgId: newTocs.initvStgId
        }
      });

      if (savedTocs.length > 0) {
        newTocs.id = savedTocs[0].id;

        tocsRepo.merge(savedTocs[0], newTocs);

        savedWorkPackageToc = await tocsRepo.save(savedTocs[0]);

        results.push(savedWorkPackageToc);
      } else {
        newTocs.initvStgId = initvStg.id;

        savedWorkPackageToc = await tocsRepo.save(newTocs);
        results.push(savedWorkPackageToc);
      }

      return results;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert Work Package ToC: Full proposal Domain',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST FULL INITIATIVE TOC BY INITIATIVE
   * @returns previewPartners
   */
  async requestFullInitiativeToc() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve preview partners
      const tocQuery = `
      SELECT id, initvStgId,narrative,diagram,type,toc_id,work_package,work_package_id,created_at,updated_at
        FROM tocs
       WHERE initvStgId = ${initvStg.id}
        and active = 1
        and type = 1
      `;

      const fullInitiativeToc = await this.queryRunner.query(tocQuery);

      return fullInitiativeToc[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get full initiative ToC: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST TOC BY INITIATIVE
   * @returns previewPartners
   */
  async requestTocByInitiative() {
    const initvStg = await this.setInitvStage();

    try {
      // retrieve preview partners
      const tocQuery = `
      SELECT id, initvStgId,narrative,diagram,type,toc_id,work_package,work_package_id,created_at,updated_at
        FROM tocs
       WHERE initvStgId = ${initvStg.id}
        and active = 1
      `;

      const fullInitiativeToc = await this.queryRunner.query(tocQuery);

      return fullInitiativeToc;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get ToC By Initiative: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** UPSERT ISDC Responses
   * @param ISDCResponsesData
   * @returns ISDCResponsesSave
   */
  async upsertISDCResponses(ISDCResponsesData: any) {
    const ISDCResponsesRepo = getRepository(entities.ISDCResponses);
    const initvStg = await this.setInitvStage();
    let toolsSbt = new ToolsSbt();
    let ISDCResponsesArray = [];

    try {
      ISDCResponsesData =
        typeof ISDCResponsesData === 'undefined' ? [] : ISDCResponsesData;
      for (let index = 0; index < ISDCResponsesData.length; index++) {
        const element = ISDCResponsesData[index];

        const newISDCResponse = new entities.ISDCResponses();

        newISDCResponse.id = element.id ? element.id : null;
        newISDCResponse.initvStgId = initvStg.id;
        newISDCResponse.user_id = element.user_id;
        newISDCResponse.isdc_recommendation = element.isdc_recommendation;
        newISDCResponse.response = element.response;
        newISDCResponse.updated_response = element.updated_response;
        newISDCResponse.is_deleted = element.is_deleted;

        ISDCResponsesArray.push(
          toolsSbt.mergeData(
            ISDCResponsesRepo,
            ` 
             SELECT *
               FROM isdc_responses
              WHERE id = ${newISDCResponse.id}
                and initvStgId =${newISDCResponse.initvStgId}`,
            newISDCResponse
          )
        );
      }

      const ISDCResponsesMerge = await Promise.all(ISDCResponsesArray);
      const ISDCResponsesSave = await ISDCResponsesRepo.save(
        ISDCResponsesMerge
      );

      return ISDCResponsesSave;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Upsert ISDC Responses: Full proposal ISDC',
        400,
        error.message,
        false
      );
    }
  }

  async requestISDCResponses() {
    const initvStg = await this.setInitvStage();
    const ISDCResponsesRepo = getRepository(entities.ISDCResponses);

    try {
      // const ISDCResponses = await ISDCResponsesRepo.find({
      //   where: {initvStgId: initvStg.id, is_deleted: false}
      // });
      const queryISDCResponses = `
      SELECT 
      ir.id,
      ir.initvStgId,
      ir.isdc_recommendation,
      ir.response,
      ir.updated_response,
      if(concat_ws(" ",u.first_name,u.last_name) = "", null, concat_ws(" ",u.first_name,u.last_name)) as username,
      ir.created_at,
      ir.updated_at
      FROM isdc_responses ir
      LEFT JOIN users u on ir.user_id = u.id
      WHERE ir.initvStgId = ${initvStg.id}
      AND ir.is_deleted = false;
      `;

      const ISDCResponses = await this.queryRunner.query(queryISDCResponses);

      return ISDCResponses;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'GET ISDC Responses: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   **REQUEST ISDC RESPONSES STATUS
   * @returns
   */
  async requestISDCResponsesStatus(stageId) {
    const ISDCResponsesRepo = getCustomRepository(IsdcResponsesRepository);

    try {
      const ISDCResponsesStatus =
        await ISDCResponsesRepo.findIsdcFeedbackStatus(stageId);

      return ISDCResponsesStatus;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'REQUEST ISDC Responses status: Full proposal domain',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** REQUEST ToC RESPONSES REPORTING
   * @returns
   */
  async requestTOCProgress(stageId) {
    const tocResponsesRepo = getCustomRepository(TocResponsesRepository);

    try {
      const tocResponsesReporting =
        await tocResponsesRepo.findTocProgressReporting(stageId);

      return tocResponsesReporting;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'REQUEST ToC Responses progress: Full proposal domain',
        400,
        error.message,
        false
      );
    }
  }

  async requestAllEndofInitiativeOutcomes() {
    try {
      const queryEOI = `
      select
      	i.id as initiative_id,
      	r.toc_result_id,
      	r.result_title as short_title,
      	r.result_description as outcome_statement
      from initiatives_by_stages ibs 
      	inner join initiatives i on i.id = ibs.initiativeId 
      							and ibs.active > 0
      	inner join stages s on ibs.stageId = s.id 
      	inner join results r ON r.initvStgId = ibs.id 
      							and r.result_type_id = 3
      							and r.active > 0
      	inner join results_types rt on rt.id = r.result_type_id 
      	order by i.id asc;
      `,
        stageInitiativeQuery = `
      select
        i.id as initiative_id,
        i.official_code as initiative_official_code,
        i.name as initiative_name,
        s.description as stage_name
      from initiatives_by_stages ibs 
        inner join initiatives i on i.id = ibs.initiativeId 
                    and ibs.active > 0
        inner join stages s on ibs.stageId = s.id
        order by i.id asc;
      `;
      const EoiByInit = await this.queryRunner.query(stageInitiativeQuery);
      const allEoi = await this.queryRunner.query(queryEOI);
      EoiByInit.map((res) => {
        res['eoi_o'] = allEoi.filter((aeoi) => {
          return res.initiative_id === aeoi.initiative_id;
        });
      });
      EoiByInit.map((res) => {
        res.eoi_o.map((el) => {
          delete el.initiative_id;
        });
      });
      return EoiByInit;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Request EOI By Initiative: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * * REQUEST EOI BY INITIATIVE
   * @returns eoi
   */

  async requestEndofInitiativeOutcomes() {
    const initvStg = await this.setInitvStage();

    try {
      const resultsQuery = `
      SELECT re.initvStgId,re.id,rt.name as type_name,wp.name as wp_name,
             wp.acronym wp_acronym,re.result_type_id as result_type,
             re.result_title,re.result_description,re.is_global,re.active
      FROM results re
      join results_types rt 
        on rt.id = re.result_type_id 
  left join work_packages wp 
        on wp.id = re.work_package_id 
     WHERE re.initvStgId = ${initvStg.id}
       AND rt.id  = 3
       AND re.active =1
      order by re.result_type_id,wp.id;
    `,
        resultsIndicatorsQuery = `
    SELECT ri.id, ri.name as indicator_name, ri.unit_measurement, 
    ri.results_id, ri.baseline_value, ri.baseline_year,
    ri.target_value, ri.target_year, ri.active, ri.data_source, 
    ri.data_collection_method as data_collection, ri.frequency_data_collection,
    ri.created_at, ri.updated_at
      FROM results_indicators ri
     WHERE ri.results_id in (SELECT re.id
      FROM results re
     WHERE re.initvStgId = ${initvStg.id}
       AND re.active =1);
    `,
        resultsRegionsQuery = `SELECT reg.id,reg.region_id,cr.name as region_name,reg.results_id ,reg.active,reg.created_at,reg.updated_at 
    FROM results_regions reg
    join clarisa_regions cr 
      on cr.um49Code  = reg.region_id 
   WHERE reg.results_id in (SELECT re.id
    FROM results re
   WHERE re.initvStgId = ${initvStg.id}
     AND re.active =1);`,
        resultsCountriesQuery = `
    SELECT co.id,co.country_id,cc.name as country_name,co.results_id ,co.active ,co.created_at, co.updated_at 
    FROM results_countries co
    join clarisa_countries cc 
      on cc.code  = co.country_id 
   WHERE co.results_id in (SELECT re.id
    FROM results re
   WHERE re.initvStgId = ${initvStg.id}
     AND re.active =1);`;

      const eoi = await this.queryRunner.query(resultsQuery);
      const resultsIndicators = await this.queryRunner.query(
        resultsIndicatorsQuery
      );
      const resultsRegions = await this.queryRunner.query(resultsRegionsQuery);
      const resultsCountries = await this.queryRunner.query(
        resultsCountriesQuery
      );

      eoi.map((res) => {
        res['indicators'] = resultsIndicators.filter((resi) => {
          return res.id === resi.results_id;
        });

        const reg = resultsRegions.filter((reg) => {
          return res.id === reg.results_id;
        });

        const cou = resultsCountries.filter((co) => {
          return res.id === co.results_id;
        });

        res['geo_scope'] = {regions: reg, countries: cou};
      });

      return eoi;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Request EOI By Initiative: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async getLastUpdateEoi() {
    const initvStg = await this.setInitvStage();
    try {
      const resultsQuery = `
      SELECT re.initvStgId,  max(rt.updated_at) as updated_at 
      FROM results re
      join results_types rt 
        on rt.id = re.result_type_id 
  left join work_packages wp 
        on wp.id = re.work_package_id 
     WHERE re.initvStgId = ${initvStg.id}
       AND rt.id  = 3
       AND re.active =1
       group by re.initvStgId, rt.updated_at
      order by re.result_type_id,wp.id;
    `;
      const result = await this.queryRunner.query(resultsQuery);
      return result[0];
    } catch (error) {
      throw new BaseError(
        'Request EOI last update: Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  async insertInitiativeApproval(
    user_id,
    initiativeId,
    is_approved,
    approved_reason
  ) {
    const initvApprovalRepo = await getRepository(entities.InitiativesApproval);
    const initvStageRepo = await getRepository(entities.InitiativesByStages);
    try {
      const newInitvApproval = await initvApprovalRepo.create({
        user_id,
        initiativeId,
        is_approved,
        approved_reason
      });
      await initvApprovalRepo.save(newInitvApproval);

      console.log({newInitvApproval});

      const initvStage: any = await initvStageRepo.findOne({
        where: {initiative: initiativeId, active: true}
      });

      if (newInitvApproval) {
        if (initvStage == null) {
          throw new BaseError(
            'Post Initiative Approval: Error',
            400,
            `Initiative not found`,
            false
          );
        }
        // Set status approved on Initiative by stage
        initvStage.status = 4;
        console.log({initvStage});
        const savedInitvStage = await initvStageRepo.save(initvStage);
        console.log({savedInitvStage});

        return newInitvApproval;
      }
      return newInitvApproval;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Insert iniative approval error',
        400,
        error.message,
        false
      );
    }
  }

  async upsertTracks(initiativeId, stageId, body) {
    const tracksRepo = await getRepository(entities.Tracks);
    const tracksYearsRepo = await getRepository(entities.TracksYears);
    const tracksYearsInitiativesRepo = await getRepository(
      entities.InitiativesTracksYears
    );
    const initvStageRepo = await getRepository(entities.InitiativesByStages);
    try {
      const tracks = await tracksRepo.find();
      console.log({tracks});

      const tracksYears = await tracksYearsRepo.find();

      const initvStg = await initvStageRepo.findOne({
        where: {stage: stageId, initiative: initiativeId}
      });

      let tracksRows = [];

      for (const track in body) {
        for (const year in body[track]) {
          console.log(tracks.find((tr) => tr.acronym == track));
          console.log(tracksYears.find((ty) => ty.year == year));
          let newValue = {
            id: body[track][year]['id'] ? body[track][year]['id'] : null,
            track_id: tracks.find((tr) => tr.acronym == track).id,
            track_year_id: tracksYears.find((ty) => ty.year == year).id,
            initvStgId: initvStg.id,
            value: body[track][year]['value']
          };
          tracksRows.push(newValue);
        }
      }

      const response = await tracksYearsInitiativesRepo.save(tracksRows);
      return tracksRows;
    } catch (error) {
      console.log(error);
      throw new BaseError('Upsert Tracks error', 400, error.message, false);
    }
  }

  async getTracks(initiativeId, stageId) {
    const tracksRepo = await getRepository(entities.Tracks);
    const tracksYearsRepo = await getRepository(entities.TracksYears);
    const tracksYearsInitiativesRepo = await getRepository(
      entities.InitiativesTracksYears
    );
    const initvStageRepo = await getRepository(entities.InitiativesByStages);
    try {
      const tracks = await tracksRepo.find();
      const tracksYears = await tracksYearsRepo.find();

      const initvStg = await initvStageRepo.findOne({
        where: {stage: stageId, initiative: initiativeId}
      });

      let tracksRows = await tracksYearsInitiativesRepo.find({
        where: {initvStgId: initvStg.id},
        relations: ['track', 'trackYear']
      });

      let responseTracks = {};

      for (const track of tracks) {
        responseTracks[track.acronym] = {};
        for (const ty of tracksYears) {
          responseTracks[track.acronym][ty.year] = {};
        }
      }

      for (const tr of tracksRows) {
        responseTracks[tr.track.acronym][tr.trackYear.year] = {
          value: tr.value,
          id: tr.id
        };
      }
      return responseTracks;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get Tracks error', 400, error.message, false);
    }
  }
}

interface MeliaTocData {
  active: number;
  id?: number;
  initvStgId: number;
  meliaId: number;
  outcomeId: number;
}
