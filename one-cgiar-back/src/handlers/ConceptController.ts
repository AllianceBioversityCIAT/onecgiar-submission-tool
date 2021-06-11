import { getConnection, getRepository } from "typeorm";
import _ from "lodash";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { validatedSection } from "../utils/section-validation";
import { ConceptSections } from "../interfaces/ConceptSectionsInterface";
import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";
import { ProposalHandler } from "./FullProposalController";


export class ConceptHandler extends InitiativeStageHandler {

    public sections: ConceptSections = <ConceptSections>{};


    private metaData_;

    /**
     * @returns stage section metadata
     */
    public get metaData() {

        try {
            this.metaData_ = this.queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_})`);
            return this.metaData_;
        } catch (error) {
            throw new BaseError('Get Metadata', 401, error.message, false)
        }

    }

    /**
     * 
     * @param initvStgId 
     * @returns { sections }
     */
    async getConceptData() {
        const initvStgId = this.initvStgId_;
        try {
            // add general information data 
            this.sections.general_information = await this.getGeneralInformation(initvStgId);
            const metadata = _.mapValues(_.groupBy(await this.metaData, 'group_by'),
                clist => clist.map(region => _.omit(region, 'group_by')));
            return { sections: this.sections, metadata };

        } catch (error) {
            console.log('eee');
            throw new BaseError('Get Concept data', 404, error.message, false);
        }
    }

    /**
     * 
     * @returns isMissing boolean
     */
    async validateCompletness() {
        //  get current intititve by stage
        const currentInitvStg = await this.initvStgRepo.findOne({ where: { id: this.initvStgId_ }, relations: ['stage', 'initiative'] });
        // get complited / valid sections of stage data
        const stageDesc = currentInitvStg.stage.description.split(' ').join('_').toLocaleLowerCase();
        const validatedSections = await validatedSection(currentInitvStg.id, stageDesc);
        // validate if any missing section
        const missingSctn = (element) => element == false || element == 0;
        const isMissing = Object.values(validatedSections).some(missingSctn);
        return !isMissing;
    }

    /***** REPLICATION PROCESS - forward *******/

    async forwardStage() {
        try {

            // current intiative by stage entity
            const curruentInitvByStg = await this.initvStage;
            // get full proposal stage id
            const pplStage = await this.queryRunner.query(`SELECT * FROM stages WHERE description LIKE 'Full Proposal'`);
            // get mapping metadata 
            const mappingMetada = await this.queryRunner.query(`SELECT from_meta_id, to_meta_id FROM mapping_metadata WHERE from_stage_name LIKE 'Concept' AND to_stage_name LIKE 'Full Proposal'`);


            // create full propsoal object
            const proposalObject = new ProposalHandler(null, pplStage[0].id, curruentInitvByStg[0].initiativeId);
            // validate if initiatitive by stage already exists
            const replicatedIntvStg = await proposalObject.setInitvStage();
            
            // get concept general information data 
            const conceptGI = await this.getGeneralInformation(curruentInitvByStg[0].initiativeId);
            // get general information if exists from proposalObject
            const proposalGI = await proposalObject.getGeneralInformation(replicatedIntvStg.id.toString());

            // upsert full proposal general infomation
            const pplGI = await proposalObject.upsertGeneralInformation(proposalGI ? proposalGI.concept_info_id : null, conceptGI.name, conceptGI.action_area_id, conceptGI.action_area_description);

            return pplGI

        } catch (error) {
            throw new BaseError('Forward Concept stage', 401, error.message, false)
        }
    }




    /***** CONCEPT SECTIONS GETTERS *******/

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
                IF(concept.name IS NULL OR concept.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), concept.name) AS name,

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

            WHERE initvStgs.id =${initvStgId};
        `;
            const generalInfo = await this.queryRunner.query(GIquery);

            return generalInfo[0];
        } catch (error) {
            throw new BaseError('Get general information', 401, error.message, false)
        }

    }

}