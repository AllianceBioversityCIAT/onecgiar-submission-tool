import {getCustomRepository, getRepository} from 'typeorm';
import {InitiativesByStages, Stages} from '../entity';
import {InitiativesByStagesRepository} from '../repositories/initiativesByStageRepository';
import {BaseError} from './BaseError';
import {ProposalHandler} from './FullProposalDomain';
import {InitiativeStageHandler} from './InitiativeStageDomain';

export class ReplicationDomain extends InitiativeStageHandler {
  /**
   ** MAIN REPLICATION PROCESS
   *! JC: At this moment only applies to replicate from full proposal to ISDC
   * @param currentInitiativeId
   * @param currentStageId
   * @param newStageId
   * @returns
   */
  async replicationProcess(
    currentInitiativeId: number,
    currentStageId: number,
    newStageId: number
  ) {
    const initvStgRepo = getCustomRepository(InitiativesByStagesRepository);
    const stageRepo = getRepository(Stages);

    try {
      // Validation between current stage and new stage
      if (currentStageId > newStageId) {
        throw new BaseError(
          'Read Context: Error',
          400,
          `The current stage cannot be less than the new stage`,
          false
        );
      }
      /**
       ** VALIDATION CURRENT INITIATIVE */

      // Get current stage
      const stage: Stages = await stageRepo.findOne(currentStageId);
      // get current initiative by stage
      let initvStg = await initvStgRepo.findOneInitiativeByStage(
        currentInitiativeId,
        stage.id
      );

      // if not initiative by stage, throw error
      if (initvStg == null) {
        throw new BaseError(
          'Read Context: Error',
          400,
          `Initiative not found in stage: ${stage.description}`,
          false
        );
      }

      /**
       ** VALIDATION NEW STAGE BY INITIATIVE */

      // Validate new stage
      const newStage: Stages = await stageRepo.findOne(newStageId);

      // if not exists stage, throw error
      if (newStage == null) {
        throw new BaseError(
          'Read Context: Error',
          400,
          `Stage not found : ${stage.description}`,
          false
        );
      }

      // get new initiative by stage
      const newInitvStg = await initvStgRepo.findOneInitiativeByStage(
        currentInitiativeId,
        newStage.id
      );

      /**
       *! STEPS FOR REPLICATE FULL PROPOSAL TO ISDC
       */

      // 1. Change Stage by Initiative
      const changeStage = await this.changeStageInitiative(
        initvStg,
        newInitvStg,
        newStage
      );

      //2. Replicate General Information
      const replicationGeneralInfo = await this.replicateGeneralInformation(
        initvStg.id,
        newInitvStg.id
      );

      //3. Replicate Challenge Statement
      const replicationContext = await this.replicateContext(
        initvStg.id,
        newInitvStg.id
      );

      return {changeStage, replicationGeneralInfo,replicationContext};
    } catch (error) {
      throw new BaseError(
        'Error Replication Process',
        400,
        error.message,
        false
      );
    }
  }

  /**
   ** 1. Change Stage by Initiative
   * @param initvStg
   * @param newStage
   */
  async changeStageInitiative(initvStg, newInitvStg, newStage) {
    if (newInitvStg) {
      initvStg = newInitvStg;
    } else {
      initvStg = initvStg;
    }

    const newInitv = new InitiativesByStages();
    let savedInitiativeByStage: InitiativesByStages;

    try {
      // Conditions to change stage a initiative
      // If Initiative exists in New Stage
      if (initvStg.stageId === newStage.id) {
        savedInitiativeByStage = await this.initvStgRepo.save(initvStg);

        // If Initiative Not exists in New Stage
      } else if (newStage.id > initvStg.stageId) {
        newInitv.active = true;
        newInitv.global_dimension = initvStg.global_dimension;
        newInitv.initiative = initvStg.initiativeId;
        newInitv.stage = newStage.id;

        savedInitiativeByStage = await this.initvStgRepo.save(newInitv);
      } else {
        throw new BaseError(
          'Error Change Stage by initiative - ' + initvStg.initiativeId,
          400,
          'Please validate the parameters and try again',
          false
        );
      }

      return savedInitiativeByStage;
    } catch (error) {
      throw new BaseError(
        'Error Change Stage by initiative - ' + initvStg.initiativeId,
        400,
        error.message,
        false
      );
    }
  }

  async replicateGeneralInformation(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedGeneralInformation;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const generalInformation = await fullPposal.getGeneralInformation();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const generalInformationIsdc =
        await fullPposalIsdc.getGeneralInformation();

        console.log('full proposal', generalInformation);
        console.log('ISDC', generalInformationIsdc);

      if (generalInformationIsdc.generalInformationId) {
        savedGeneralInformation = await fullPposalIsdc.upsertGeneralInformation(
          generalInformationIsdc.generalInformationId,
          generalInformationIsdc.name,
          generalInformationIsdc.action_area_id,
          generalInformationIsdc.action_area_description
        );
      } else {
        generalInformation.initvStgId = newInitStgId;
        savedGeneralInformation = await fullPposalIsdc.upsertGeneralInformation(
          null,
          generalInformation.name,
          generalInformation.action_area_id,
          generalInformation.action_area_description,
          ''
        );
      }

      return savedGeneralInformation;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of general information',
        400,
        error.message,
        false
      );
    }
  }

  async replicateContext(currentInitvStgId: number, newInitStgId: number) {
    try {
      let savedContext;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const context = await fullPposal.getContext();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const contextIsdc = await fullPposalIsdc.getContext();

      console.log('full proposal', context);
      console.log('ISDC', contextIsdc);

      if (contextIsdc) {
        savedContext = await fullPposalIsdc.upsertContext(
          contextIsdc.id,
          contextIsdc.challenge_statement,
          contextIsdc.smart_objectives,
          contextIsdc.key_learnings,
          contextIsdc.priority_setting,
          contextIsdc.comparative_advantage,
          contextIsdc.participatory_design
        );
      } else {
        context.initvStgId = newInitStgId;
        savedContext = await fullPposalIsdc.upsertContext(
          null,
          context.challenge_statement,
          context.smart_objectives,
          context.key_learnings,
          context.priority_setting,
          context.comparative_advantage,
          context.participatory_design
        );
      }

      return savedContext;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of general information',
        400,
        error.message,
        false
      );
    }
  }
}
