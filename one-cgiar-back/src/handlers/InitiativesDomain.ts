import {getConnection, getRepository} from 'typeorm';
import {Initiatives, InitiativesByStages} from '../entity/index';
import {BaseError} from './BaseError';
import {InitiativeStageHandler} from './InitiativeStageDomain';

export class InitiativeHandler extends InitiativeStageHandler {
  public queryRunner = getConnection().createQueryRunner().connection;

  async createInitiativesByStage(name?, acronym?, stage?) {
    const initiativeRepo = getRepository(Initiatives);
    const initvStgRepo = getRepository(InitiativesByStages);

    const newInitiative = new Initiatives();
    const newInitvStg = new InitiativesByStages();

    try {
      const lastId = await this.queryRunner.query(
        'SELECT MAX(ID) as lastId FROM initiatives'
      );

      const nextId = parseInt(lastId[0].lastId) + 1;
      const official_code = 'INIT-' + nextId;

      newInitiative.id = nextId;
      newInitiative.name = name;
      newInitiative.acronym = acronym;
      newInitiative.official_code = official_code;

      const savedInitiative: any = await initiativeRepo.save(newInitiative);

      newInitvStg.initiative = savedInitiative.id;
      newInitvStg.stage = stage.id;
      newInitvStg.active = true;

      const savedInitvStg = await initvStgRepo.save(newInitvStg);

      return {savedInitiative, savedInitvStg};
    } catch (error) {
      throw new BaseError(
        'createInitiativesByStage',
        400,
        error.message,
        false
      );
    }
  }

  /** Get users by initiatives and roles */
  async getUsersByInitiativesList() {
    let getUsersByInitiatives;

    try {
      getUsersByInitiatives = await this.queryRunner.query(
        `select  i.official_code as official_code,i.name as initiative_name, 
           CONCAT(u.first_name," ",u.last_name) as  user_name,u.email,
           r.name as role, u.last_login
             from initiatives_by_users ibu
        left join users u on ibu.userId = u.id
             join roles_by_users rbu on u.id = rbu.user_id
        left join initiatives i on ibu.initiativeId =i.id
        left join roles r on ibu.roleId = r.id
        left join initiatives_by_stages ibs on ibs.initiativeId = i.id
            where ibu.active = true
              and ibs.active > 0
          order by i.id;`
      );

      return getUsersByInitiatives;
    } catch (error) {
      throw new BaseError(
        'Get users by initiatives list',
        400,
        error.message,
        false
      );
    }
  }

  /** Get existing initiatives without stage */
  async getInitiativesList() {
    let allInitiatives;

    try {
      allInitiatives = await this.queryRunner.query(
        `SELECT id, name, official_code, acronym FROM initiatives`
      );

      return allInitiatives;
    } catch (error) {
      throw new BaseError('Get initiatives list', 400, error.message, false);
    }
  }
  /** Get all initiatives for main table */
  async getAllInitiatives() {
    let allInitiatives,
      stagesInitiatives,
      initvActiveSQL = ` 
      SELECT
      initvStg.id AS initvStgId,
      initiative.id AS id,
      initiative.acronym,
      initiative.name AS name,
      initiative.official_code,
      -- IF( initvStg.status IS NULL, 'Editing', initvStg.status) AS status,
      (SELECT status FROM statuses WHERE id = initvStg.statusId ) AS status,
      (SELECT action_area_id FROM general_information WHERE initvStgId = initvStg.id) AS action_area_id,
      (SELECT action_area_description FROM general_information WHERE initvStgId = initvStg.id) AS action_area_description,
      initvStg.active AS active,
      initvStg.stageId AS stageId,
      (SELECT description FROM stages WHERE id = initvStg.stageId) AS description
      FROM
          initiatives initiative
      LEFT JOIN initiatives_by_stages initvStg 
      ON initvStg.initiativeId = initiative.id
      LEFT JOIN stages stage 
      ON stage.id = initvStg.stageId
      WHERE  initvStg.active = 1
      ORDER BY id
        `,
      initvDetailSQL = `
        SELECT
        initiative.id AS id,
        initvStg.id AS initvStgId,
        initvStg.stageId AS stageId,
        initvStg.active AS active
        FROM
            initiatives initiative
        LEFT JOIN initiatives_by_stages initvStg 
        ON initvStg.initiativeId = initiative.id
        LEFT JOIN stages stage 
        ON stage.id = initvStg.stageId
        `;

    try {
      allInitiatives = await this.queryRunner.query(initvActiveSQL);
      stagesInitiatives = await this.queryRunner.query(initvDetailSQL);

      // Map Initiatives
      allInitiatives.map((active) => {
        active['stages'] = stagesInitiatives.filter((detail) => {
          return detail.id === active.id;
        });
      });

      return allInitiatives;
    } catch (error) {
      throw new BaseError('Get initiatives', 400, error.message, false);
    }
  }

  /** Get all initiatives Whit all status */
  async getAllInitiativesAllStatus() {
    let allInitiatives,
      stagesInitiatives,
      initvActiveSQL = ` 
      SELECT
      initvStg.id AS initvStgId,
      initiative.id AS id,
      initiative.acronym,
      initiative.name AS name,
      initiative.official_code,
      -- IF( initvStg.status IS NULL, 'Editing', initvStg.status) AS status,
      (SELECT status FROM statuses WHERE id = initvStg.statusId ) AS status,
      (SELECT action_area_id FROM general_information WHERE initvStgId = initvStg.id) AS action_area_id,
      (SELECT action_area_description FROM general_information WHERE initvStgId = initvStg.id) AS action_area_description,
      initvStg.active AS active,
      initvStg.stageId AS stageId,
      CONCAT("Stage ", initvStg.stageId,': ', (SELECT description FROM stages WHERE id = initvStg.stageId) ) AS description
      FROM
          initiatives initiative
      LEFT JOIN initiatives_by_stages initvStg 
      ON initvStg.initiativeId = initiative.id
      LEFT JOIN stages stage 
      ON stage.id = initvStg.stageId
      ORDER BY id
          `,
      initvDetailSQL = `
          SELECT
          initiative.id AS id,
          initvStg.id AS initvStgId,
          initvStg.stageId AS stageId,
          initvStg.active AS active
          FROM
              initiatives initiative
          LEFT JOIN initiatives_by_stages initvStg 
          ON initvStg.initiativeId = initiative.id
          LEFT JOIN stages stage 
          ON stage.id = initvStg.stageId
          `;

    try {
      allInitiatives = await this.queryRunner.query(initvActiveSQL);
      stagesInitiatives = await this.queryRunner.query(initvDetailSQL);

      // Map Initiatives
      allInitiatives.map((active) => {
        active['stages'] = stagesInitiatives.filter((detail) => {
          return detail.id === active.id;
        });
      });

      return allInitiatives;
    } catch (error) {
      throw new BaseError('Get initiatives', 400, error.message, false);
    }
  }

  /**
   * GET USER PER INITIATIVE
   * @param initiativeId
   * @returns users
   */
  async getUsersByInitiative(initiativeId: string | number) {
    const querySql = `
            SELECT
                users.first_name AS first_name,
                users.last_name AS last_name,
                users.email AS email,
                (SELECT description FROM roles WHERE id = initvUsr.roleId) AS role_name,
                (SELECT acronym FROM roles WHERE id = initvUsr.roleId) AS role_acronym,
                roleId,users.id as userId
            FROM
                initiatives_by_users initvUsr
            LEFT JOIN users users ON users.id = initvUsr.userId
            WHERE
                initiativeId = ${initiativeId};
    `;
    const users = await this.queryRunner.query(querySql);
    return users;
  }

  /**
   ** GET METADATA (CLARISA) FROM SUBMISSION TOOL
   */

  async requestDepthScale(impactIndicatorId) {
    const querySql = `
        SELECT * 
        FROM depth_scales
       WHERE impactIndicatorId =${impactIndicatorId}
`;
    const depthScaleData = await this.queryRunner.query(querySql);
    return depthScaleData;
  }

  async requestDepthDescription(impactIndicatorId) {
    const querySql = `
        SELECT * 
        FROM  depth_descriptions
       WHERE impactIndicatorId =${impactIndicatorId}
`;
    const depthDescriptionData = await this.queryRunner.query(querySql);
    return depthDescriptionData;
  }

  async requestProjectedProbabilities() {
    const querySql = `
        SELECT * 
        FROM  projected_probabilities
    `;
    const projectedData = await this.queryRunner.query(querySql);
    return projectedData;
  }

  async requestInstitutions() {
    const querySql = `
        SELECT code,name,acronym,institutionTypeId,institutionType 
        FROM clarisa_institutions
`;
    const institutions = await this.queryRunner.query(querySql);
    return institutions;
  }

  async requestImpactAreas() {
    const querySql = `
        SELECT id,name,description
        FROM clarisa_impact_areas`;
    const impactAreas = await this.queryRunner.query(querySql);
    return impactAreas;
  }

  async requestImpactAreasIndicators() {
    const querySql = `
        SELECT id as indicatorId,indicatorStatement,
               impactAreaId,impactAreaName,targetYear,
               targetUnit,value,isAplicableProjectedBenefits
        FROM clarisa_impact_areas_indicators`;
    const impactAreasIndicators = await this.queryRunner.query(querySql);
    return impactAreasIndicators;
  }

  async requestActionAreas() {
    const querySql = `
        SELECT id,name,description
        FROM clarisa_action_areas`;
    const actionAreas = await this.queryRunner.query(querySql);
    return actionAreas;
  }

  async requestInstitutionsTypes() {
    const querySql = `
        SELECT id as code,name
        FROM clarisa_institutions_types
`;
    const institutionsTypes = await this.queryRunner.query(querySql);
    return institutionsTypes;
  }

  async requestGlobalTargets() {
    const querySql = `
        SELECT id, impact_area_id,impact_area_name,target
        FROM clarisa_global_targets
`;
    const globalTargets = await this.queryRunner.query(querySql);
    return globalTargets;
  }

  async requestCountries() {
    const querySql = `
        SELECT code,isoAlpha2,name,regionDTO
        FROM clarisa_countries`;
    const countries = await this.queryRunner.query(querySql);
    return countries;
  }

  async requestRegions() {
    const querySql = `
        SELECT name,parentRegion,um49Code
        FROM clarisa_regions`;
    const countries = await this.queryRunner.query(querySql);
    return countries;
  }

  async requestRegionsCgiar() {
    const querySql = `
        SELECT id,name,acronym
        FROM clarisa_regions_cgiar`;
    const countries = await this.queryRunner.query(querySql);
    return countries;
  }

  async requestRisks() {
    try {
      const querySql = `
      SELECT ri.id,ri.generic_risks,ri.clarisa_risks_theme_id,th.risk_theme as risks_theme
      FROM clarisa_risks ri
      JOIN clarisa_risk_theme th
        ON ri.clarisa_risks_theme_id = th.id;`;
      const risks = await this.queryRunner.query(querySql);
      return risks;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get Risks', 400, error.message, false);
    }
  }

  async requestRisksTheme() {
    try {
      const querySql = `
      SELECT * 
      FROM clarisa_risk_theme;`;
      const risks = await this.queryRunner.query(querySql);
      return risks;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get Risks Theme', 400, error.message, false);
    }
  }

  async requestProjectedBenefits() {
    try {
      const querySql = `
            SELECT id as impactAreaId,impactAreaName,impactAreaIndicator,
                   impactAreaIndicatorName,isApplicableProjectedBenefits,
                   targetYear,targetUnit,value,depthScales,weightingValues
              FROM clarisa_projected_benefits`;
      const projectedBenefits = await this.queryRunner.query(querySql);

      try {
        projectedBenefits.map((pb) => {
          pb.depthScales = JSON.parse(
            JSON.parse(JSON.stringify(pb.depthScales))
          );
          pb.weightingValues = JSON.parse(
            JSON.parse(JSON.stringify(pb.weightingValues))
          );
        });
      } catch (error) {
        projectedBenefits;
      }

      return projectedBenefits;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get Projected benefits', 400, error.message, false);
    }
  }

  async requestSdgTargets() {
    try {
      const querySql = `
      SELECT id, sdg_target_code,sdg_target,sdg
        FROM clarisa_sdg_targets`;
      const sdgTargets = await this.queryRunner.query(querySql);

      return sdgTargets;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get SDG Targets', 400, error.message, false);
    }
  }

  async requestActionAreasOutIndicators() {
    try {
      const querySql = `
      SELECT id,action_area_id,action_area_name,
	           outcome_id,outcome_indicator_smo_code,outcome_indicator_statement,
             outcome_indicator_id,outcome_indicator_smo_code,outcome_indicator_statement
       FROM clarisa_action_areas_outcomes_indicators`;
      const actionAreasOutIndicators = await this.queryRunner.query(querySql);

      return actionAreasOutIndicators;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get Action Areas Outcomes Indicators',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** PREVIEW PARTNERS FOR IMPACT STRATEGIES
   */
  async requestPreviewPartners() {
    try {
      const previewPartnersQuery = `
            SELECT p.institutions_name as partner_name,JSON_UNQUOTE(ci.data-> "$.websiteLink") as url,ci.acronym as acronym,
                  ini.official_code as initiative_id,gi.action_area_description as action_area ,
                  '' partner_id,'' location,'' as organization_type_IATI, '' as network_mapping_codes,
                  ci.institutionType as organization_type_clarisa,ci.institutionTypeId as clarisa_id,
                  p.demand,p.innovation,p.scaling,JSON_UNQUOTE(ci.data -> "$.hqLocationISOalpha2") as hq_location_clarisa,i.impact_area_id,
                  'impact_satatements' as Source
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
              AND i.active > 0
            ORDER BY ini.id asc     
            `;

      const previewPartners = await this.queryRunner.query(
        previewPartnersQuery
      );
      return previewPartners;
    } catch (error) {
      console.log(error);
      throw new BaseError('Get Preview Partners', 400, error.message, false);
    }
  }

  requestMeliaStudyTypes() {
    try {
      const meliaStudyTypesQuery = `SELECT * FROM clarisa_melia_study_types`;
      const meliaStudyTypes = this.queryRunner.query(meliaStudyTypesQuery);
      return meliaStudyTypes;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Get CLARISA MELIA Study Types',
        400,
        error.message,
        false
      );
    }
  }

  async requestYears() {
    const querySql = `
        SELECT year
        FROM years`;
    let years = await this.queryRunner.query(querySql);
    return years;
  }
}
