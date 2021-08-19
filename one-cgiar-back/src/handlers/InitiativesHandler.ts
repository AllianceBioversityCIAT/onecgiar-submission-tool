import { getConnection } from "typeorm";
import { BaseError } from "./BaseError";


export class InitiativeHandler {

    public queryRunner = getConnection().createQueryRunner();

    /** Get all initiatives for main table */
    async getAllInitiatives() {

        let allInitiatives,
            stagesInitiatives,
            initvActiveSQL = (` 
        SELECT
        initvStg.id AS initvStgId,
        initiative.id AS id,
        initiative.name AS name,
        IF( initvStg.status IS NULL, 'Editing', initvStg.status) AS status,
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
        `),
            initvDetailSQL = (`
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
        `)

        try {

            allInitiatives = await this.queryRunner.query(initvActiveSQL);
            stagesInitiatives = await this.queryRunner.query(initvDetailSQL);

            // Map Initiatives
            allInitiatives.map(active => {
                active['stages'] = stagesInitiatives.filter(detail => {
                    return (detail.id === active.id)
                })
            })

            return allInitiatives

        } catch (error) {

            throw new BaseError('Get Inititives', 400, error.message, false)

        }

    }

}
