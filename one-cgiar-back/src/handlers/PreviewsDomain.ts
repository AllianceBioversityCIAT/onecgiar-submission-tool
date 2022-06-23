import {getConnection} from 'typeorm';
import {BaseError} from './BaseError';

export class PreviewsDomain {
  queryRunner = getConnection().createQueryRunner().connection;

  /**
   * REQUEST PREVIEW PARTNERS
   * @param initiativeId
   * @returns previewPartners
   */
  async requestPreviewPartners(initiativeId: string) {
    try {
      // retrieve preview partners
      const previewPartnersQuery = `
      SELECT ci.code,ci.acronym as acronym,ci.institutionType as institution_type,
      JSON_UNQUOTE(ci.data -> "$.hqLocationISOalpha2") as office_location,
      p.institutions_name as name,ia.name as impact_area,
      p.demand,p.innovation,p.scaling,JSON_UNQUOTE(ci.data-> "$.websiteLink") as website
       FROM impact_strategies i
       JOIN partners p
       JOIN clarisa_institutions ci
       JOIN initiatives_by_stages ist
       JOIN initiatives ini
       JOIN general_information gi
       LEFT JOIN clarisa_impact_areas ia
       ON i.impact_area_id = ia.id
       WHERE i.id = p.impact_strategies_id
        AND p.institutions_id = ci.code
        AND i.initvStgId = ist.id
        AND ist.initiativeId = ini.id
        AND i.initvStgId = gi.initvStgId
        AND i.initvStgId = ${initiativeId}
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
        'Get Partners per initiative: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW PROJECTED BENEFITS
   * @param initiativeId
   * @returns previewProjectedBenefits
   */
  async requestPreviewProjectedBenefits(initiativeId: string) {
    try {
      // retrieve preview projected benefits
      const impactAreasQuery = `
            SELECT p.id,p.impact_area_id,p.impact_area_name
              FROM projection_benefits p
             WHERE p.initvStgId = ${initiativeId}
               AND p.active > 0
             ORDER BY p.impact_area_id asc;   
            `,
        impactIndicatorQuery = `
                SELECT p.id,p.impact_area_indicator_id,p.impact_area_indicator_name,
                       p.depth_scale_id,p.depth_scale_name,p.probability_name,p.probability_id
                  FROM projection_benefits p
                 WHERE p.initvStgId = ${initiativeId}
                   AND p.active > 0;
                `,
        dimensionsQuery = `
        SELECT d.projectionId as projection_id,d.depth_description,cii.targetUnit,breadth_value
        FROM dimensions d
         JOIN projection_benefits pb
         ON d.projectionId = pb.id
        JOIN clarisa_impact_areas_indicators cii
          ON pb.impact_area_indicator_id = cii.id
        WHERE pb.initvStgId = ${initiativeId}
          AND d.active > 0`;

      const impactAreas = await this.queryRunner.query(impactAreasQuery);
      const impactIndicators = await this.queryRunner.query(
        impactIndicatorQuery
      );
      const dimensions = await this.queryRunner.query(dimensionsQuery);

      impactIndicators.map(
        (ii) =>
          (ii['dimensions'] = dimensions.filter((dim) => {
            return ii.id === dim.projection_id;
          }))
      );

      impactAreas.map(
        (ia) =>
          (ia['impactIndicators'] = impactIndicators.find((ii) => {
            return ia.id === ii.id;
          }))
      );

      return {impactAreas: impactAreas};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Projected Benefits: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW GEOGRAPHIC SCOPE
   * @param initiativeId
   * @returns GeoScope
   */
  async requestPreviewGeographicScope(initiativeId: string) {
    try {
      // retrieve preview Geographic Scope (Regions and countries)
      const countriesQuery = `
      SELECT DISTINCT(co.country_id) as clarisa_country_code,
      cco.isoAlpha2,cco.name
        FROM countries_by_initiative_by_stage co
       JOIN clarisa_countries cco
       ON co.country_id = cco.code
       JOIN initiatives_by_stages ist
          ON co.initvStgId = ist.id
       JOIN initiatives ini
          ON ist.initiativeId = ini.id
       WHERE co.initvStgId =${initiativeId}
         AND co.active = 1
         AND co.wrkPkgId IS NOT NULL
       GROUP BY co.id,co.country_id,cco.isoAlpha2,cco.name
          `,
        regionsQuery = `
        SELECT DISTINCT (r.region_id)as clarisa_region_code,
        re.name,re.acronym
        FROM regions_by_initiative_by_stage r
        JOIN clarisa_regions_cgiar re
        ON r.region_id = re.id
        JOIN initiatives_by_stages ist
        ON r.initvStgId = ist.id
        JOIN initiatives ini
        ON ist.initiativeId = ini.id
        WHERE r.initvStgId = ${initiativeId}
        AND r.active = 1
        AND r.wrkPkgId IS NOT NULL
        GROUP BY r.region_id,ini.official_code,re.name   
              `;

      const regions = await this.queryRunner.query(regionsQuery);
      const countries = await this.queryRunner.query(countriesQuery);

      return {GeoScope: {regions, countries}};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Geographic Scope per initiative: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW GEOGRAPHIC SCOPE
   * @param initiativeId
   * @returns GeoScope
   */
  async requestAllGeographicScope() {
    try {
      // retrieve preview Geographic Scope (Regions and countries)
      const countriesQuery = `
      SELECT DISTINCT(co.country_id) as clarisa_country_code,
      cco.isoAlpha2,cco.name,ini.official_code as initiative_code
        FROM countries_by_initiative_by_stage co
       JOIN clarisa_countries cco
       ON co.country_id = cco.code
       JOIN initiatives_by_stages ist
          ON co.initvStgId = ist.id
       JOIN initiatives ini
          ON ist.initiativeId = ini.id
       WHERE co.active = 1
         AND co.wrkPkgId IS NOT NULL
       GROUP BY co.id,co.country_id,cco.isoAlpha2,cco.name
          `,
        regionsQuery = `
        SELECT DISTINCT (r.region_id)as clarisa_region_code,
        re.name,re.acronym,ini.official_code as initiative_code
        FROM regions_by_initiative_by_stage r
        JOIN clarisa_regions_cgiar re
        ON r.region_id = re.id
        JOIN initiatives_by_stages ist
        ON r.initvStgId = ist.id
        JOIN initiatives ini
        ON ist.initiativeId = ini.id
        WHERE r.active = 1
        AND r.wrkPkgId IS NOT NULL
        GROUP BY r.region_id,ini.official_code,re.name
              `;

      const regions = await this.queryRunner.query(regionsQuery);
      const countries = await this.queryRunner.query(countriesQuery);

      return {GeoScope: {regions, countries}};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get all Geographic Scope: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW RISK ASSESSMENT
   * @param initiativeId
   * @returns GeoScope
   */
  async requestPreviewRiskAssessment(initiativeId: string) {
    try {
      // retrieve preview Geographic Scope (Regions and countries)
      const managePlanQuery = ` 
      SELECT id,initvStgId
      FROM manage_plan_risk
     WHERE initvStgId = ${initiativeId}
       AND active = 1;
      `,
        riskAssessmentQuery = `
          SELECT id,risks_achieving_impact,risks_theme,
                 description_risk,likelihood,impact,
                 risk_score,manage_plan_risk_id,active
           FROM risk_assessment
          WHERE manage_plan_risk_id in (
          SELECT id
          FROM manage_plan_risk
           WHERE initvStgId =${initiativeId}
             AND active = 1
               )
              `,
        opportunitiesQuery = `
              SELECT id,opportunities_description,
                     risk_assessment_id,active
              FROM opportunities opp
             WHERE risk_assessment_id in (
             SELECT id
               FROM risk_assessment
              WHERE manage_plan_risk_id in (
             SELECT id
             FROM manage_plan_risk
              WHERE initvStgId = ${initiativeId}
                AND opp.active = 1
               )
              );
              
              `;

      const managePlan = await this.queryRunner.query(managePlanQuery);
      const risk = await this.queryRunner.query(riskAssessmentQuery);
      const opportunities = await this.queryRunner.query(opportunitiesQuery);

      risk.map((ri) => {
        ri['opportunities'] = opportunities.filter((op) => {
          return op.risk_assessment_id === ri.id;
        });
      });

      managePlan.map((mel) => {
        mel['riskassessment'] = risk.filter((ri) => {
          return ri.manage_plan_risk_id === mel.id;
        });
      });

      return {managePlan: managePlan[0]};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Risk Assessment: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW HUMAN RESOURCES
   * @param initiativeId
   * @returns previewHumanResources
   */
  async requestPreviewHumanResources(initiativeId: string) {
    try {
      const initiativeTeamQuery = `SELECT category, area_expertise,key_accountabilities
        FROM initiative_team
       WHERE human_resources_id in (
       SELECT id
         FROM human_resources
        WHERE initvStgId =  ${initiativeId}
          AND active = 1
       )
       AND active = 1;`;

      const initiativeTeam = await this.queryRunner.query(initiativeTeamQuery);

      return {initiativeTeam: initiativeTeam};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Preview Human Resources: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW FINANCIAL RESOURCES
   * @param initiativeId
   * @returns previewHumanResources
   */
  async requestPreviewFinancialResources(initiativeId: string) {
    try {
      const financialResourcesQuery = `SELECT if(fr.col_name='id',wp.acronym,fr.col_name) as description,
      fy.year,fy.value
      FROM financial_resources fr
      LEFT JOIN financial_resources_years fy
      ON fr.id = fy.financialResourcesId
      LEFT JOIN work_packages wp
      ON fr.financial_type_id = wp.id
     WHERE fr.initvStgId = ${initiativeId}
     AND fr.active > 0;`;

      const finacialResources = await this.queryRunner.query(
        financialResourcesQuery
      );

      return {financialResources: finacialResources};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Preview Financial Resources: Previews General',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * REQUEST PREVIEW WORK PACKAGES
   * @param initiativeId
   * @returns previewHumanResources
   */
  async requestWorkPackages(initiativeId: string) {
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

        SELECT wp.initvStgId,init.initiativeId,init.stageId, wp.*
        FROM initiatives_by_stages init
   LEFT JOIN  work_packages wp
          on wp.initvStgId  = init.id
       WHERE init.id =  ${initiativeId}
         AND wp.active = 1
    ORDER BY initiativeId asc
                    `;

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
      console.log(error);
      throw new BaseError(
        'ERROR Get Preview Human Resources: Previews General',
        400,
        error.message,
        false
      );
    }
  }
}
