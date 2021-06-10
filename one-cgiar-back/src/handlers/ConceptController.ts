import { getConnection, getRepository } from "typeorm";
import _ from "lodash";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { validatedSection } from "../utils/section-validation";
import { ConceptSections } from "../interfaces/ConceptSectionsInterface";


export class ConceptHandler {

    public initvStgId_;
    private intvStage_;
    private stageId_;
    private metaData_;
    public sections: ConceptSections;
    private queryRunner = getConnection().createQueryRunner();
    private initvStgRepo = getRepository(InitiativesByStages);


    constructor(initvStgId: string) {
        this.initvStgId_ = initvStgId;
    }

    public get metaData() {
        this.metaData_ = this.queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE description = 'Concept')`);
        return this.metaData_;
    }
    public get stageId() {
        this.stageId_ = this.queryRunner.query(`SELECT id FROM stages WHERE description = 'Concept'`);
        return this.stageId_;
    }
    public get intvStage() {
        this.intvStage_ = this.queryRunner.query(`SELECT * FROM initiatives_by_stages WHERE id = ${this.initvStgId_} AND stageId = (SELECT id FROM stages WHERE description = 'Concept')`);
        return this.intvStage_;
    }


    /**
     * 
     * @param initvStgId 
     * @returns { sections }
     */
    async getConceptData(initvStgId: string) {
        try {
            // add general information data 
            this.sections.general_information = await this.getGeneralInformation(initvStgId);

            return this.sections;

        } catch (error) {
            throw new Error(error);
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

            const initvStgRepo = getRepository(InitiativesByStages);
            // current intiative by stage entity
            const curruentInitvByStg = await this.intvStage;

            const mappingMetada = await this.queryRunner.query(`SELECT from_meta_id, to_meta_id FROM mapping_metadata WHERE from_stage_name LIKE 'Concept' AND to_stage_name LIKE 'Full Proposal'`);
            // get fullproposal meta data 
            const pplMetadata = await this.queryRunner.query(`SELECT * FROM stages_meta WHERE id IN (${mappingMetada.map(meta => meta.to_meta_id)})`);
            // get full proposal stage id
            const pplStage = await this.queryRunner.query(`SELECT * FROM stages WHERE description LIKE 'Full Proposal'`);

            // create initiative by stage entity
            let replicatedIntvStg = new InitiativesByStages();
            replicatedIntvStg.active = true;
            replicatedIntvStg.initiative = curruentInitvByStg[0].initiativeId;
            replicatedIntvStg.stage = pplStage[0].id;
            // save intiative by stage
            // replicatedIntvStg = await initvStgRepo.save(replicatedIntvStg);



            console.log(replicatedIntvStg)
        } catch (error) {
            throw new Error(error);
        }
        // get mapping relations meta data
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
                stage.description AS stageDesc,
                stage.active AS stageIsActive,

                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS conceptLeadId,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptLead,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptEmail,

                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS conceptCoLeadId,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptCoLead,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptCoLeadEmail,


                concept.id AS conceptId,
                IF(concept.name IS NULL OR concept.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.id ), concept.name) AS conceptName,
                concept.action_area_description AS conceptActAreaDes,
                concept.action_area_id AS conceptActAreaId
                ,(SELECT GROUP_CONCAT(id SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesIds
                ,(SELECT GROUP_CONCAT(name SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesNames
            FROM
                initiatives_by_stages initvStgs
            LEFT JOIN stages stage ON stage.id = initvStgs.stageId
            LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId

            WHERE initvStgs.id = ${initvStgId};
        `;
            const GIMetaquery = `SELECT * FROM stages_meta WHERE group_by LIKE 'General Information'`;
            const generalInfo = await this.queryRunner.query(GIquery);
            const generalInfoMeta = await this.queryRunner.query(GIMetaquery);

            return { generalInfo: generalInfo[0], generalInfoMeta: generalInfoMeta[0] };
        } catch (error) {
            throw new Error(error);
        }

    }

}