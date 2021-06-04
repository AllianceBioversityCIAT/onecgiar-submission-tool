import { getConnection, getRepository } from "typeorm";
import _ from "lodash";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { validatedSection } from "../utils/section-validation";


export class ConceptHandler {

    public initvStgId_;
    public metaData_;
    private queryRunner = getConnection().createQueryRunner();
    private initvStgRepo = getRepository(InitiativesByStages);


    constructor(initvStgId: string) {
        this.initvStgId_ = initvStgId;
    }

    public get metaData() {
        this.metaData_ = this.queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE description = 'Concept')`);
        return this.metaData_;
    }

    async getConceptData() {
        try {
            // group meta by section
            const metaD = await this.metaData();
            let grouped = _.mapValues(_.groupBy(metaD, 'group_by'),
                clist => clist.map(meta => _.omit(meta, 'group_by')));

            console.log(grouped)


        } catch (error) {
            throw new Error(error);
        }
    }

    async validateCompletness() {
        //  get current intititve by stage
        const currentInitvStg = await this.initvStgRepo.findOne({ where: { initiative: this.initvStgId_ }, relations: ['stage', 'initiative'] });
        // get complited / valid sections of stage data
        const validatedSections = await validatedSection(currentInitvStg.id, currentInitvStg.stage.description);
        console.log(currentInitvStg.stage.description, validatedSections)
        // validate if any missing section
        const missingSctn = (element) => element == false || element == 0;
        const isMissing = Object.values(validatedSections).some(missingSctn);
        return isMissing;
    }

}