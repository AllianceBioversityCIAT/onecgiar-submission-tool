
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { CreateSdgResultsDto } from "../dto/tocSdgResults";
import { TocSdgResultsSdgTargetsDto } from "../dto/tocSdgResultsSdgTargets";
import { TocSdgResultsSdgIndicatorsDto } from "../dto/tocSdgResultsSdgIndicators";
import { Database } from "../database/db";
import { Connection } from "typeorm";
import { TocSdgResults } from "../entities/tocSdgResults";
import { TocSdgResultsSdgTargets } from "../entities/tocSdgResultsSdgTargets";
import { TocSdgResultsSdgIndicators } from "../entities/tocSdgResultsSdgIndicators";

export class TocSdgsServices {
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators();
    public database = new Database();
   
  async createTocSdgResults(sdgResultToc, initiative_id,phase) {
    try {
       
      
        let dbConn: Connection = await this.database.getConnection();
        let sdgRepo = await dbConn.getRepository(TocSdgResults);
        let listValidSdgResults = [];
        let listSdgTargets = [];
        let listIndicator = [];
    if (this.validatorType.validatorIsArray(sdgResultToc)){
        for(let sdgResult of sdgResultToc) {
            if (
                this.validatorType.existPropertyInObjectMul(sdgResult, [
                  "sdg_id",
                  "toc_result_id",
                  "sdg_contribution",
                  "sdg_targets",
                  "sdg_indicators",
                ])){
                    const sdgResultT = new CreateSdgResultsDto();
                    sdgResultT.sdg_id =
            typeof sdgResult.sdg_id == "number"
              ? sdgResult.sdg_id
              : null;
              sdgResultT.toc_result_id =
            typeof sdgResult.toc_result_id == "string"
              ? sdgResult.toc_result_id
              : null;
              sdgResultT.sdg_contribution =
            typeof sdgResult.sdg_contribution == "string"
              ? sdgResult.sdg_contribution
              : null;
            sdgResultT.id_toc_initiative = initiative_id;
            sdgResultT.phase = phase;

            const existingRecord = await sdgRepo.findOne({ toc_result_id: sdgResultT.toc_result_id, phase: sdgResultT.phase });
            if (existingRecord) {
              // Update existing record
              await sdgRepo.update({
                toc_result_id: sdgResultT.toc_result_id,
                phase: sdgResultT.phase,
              },sdgResultT);
            } else {
              // Insert new record
              await sdgRepo.insert(sdgResultT);
            }   
            const existingRecordSavingOrUpdate = await sdgRepo.findOne({ toc_result_id: sdgResultT.toc_result_id, phase: sdgResultT.phase });
            await listValidSdgResults.push(existingRecordSavingOrUpdate);
            listSdgTargets = listSdgTargets.concat(await this.createTocSdgResultsSdgTargets(sdgResult.sdg_targets, sdgResult.toc_result_id, existingRecordSavingOrUpdate));
            listIndicator = listIndicator.concat(await this.createTocSdgResultsTocSdgIndicators(sdgResult.sdg_indicators, sdgResult.toc_result_id,existingRecordSavingOrUpdate ));
            
               
        }
        }
    }

    return {
        sdgResults: listValidSdgResults,
        sdgTargets: listSdgTargets,
        sdgIndicators: listIndicator
    }
    } catch (error) {
        throw error;
    }
}


async createTocSdgResultsSdgTargets(sdgTargetsToc, toc_results_id: string, sdg) {
    try {
        let dbConn: Connection = await this.database.getConnection();
        let sdgRepo = await dbConn.getRepository(TocSdgResults);
        let sdgRepoTarget = await dbConn.getRepository(TocSdgResultsSdgTargets);
       
        
        let sdgTargets:any = [];
        if(this.validatorType.validatorIsArray(sdgTargetsToc)){
            for(let sdgTarget of sdgTargetsToc){
                if (
                    this.validatorType.existPropertyInObjectMul(sdgTarget, [
                        "sdg_target_id",
                    ])){
                        const relacionSdgTarget = new TocSdgResultsSdgTargetsDto();
          relacionSdgTarget.sdg_target_id =
            typeof sdgTarget.sdg_target_id == "number"
              ? sdgTarget.sdg_target_id
              : null;
            relacionSdgTarget.toc_sdg_results_id_toc = toc_results_id;
            relacionSdgTarget.is_active = true;
            relacionSdgTarget.toc_sdg_results_id = sdg.id;

            const existingRecordSdgTarget = await sdgRepoTarget.findOne({ toc_sdg_results_id: relacionSdgTarget.toc_sdg_results_id, toc_sdg_results_id_toc: toc_results_id, sdg_target_id: relacionSdgTarget.sdg_target_id });
            if (!existingRecordSdgTarget) {
                // Update existing record
                await sdgRepoTarget.insert(relacionSdgTarget);
            }
            
            await sdgTargets.push(relacionSdgTarget);
                    }
            }
        }
        return sdgTargets;
    } catch (error) {
        throw error;
    }
}

async createTocSdgResultsTocSdgIndicators(sdgIndicatorsToc, toc_results_id: string, sdg) {
    try {
        let sdgIndicatorT:any = [];
        let dbConn: Connection = await this.database.getConnection();
        let sdgIndicatorRep = await dbConn.getRepository(TocSdgResultsSdgIndicators);
        if(this.validatorType.validatorIsArray(sdgIndicatorsToc)){
            for(let sdgIndicatorI of sdgIndicatorsToc){
                if (
                    this.validatorType.existPropertyInObjectMul(sdgIndicatorI,  [
                        "sdg_indicator_id",
                      ])){
                        const relacionSdgIndicator = new TocSdgResultsSdgIndicatorsDto();
                        relacionSdgIndicator.sdg_indicator_id =
                            typeof sdgIndicatorI.sdg_indicator_id == "number"
                            ? sdgIndicatorI.sdg_indicator_id
                            : null;
                        relacionSdgIndicator.toc_sdg_results_id = sdg.id;
                        relacionSdgIndicator.toc_sdg_results_id_toc = toc_results_id;
                        relacionSdgIndicator.is_active = true;
                            await sdgIndicatorT.push(sdgIndicatorI);
                            const existingRecordSdgTarget = await sdgIndicatorRep.findOne({ toc_sdg_results_id: relacionSdgIndicator.toc_sdg_results_id, toc_sdg_results_id_toc: toc_results_id, sdg_indicator_id: relacionSdgIndicator.sdg_indicator_id });
                            if (!existingRecordSdgTarget) {
                                // Update existing record
                                await sdgIndicatorRep.insert(relacionSdgIndicator);
                            }
                    }
            }
        }
        return sdgIndicatorT;
    } catch (error) {
        throw error;
    }
}
}