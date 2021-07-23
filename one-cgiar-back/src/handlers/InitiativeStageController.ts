import { getConnection, getRepository } from "typeorm";
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
    
    async setInitvStage() {
        try {
            const existInitvStg = await this.initvStage;
            this.intvStage_ = existInitvStg[0] ? existInitvStg[0] : new InitiativesByStages();
            
            this.intvStage_.active = true;
            this.intvStage_.initiative = this.initiativeId_;
            this.intvStage_.stage = this.stageId_;
            // save intiative by stage
            this.intvStage_ =  await this.initvStgRepo.save(this.intvStage_);
            this.initvStgId_ = this.intvStage_.id;
            return this.intvStage_;
            
        } catch (error) {
            console.log(error)
            throw new BaseError('Set intitative by stage object', 400, error.message, false)
            
        }
    }

}