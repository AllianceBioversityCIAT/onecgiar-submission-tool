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
             JOIN clarisa_impact_areas ia
            WHERE i.id = p.impact_strategies_id
              AND p.institutions_id = ci.code
              AND i.initvStgId = ist.id
              AND ist.initiativeId = ini.id
              AND i.initvStgId = gi.initvStgId
              AND i.impact_area_id = ia.id
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
        'Get Preview Partners: Previews General',
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
                       p.depth_scale_id,p.probability_id,p.depth_scale_name,p.probability_name
                  FROM projection_benefits p
                 WHERE p.initvStgId = ${initiativeId}
                   AND p.active > 0;
                `,
        dimensionsQuery = `
             SELECT d.projectionId,d.depth_description,breadth_value
               FROM dimensions d
              WHERE d.projectionId in (SELECT p.id
               FROM projection_benefits p
              WHERE p.initvStgId = ${initiativeId})
                AND d.active > 0
                `;

      const impactAreas = await this.queryRunner.query(impactAreasQuery);
      const impactIndicators = await this.queryRunner.query(
        impactIndicatorQuery
      );
      const dimensions = await this.queryRunner.query(dimensionsQuery);

      impactIndicators.map(
        (ii) =>
          (ii['dimensions'] = dimensions.filter((dim) => {
            return ii.id === dim.projectionId;
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
        'Get Preview Projected Benefits: Previews General',
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
      SELECT DISTINCT(co.country_id),
            (SELECT cc.name FROM  clarisa_countries cc WHERE cc.code = co.country_id) as name,
            co.initvStgId
       FROM countries_by_initiative_by_stage co
      WHERE co.initvStgId = ${initiativeId}
        AND co.active = 1
        AND co.wrkPkgId IS NOT NULL
      GROUP BY co.id,co.country_id  
          `,
        regionsQuery = `
        SELECT DISTINCT (r.region_id),
               (SELECT cr.name FROM  clarisa_regions cr WHERE cr.um49Code = r.region_id) as name
               ,r.initvStgId
          FROM regions_by_initiative_by_stage r
         WHERE r.initvStgId = ${initiativeId}
           AND r.active = 1
           AND r.wrkPkgId IS NOT NULL
         GROUP BY r.region_id
              `;

      const regions = await this.queryRunner.query(regionsQuery);
      const countries = await this.queryRunner.query(countriesQuery);

      return {GeoScope: {regions, countries}};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'ERROR Get Preview Geographic Scope: Previews General',
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
          SELECT id,risks_achieving_impact,
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
              WHERE initvStgId = ${initiativeId}
                AND active = 1
               )
              );
              
              `;

      const managePlan = await this.queryRunner.query(managePlanQuery);
      const risk = await this.queryRunner.query(riskAssessmentQuery);
      const opportinities = await this.queryRunner.query(opportinitiesQuery);

      risk.map((ri) => {
        ri['opportinities'] = opportinities.filter((op) => {
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
        'ERROR Get Preview Risk Assessment: Previews General',
        400,
        error.message,
        false
      );
    }
  }
}
