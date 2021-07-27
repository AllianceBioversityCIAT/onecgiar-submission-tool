import { getConnection, getRepository } from "typeorm";
import { Citations } from "../entity/Citatitions";
import { Initiatives } from "../entity/Initiatives";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { BaseError } from "./BaseError";
import { BaseValidation } from "./validation/BaseValidation";

export class InitiativeStageHandler extends BaseValidation {
    public initvStgId_;
    private intvStage_;
    private stageId_;
    private initiativeId_;

    public queryRunner = getConnection().createQueryRunner().connection;
    public initvStgRepo = getRepository(InitiativesByStages);
    public initiativeRepo = getRepository(Initiatives);

    constructor(initvStgId?: string, stageId?: string, initiativeId?: string) {
        super();
        this.initvStgId_ = initvStgId;
        this.stageId_ = stageId;
        this.initiativeId_ = initiativeId;
    }

    public get stageId() {
        try {
            let sql;
            if (this.stageId_ && this.initiativeId_) {
                sql = `SELECT id FROM stages WHERE id = ${this.stageId_}`
            } else {
                sql = `SELECT stageId AS id FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`
            }
            this.stageId_ = this.queryRunner.query(sql);
            return this.stageId_;
        } catch (error) {
            throw new BaseError('Get Stage id', 400, error.message, false)
        }
    }
    public get initvStage() {
        try {
            let sql;
            if (this.stageId_ && this.initiativeId_) {
                sql = `SELECT * FROM initiatives_by_stages WHERE stageId = ${this.stageId_} AND initiativeId = ${this.initiativeId_}`
            } else {
                sql = `SELECT * FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`
            }
            this.intvStage_ = this.queryRunner.query(sql);
            return this.intvStage_;
        } catch (error) {
            throw new BaseError('Get intitative by stage object', 400, error.message, false)
        }
    }

    /**
     * 
     * @param title 
     * @param link 
     * @param table_name 
     * @param col_name 
     * @param citationId?
     * @returns citation
     */
    async addLink(title: string, link: string, table_name: string, col_name: string, citationId?: string) {
        // get citations repo
        const citationsRepo = await getRepository(Citations);
        //  create empty object 
        let citation: Citations;
        try {
            // if null, create object
            if (citationId == null) {
                citation = new Citations();
                // assign initiative by stage
                citation.initvStg = this.initvStgId_;
            } else {
                citation = await citationsRepo.findOne(citationId);
            }

            citation.title = title;
            citation.link = link;
            citation.table_name = table_name;
            citation.col_name = col_name;

            // upsert citation 
            const addedLink = await citationsRepo.save(citation);
            return citation;
        } catch (error) {
            throw new BaseError('Add link: Error', 400, error.message, false)
        }


    }

    async getLink(table_name: string, col_name: string, citationId?: string) {

           // get citations repo
           const citationsRepo = await getRepository(Citations);
           //  create empty object

           try {
    
           const initvStg = this.initvStgId_;

            // upsert getlinks 
           const getlinks = await citationsRepo.find({ where: { initvStg: initvStg,table_name: table_name,col_name:col_name }});
         
            return getlinks;

        } catch (error) {
            throw new BaseError('Add link: Error', 400, error.message, false)
        }
        
    }

    async setInitvStage() {
        try {
            const existInitvStg = await this.initvStage;
            this.intvStage_ = existInitvStg[0] ? existInitvStg[0] : new InitiativesByStages();

            this.intvStage_.active = true;
            this.intvStage_.initiative = this.initiativeId_;
            this.intvStage_.stage = this.stageId_;
            // save intiative by stage
            this.intvStage_ = await this.initvStgRepo.save(this.intvStage_);
            this.initvStgId_ = this.intvStage_.id;
            return this.intvStage_;

        } catch (error) {
            console.log(error)
            throw new BaseError('Set intitative by stage object', 400, error.message, false)

        }
    }

}