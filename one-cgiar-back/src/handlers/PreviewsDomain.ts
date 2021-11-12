import { getConnection } from 'typeorm'
import { BaseError } from "./BaseError";

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
              AND i.initvStgId = ${initiativeId}
              AND i.active > 0
            ORDER BY ini.id asc     
            `

            const previewPartners = await this.queryRunner.query(previewPartnersQuery);

            return previewPartners;

        } catch (error) {

            console.log(error)
            throw new BaseError('Get Preview Partners: Previews General', 400, error.message, false)

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
            const impactAreasQuery = (`
            SELECT p.id,p.impact_area_id,p.impact_area_name,
                   p.impact_area_indicator_id,p.impact_area_indicator_name,
                   p.depth_scale_id,p.probability_id,p.depth_scale_name,p.probability_name
              FROM projection_benefits p
             WHERE p.initvStgId = ${initiativeId}
               AND p.active > 0;   
            `),
                dimensionsQuery = (
                    `
                SELECT d.projectionId,d.depth_description,breadth_value
                FROM dimensions d
               WHERE d.projectionId in (SELECT p.id
               FROM projection_benefits p
              WHERE p.initvStgId = ${initiativeId})
                AND d.active > 0
                `
                )

            const impactAreas = await this.queryRunner.query(impactAreasQuery);
            const dimensions = await this.queryRunner.query(dimensionsQuery);

            impactAreas.map(ia =>

                ia['dimensions'] = [
                    dimensions.filter(dim => {
                        return (ia.id === dim.projectionId)
                    })
                ]

            )

            return impactAreas;

        } catch (error) {

            console.log(error)
            throw new BaseError('Get Preview Projected Benefits: Previews General', 400, error.message, false)

        }

    }



}
