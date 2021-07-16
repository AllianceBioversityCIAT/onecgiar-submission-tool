import { getRepository } from "typeorm";
import { getClaActionAreas } from "../controllers/Clarisa";
import { ConceptInfo } from "../entity/ConceptInfo";
import { Context } from "../entity/Context";
import { GeneralInformation } from "../entity/GeneralInformation";
import { ProposalSections } from "../interfaces/FullProposalSectionsInterface";
import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";


export class ProposalHandler extends InitiativeStageHandler {
    public sections: ProposalSections = <ProposalSections>{
        general_information: null,
        context: null
    };


    private metaData_;

    /**
     * @returns stage section metadata
     */
    public get metaData() {

        try {
            this.metaData_ = this.queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_}) ORDER BY stages_meta.order`);
            return this.metaData_;
        } catch (error) {
            throw new BaseError('Get Metadata', 406, error.message, false)
        }

    }


    /*****  FULL PROPOSAL GETTERS *******/

    /**
     * 
     * @param initvStgId 
     * @returns { generalInfo }
     */
    async getGeneralInformation() {
        // get initiative by stage id from intitiative
        const initvStgId: string = this.initvStgId_;
        try {
            // general information sql query
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
            
            WHERE initvStgs.id = ${initvStgId};
        `;
            const generalInfo = await this.queryRunner.query(GIquery);

            return generalInfo[0];
        } catch (error) {
            throw new BaseError('Get general information', 406, error.message, false)
        }

    }

    /**
     * 
     * @param initvStgId 
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
            throw new BaseError('Get context', 406, error.message, false)
        }
    }



    /*******  FULL PROPOSAL SETTERS   *********/

    /**
     * 
     * @param generalInformationId? 
     * @param name 
     * @param action_area_id 
     * @param action_area_description 
     * @returns generalInformation
     */

    async upsertGeneralInformation(generalInformationId?, name?, action_area_id?, action_area_description?) {
        const gnralInfoRepo = getRepository(GeneralInformation);
        //  create empty object 
        let generalInformation: GeneralInformation;
        try {
            // get current intiative by stage
            const initvStg = await this.initvStage;
            // get clarisa action action areas
            const actionAreas = await getClaActionAreas();

            // get select action areas for initiative
            const selectedActionArea = actionAreas.find(area => area.id == action_area_id) || { name: null };


            // if null, create object
            if (generalInformationId == null) {

                generalInformation = new GeneralInformation();
                generalInformation.name = name;

                generalInformation.action_area_description = action_area_description || selectedActionArea.name;
                generalInformation.action_area_id = action_area_id;
                // assign initiative by stage
                generalInformation.initvStg = initvStg[0].id;
            } else {
                generalInformation = await gnralInfoRepo.findOne(generalInformationId);
                generalInformation.name = (name) ? name : generalInformation.name;
                generalInformation.action_area_description = selectedActionArea.name;
                generalInformation.action_area_id = (action_area_id) ? action_area_id : generalInformation.action_area_id;

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
            
            WHERE initvStgs.id = ${this.initvStgId_};
            `;
            const generalInfo = await this.queryRunner.query(GIquery);

            return generalInfo[0];
        } catch (error) {
            console.log(error)
            throw new BaseError('Upsert general information - full proposal', 406, error.message, false)
        }
    }

    /**
     * 
     * @param contextId? 
     * @param challenge_statement 
     * @param smart_objectives 
     * @param key_learnings 
     * @param priority_setting 
     * @param comparative_advantage 
     * @param participatory_design 
     * @returns context
     */
    async upsertContext(contextId?, challenge_statement?, smart_objectives?, key_learnings?, priority_setting?, comparative_advantage?, participatory_design?) {
        const contextRepo = getRepository(Context);
        //  create empty object 
        let context: Context;
        try {
            // get current intiative by stage
            const initvStg = await this.initvStage;

            // if null, create object
            if (contextId == null) {
                context = new Context();
                // assign initiative by stage
                context.initvStg = initvStg[0].id;
            } else {
                context = await contextRepo.findOne(contextId);

            }
            console.log(contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design);


            context.challenge_statement = (challenge_statement) ? challenge_statement : null;
            context.smart_objectives = (smart_objectives) ? smart_objectives : null;
            context.key_learnings = (key_learnings) ? key_learnings : null;
            context.priority_setting = (priority_setting) ? priority_setting : null;
            context.comparative_advantage = (comparative_advantage) ? comparative_advantage : null;
            context.participatory_design = (participatory_design) ? participatory_design : null;

            // upserted data 
            const upsertedContext = await contextRepo.save(context);

            return upsertedContext;
        } catch (error) {
            console.log(error)
            throw new BaseError('Upsert context - full proposal', 406, error.message, false)
        }
    }
}