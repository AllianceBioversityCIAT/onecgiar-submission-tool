import { getConnection } from 'typeorm'
import { BaseError } from "./BaseError";

export class PreviewsDomain {

    queryRunner = getConnection().createQueryRunner().connection;

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
            throw new BaseError('Get Preview Partners: Full proposal', 400, error.message, false)

        }

    }


}
