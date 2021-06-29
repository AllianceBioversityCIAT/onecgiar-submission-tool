import _ from "lodash";
import { getRepository } from "typeorm";
import { getClaActionAreas } from "../controllers/Clarisa";
import { ConceptInfo } from "../entity/ConceptInfo";
import { ConceptSections } from "../interfaces/ConceptSectionsInterface";
import { BaseError } from "./BaseError";
import { ProposalHandler } from "./FullProposalController";
import { ConceptValidation } from "./validation/ConceptSectionValidation";


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
            this.metaData_ = this.queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_})`);
            return this.metaData_;
        } catch (error) {
            throw new BaseError('Get Metadata', 406, error.message, false)
        }

    }




    /***** REPLICATION PROCESS - forward *******/

    async forwardStage() {
        try {

            // current intiative by stage entity
            const curruentInitvByStg = await this.initvStage;
            // get full proposal stage id
            const pplStage = await this.queryRunner.query(`SELECT * FROM stages WHERE description LIKE 'Full Proposal'`);
            // get mapping metadata from concept
            const mppMtSql = `
                SELECT
                    stg_mt.id, stg_mt.stage_name, stg_mt.group_by,
                (SELECT to_meta_id FROM mapping_metadata WHERE from_meta_id = stg_mt.id) as map_to,
            (SELECT group_by FROM stages_meta WHERE id = map_to) as map_to_group,
                (SELECT stageId FROM stages_meta WHERE id = map_to) as map_from,
                    (SELECT stage_name FROM stages_meta WHERE id = map_to) as map_from_group
            FROM
            stages_meta stg_mt
            WHERE stageId = ${curruentInitvByStg[0].stageId}
            GROUP BY group_by
                `;
            // mapping metada 
            // const mappingSections = await this.queryRunner.query(mppMtSql);

            // create full propsoal object
            const proposalObject = new ProposalHandler(null, pplStage[0].id, curruentInitvByStg[0].initiativeId);
            // validate if initiatitive by stage already exists
            const replicatedIntvStg = await proposalObject.setInitvStage();

            // get concept general information data 
            const conceptGI = await this.getGeneralInformation(curruentInitvByStg[0].id);

            // get general information if exists from proposalObject
            const proposalGI = await proposalObject.getGeneralInformation(replicatedIntvStg.id.toString());

            // upsert full proposal general infomation
            const pplGI = await proposalObject.upsertGeneralInformation(proposalGI ? proposalGI.concept_info_id : null, conceptGI.name, conceptGI.action_area_id, conceptGI.action_area_description);

            return pplGI

        } catch (error) {
            throw new BaseError('Forward Concept stage', 406, error.message, false)
        }
    }




    /***** CONCEPT SECTIONS GETTERS *******/
    /**

    /**
     * 
     * @param initvStgId 
     * @returns { generalInfo, generalInfoMeta }
     */
    async getGeneralInformation(initvStgId: string) {

        try {
            const GIquery = `
            SELECT
            initvStgs.id AS initvStgId,
                concept.id AS concept_info_id,
                    IF(concept.name IS NULL OR concept.name = '', (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId), concept.name) AS name,

                        (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                            (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,

                                    (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                                        (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                                            (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,

                                                concept.action_area_description AS action_area_description,
                                                    concept.action_area_id AS action_area_id

            FROM
            initiatives_by_stages initvStgs
            LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.id

            WHERE initvStgs.id = ${initvStgId};
            `;
            const generalInfo = await this.queryRunner.query(GIquery);

            return generalInfo[0];
        } catch (error) {
            throw new BaseError('Get general information', 406, error.message, false)
        }

    }



    /*******  CONCEPT SECTIONS SETTERS   *********/

    async upsertGeneralInformation(concept_info_id, name, action_area_id, action_area_description) {
        const concptInfoRepo = getRepository(ConceptInfo);
        //  create concept info empty object 
        let conceptInf: ConceptInfo;
        try {
            // get current intiative by stage
            const initvStg = await this.initvStage;
            // get clarisa action action areas
            const actionAreas = await getClaActionAreas();
            // get select action areas for initiative
            const selectedActionArea = actionAreas.find(area => area.id == action_area_id) || { name: null };

            // if null, create concept info object
            if (concept_info_id == null) {

                conceptInf = new ConceptInfo();
                conceptInf.name = name;

                conceptInf.action_area_description = action_area_description || selectedActionArea.name;
                conceptInf.action_area_id = action_area_id;
                // assign initiative by stage
                conceptInf.initvStg = initvStg[0].id;
            } else {
                conceptInf = await concptInfoRepo.findOne(concept_info_id);
                conceptInf.name = (name) ? name : conceptInf.name;
                conceptInf.action_area_description = selectedActionArea.name;
                conceptInf.action_area_id = (action_area_id) ? action_area_id : conceptInf.action_area_id;

            }
            // upserted data 
            let upsertedInfo = await concptInfoRepo.save(conceptInf);

            //    update initiative name
            let initiative = await this.initiativeRepo.findOne(initvStg.initiativeId);
            initiative.name = upsertedInfo.name;
            initiative = await this.initiativeRepo.save(initiative);



            // retrieve general information
            const GIquery = ` 
                SELECT
                        initvStgs.id AS initvStgId,
                        concept.id AS concept_info_id,
                        IF(concept.name IS NULL OR concept.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.id ), concept.name) AS name,
                
                        (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                        (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                        (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
                
                        (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                        (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                        (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                                    
                        concept.action_area_description AS action_area_description,
                        concept.action_area_id AS action_area_id
                
                FROM
                        initiatives_by_stages initvStgs
                LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId
                
                WHERE initvStgs.id = ${this.initvStgId_};
            `;
            const generalInfo = await this.queryRunner.query(GIquery);

            return generalInfo[0];
        } catch (error) {
            console.log(error)
            throw new BaseError('Upsert general information - concept', 406, error.message, false)
        }
    }



}