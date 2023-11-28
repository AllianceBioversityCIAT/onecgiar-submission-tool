
import { ValidatorTypes } from "../validators/validatorType";
import { ErrorValidators } from "../validators/errorsValidators";
import { TocActionAreaResultsDto } from "../dto/tocActionAreaResults";
import { TocActionAreaResultsOutcomesIndicatorsDto } from "../dto/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResultsDto } from "../dto/tocActionAreaResultsImpactAreaResults";
import { Database } from "../database/db";
import { Connection } from "typeorm";
import { TocActionAreaResults } from "../entities/tocActionAreaResults";
import { TocActionAreaResultsOutcomesIndicators } from "../entities/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResults } from "../entities/tocActionAreaResultsImpactAreaResults";

export class ActionAreaTocServices{
  public validatorType = new ValidatorTypes();
  public errorMessage = new ErrorValidators();
  public database = new Database();
  async saveActionAreaToc(actionAreaToc: any, id_toc_initiative: string, imapctAreaToc:any, phase){

      try {
        let dbConn: Connection = await this.database.getConnection();
        let actionAreaRepo = await dbConn.getRepository(TocActionAreaResults);
          let listActionAreaToc = [];
          let listOutcomeIndicators = [];
          let listImpactAreaToc = [];
          if (this.validatorType.validatorIsArray(actionAreaToc)){
              for(let actionArea of actionAreaToc){
                  if (
                      this.validatorType.existPropertyInObjectMul(actionArea, [
                        "toc_result_id",
                        "action_area_id",
                        "outcome_id",
                        "statement",
                        "outcome_indicators",
                        "impact_areas",
                      ])
                    ) {
                      const actionAreaDto = new TocActionAreaResultsDto();
                      actionAreaDto.toc_result_id =
                        typeof actionArea.toc_result_id == "string"
                          ? actionArea.toc_result_id
                          : null;

                      actionAreaDto.action_areas_id =
                        typeof actionArea.action_area_id == "number"
                          ? actionArea.action_area_id
                          : null;
                      
                      actionAreaDto.outcome_id =
                        typeof actionArea.outcome_id == "number" ? actionArea.outcome_id : null;

                      actionAreaDto.statement =
                        typeof actionArea.statement == "string" ? actionArea.statement : null;

                      actionAreaDto.id_toc_initiative= id_toc_initiative;

                      actionAreaDto.is_active = true;

                      actionAreaDto.phase = phase;
                      
                      const existingRecord = await actionAreaRepo.findOne({ toc_result_id: actionAreaDto.toc_result_id, phase: actionAreaDto.phase });
                      if (existingRecord) {
                        // Update existing record
                        await actionAreaRepo.update({
                          toc_result_id: actionAreaDto.toc_result_id,
                          phase: actionAreaDto.phase,
                        },actionAreaDto);
                      } else {
                        // Insert new record
                        await actionAreaRepo.insert(actionAreaDto);
                      }  
                      const existingRecordSaveOrUpdate = await actionAreaRepo.findOne({ toc_result_id: actionAreaDto.toc_result_id, phase: actionAreaDto.phase });


                      
                      listActionAreaToc.push(existingRecordSaveOrUpdate);
                      listOutcomeIndicators = listOutcomeIndicators.concat(await this.saveActionAreaTocOutcomesIndicators(actionArea.outcome_indicators, actionArea.toc_result_id, existingRecordSaveOrUpdate));
                      listImpactAreaToc = listImpactAreaToc.concat(await this.saveImpactAreaToc(actionArea.impact_areas, actionArea.toc_result_id, imapctAreaToc, existingRecordSaveOrUpdate));    
                  }
              }
          }
          return {
              actionAreaToc: listActionAreaToc,
              outcomeIndicators: listOutcomeIndicators,
              impactAreaToc: listImpactAreaToc
          };
      } catch (error) {
          throw error;
      }

  }


  async saveActionAreaTocOutcomesIndicators(actionAreaTocOutcome: any, id_toc: string, actionarea){
      try {
        let dbConn: Connection = await this.database.getConnection();
        let actionAreaRepo = await dbConn.getRepository(TocActionAreaResultsOutcomesIndicators);
          let listOutcomesIndicators = [];
          if (
              this.validatorType.validatorIsArray(actionAreaTocOutcome)
            ){
              for(let outcome of actionAreaTocOutcome){
                  if (
                      this.validatorType.existPropertyInObjectMul(outcome, [
                        "outcome_indicator_id",
                      ])
                    ){
                      const relationOutCome =
                      new TocActionAreaResultsOutcomesIndicatorsDto();
                    relationOutCome.toc_action_area_results_idtoc = id_toc;
                    relationOutCome.action_areas_outcomes_indicators_id =
                      typeof outcome.outcome_indicator_id == "number"
                        ? outcome.outcome_indicator_id
                        : null;
                    relationOutCome.is_active = true;
                    relationOutCome.toc_action_area_results_id = actionarea.id;

                    const existingRecord = await actionAreaRepo.findOne({ toc_action_area_results_idtoc: relationOutCome.toc_action_area_results_idtoc, toc_action_area_results_id: relationOutCome.toc_action_area_results_id, action_areas_outcomes_indicators_id: relationOutCome.action_areas_outcomes_indicators_id });
                    if (!existingRecord) {
                      // Insert new record
                      await actionAreaRepo.insert(relationOutCome);
                    }
                        listOutcomesIndicators.push(relationOutCome);
                    }
              }
            }
            return listOutcomesIndicators;
      } catch (error) {
          throw error;
      }
  }

  async saveImpactAreaToc(impactAreaToc: any, id_toc: string, impactSave:any, actionarea){
      try {
        let dbConn: Connection = await this.database.getConnection();
        let actionAreaRepo = await dbConn.getRepository(TocActionAreaResultsImpactAreaResults);
          let listImpactAction = [];
          if(this.validatorType.validatorIsArray(impactAreaToc)) {
              for(let impactsAction of impactAreaToc){
                  if (
                      this.validatorType.existPropertyInObjectMul(impactsAction, [
                        "toc_result_id",
                      ])
                    ){
                              const relationImpactArea =
                  new TocActionAreaResultsImpactAreaResultsDto();
              relationImpactArea.toc_action_area_results_id_toc = id_toc;
              relationImpactArea.toc_impact_area_results_id_toc =
                  typeof impactsAction.toc_result_id == "string" &&
                  this.validatorType.validExistIdImpact(
                      impactSave,
                  impactsAction.toc_result_id
                  )
                  ? impactsAction.toc_result_id
                  : null;
              relationImpactArea.is_active = true;
              relationImpactArea.toc_action_area_results_id = actionarea.id;
              relationImpactArea.toc_impact_area_results_id = impactSave.find(impac => impac.toc_result_id == impactsAction.toc_result_id).id;
              const existingRecord = await actionAreaRepo.findOne({  toc_action_area_results_id: relationImpactArea.toc_action_area_results_id, toc_impact_area_results_id: relationImpactArea.toc_impact_area_results_id });
                    if (!existingRecord) {
                      // Insert new record
                      await actionAreaRepo.insert(relationImpactArea);
                    }

                  listImpactAction.push(relationImpactArea);
              }
              }
          }
          return listImpactAction;
      } catch (error) {
          throw error;
      }
  }
}