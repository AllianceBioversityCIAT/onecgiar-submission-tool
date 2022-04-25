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
      let newInitvStg = await initvStgRepo.findOneInitiativeByStage(
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

      if (!newInitvStg) {
        newInitvStg = await initvStgRepo.findOneInitiativeByStage(
          currentInitiativeId,
          newStage.id
        );
      }

      //2. Replicate General Information
      const replicationGeneralInfo = await this.replicateGeneralInformation(
        initvStg,
        newInitvStg,
        initvStg.id,
        newInitvStg.id
      );

      //3. Replicate Context without projection benefits
      const replicationContext = await this.replicateContext(
        initvStg.id,
        newInitvStg.id
      );
      // 3.1 Replicate Projection benefits
      const replicationProjectionBenefits =
        await this.replicationProjectionBenefits(initvStg.id, newInitvStg.id);

      //4. Replicate Work packages
      const replicationWorkPackages = await this.replicationWorkPackages(
        initvStg.id,
        newInitvStg.id
      );
      //4.1 Replicate ToC (WP ToC and Full Initiative ToC)
      const replicationToC = await this.replicationToC(
        initvStg.id,
        newInitvStg.id
      );

      //5. Replicate Innovation packages
      const replicationInnovationPackages =
        await this.replicationInnovationPackages(initvStg.id, newInitvStg.id);

      //6. Replicate Impact statements
      const replicationImpactStatements =
        await this.replicationImpactStatements(initvStg.id, newInitvStg.id);

      //7. Replicate Melia (Melia Plan and Results Framework)
      const replicationMelia = await this.replicationMelia(
        initvStg.id,
        newInitvStg.id
      );

      //7.1 Replication Melia Studies and Activities
      const replicationMeliaStudiesActivities =
        await this.replicationMeliaStudiesActivities(
          initvStg.id,
          newInitvStg.id
        );

      //8. Replication Management Plan and Risk
      const replicationManagementPlan = await this.replicationManagementPlan(
        initvStg.id,
        newInitvStg.id
      );

      //9. Replication Policy and Compliance
      const replicationPolicyCompliance =
        await this.replicationPolicyCompliance(initvStg.id, newInitvStg.id);

      //10. Replication Human Resourches
      const replicationHumanResources = await this.replicationHumanResources(
        initvStg.id,
        newInitvStg.id
      );

      //11. Replication Financial Resources
      const replicationFinancialResources =
        await this.replicationFinancialResources(
          initvStg,
          newInitvStg,
          initvStg.id,
          newInitvStg.id
        );

      //12. Inactive initiative in the previus stage
      const inactivePreviusInitiative = await this.inactivePreviusInitiative(
        initvStg
      );

      return {
        changeStage,
        replicationGeneralInfo,
        replicationContext,
        replicationProjectionBenefits,
        replicationWorkPackages,
        replicationToC,
        replicationInnovationPackages,
        replicationImpactStatements,
        replicationMelia,
        replicationMeliaStudiesActivities,
        replicationManagementPlan,
        replicationPolicyCompliance,
        replicationHumanResources,
        replicationFinancialResources,
        inactivePreviusInitiative
      };
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
   * ******** STEPS REPLICATION FOR ISDC FEEDBACK ************
   */

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

    let savedInitiativeByStage: InitiativesByStages;
    let updateOldInitiativeByStage;

    try {
      // Conditions to change stage a initiative
      // If Initiative exists in New Stage
      if (initvStg.stageId === newStage.id) {
        savedInitiativeByStage = await this.initvStgRepo.save(initvStg);

        // If Initiative Not exists in New Stage
      } else if (newStage.id > initvStg.stageId) {
        const newInitv = new InitiativesByStages();
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

      return {savedInitiativeByStage, updateOldInitiativeByStage};
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
    initvStg,
    newinitvStg,
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedGeneralInformation;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"

      // create initiative by stage handler object
      const initiative = new InitiativeStageHandler();
      // get general information from proposal object
      const generalInformation = await initiative.getSummary(initvStg);

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      const initiativeIsdc = new InitiativeStageHandler();
      // get general information from proposal object
      const generalInformationIsdc =
        await initiative.getSummary(newinitvStg);

      // if (generalInformationIsdc.generalInformationId) {
      //   savedGeneralInformation = await fullPposalIsdc.upsertGeneralInformation(
      //     generalInformationIsdc.generalInformationId,
      //     generalInformationIsdc.name,
      //     generalInformationIsdc.action_area_id,
      //     generalInformationIsdc.action_area_description
      //   );
      // } else {
      //   generalInformation.initvStgId = newInitStgId;
      //   savedGeneralInformation = await fullPposalIsdc.upsertGeneralInformation(
      //     null,
      //     generalInformation.name,
      //     generalInformation.action_area_id,
      //     generalInformation.action_area_description,
      //     ''
      //   );
      // }

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
      } else if (context) {
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
      } else {
        savedContext =
          '***ERROR*** The initiative does not have information in the context section, InitvStgId ' +
          currentInitvStgId +
          ' - please validate';
      }

      return savedContext;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of context',
        400,
        error.message,
        false
      );
    }
  }

  async replicationProjectionBenefits(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let pbArray = [];
      let savedProjectedBenefits;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const projectedBenefits = await fullPposal.requestProjectionBenefits();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const projectedBenefitsIsdc =
        await fullPposalIsdc.requestProjectionBenefits();

      if (projectedBenefitsIsdc.length > 0) {
        for (let index = 0; index < projectedBenefitsIsdc.length; index++) {
          const pbIsdc = projectedBenefitsIsdc[index];

          pbArray.push(
            fullPposalIsdc.upsertProjectionBenefits(
              pbIsdc.id,
              pbIsdc.impactAreaId,
              pbIsdc.impactAreaName,
              pbIsdc.impactAreaIndicator,
              pbIsdc.impactAreaIndicatorName,
              pbIsdc.notes,
              pbIsdc.depthScaleId,
              pbIsdc.depthScaleName,
              pbIsdc.probabilityID,
              pbIsdc.probabilityName,
              pbIsdc.impact_area_active,
              pbIsdc.active,
              pbIsdc.dimensions
            )
          );
        }
      } else if (projectedBenefits.length > 0) {
        projectedBenefits.initvStgId = newInitStgId;

        for (let index = 0; index < projectedBenefits.length; index++) {
          const pb = projectedBenefits[index];

          for (let index = 0; index < pb.dimensions.length; index++) {
            const dimensions = pb.dimensions[index];

            dimensions.id = null;
          }

          pbArray.push(
            fullPposalIsdc.upsertProjectionBenefits(
              null,
              pb.impactAreaId,
              pb.impactAreaName,
              pb.impactAreaIndicator,
              pb.impactAreaIndicatorName,
              pb.notes,
              pb.depthScaleId,
              pb.depthScaleName,
              pb.probabilityID,
              pb.probabilityName,
              pb.impact_area_active,
              pb.active,
              pb.dimensions
            )
          );
        }
      } else {
        pbArray.push(
          '***ERROR*** The initiative does not have information in the Projection benefits section, InitvStgId ' +
            currentInitvStgId +
            '- please validate'
        );
      }

      savedProjectedBenefits = await Promise.all(pbArray);

      return savedProjectedBenefits;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of context - Projected Benefits',
        400,
        error.message,
        false
      );
    }
  }

  async replicationWorkPackages(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let wpArray = [];
      let savedWorkPakages;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const workPackages = await fullPposal.getWorkPackage();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const workPackagesIsdc = await fullPposalIsdc.getWorkPackage();

      if (workPackagesIsdc.length > 0) {
        for (let index = 0; index < workPackagesIsdc.length; index++) {
          const wp = workPackagesIsdc[index];
          wpArray.push(fullPposalIsdc.upsertWorkPackages(wp));
        }
      } else {
        workPackages.initvStgId = newInitStgId;
        for (let index = 0; index < workPackages.length; index++) {
          let wp = workPackages[index];
          wp.id = null;
          wpArray.push(fullPposalIsdc.upsertWorkPackages(wp));
        }
      }

      savedWorkPakages = await Promise.all(wpArray);

      return savedWorkPakages;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Work packages',
        400,
        error.message,
        false
      );
    }
  }

  async replicationToC(currentInitvStgId: number, newInitStgId: number) {
    try {
      let savedToc;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const toc = await fullPposal.requestTocByInitiative();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const tocIsdc = await fullPposalIsdc.requestTocByInitiative();

      if (tocIsdc.length > 0) {
        savedToc = await fullPposalIsdc.upsertTocs(tocIsdc);
      } else if (toc.length > 0) {
        toc.initvStgId = newInitStgId;
        savedToc = await fullPposalIsdc.upsertTocs(toc);
      } else {
        savedToc =
          '***ERROR*** The initiative does not have information in the ToC section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return savedToc;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of ToC (WP ToC and Full Initiative ToC)',
        400,
        error.message,
        false
      );
    }
  }

  async replicationInnovationPackages(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedInnovationPackages;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const innovationPackages = await fullPposal.requestInnovationPackages();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const innovationPackagesIsdc =
        await fullPposalIsdc.requestInnovationPackages();

      if (innovationPackagesIsdc) {
        savedInnovationPackages = await fullPposalIsdc.upsertInnovationPackages(
          innovationPackagesIsdc.id,
          innovationPackagesIsdc.key_principles,
          innovationPackagesIsdc.active
        );
      } else if (innovationPackages) {
        innovationPackages.initvStgId = newInitStgId;
        savedInnovationPackages = await fullPposalIsdc.upsertInnovationPackages(
          null,
          innovationPackages.key_principles,
          innovationPackages.active
        );
      } else {
        savedInnovationPackages =
          '***ERROR*** The initiative does not have information in the Innovation Packages section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return savedInnovationPackages;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Innovation Packages',
        400,
        error.message,
        false
      );
    }
  }

  async replicationImpactStatements(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let isArray = [];
      let savedImpactStatements;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const impactStatements = await fullPposal.requestImpactStrategies();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const impactStatementsIsdc =
        await fullPposalIsdc.requestImpactStrategies();

      if (impactStatementsIsdc.length > 0) {
        for (let index = 0; index < impactStatementsIsdc.length; index++) {
          const isIsdc = impactStatementsIsdc[index];

          isArray.push(
            fullPposalIsdc.upsertImpactStrategies(
              isIsdc.id,
              isIsdc.active,
              isIsdc.challenge_priorization,
              isIsdc.research_questions,
              isIsdc.component_work_package,
              isIsdc.performance_results,
              isIsdc.human_capacity,
              isIsdc.impact_area_id,
              isIsdc.impact_area_name,
              isIsdc.partners
            )
          );
        }
      } else if (impactStatements.length > 0) {
        impactStatements.initvStgId = newInitStgId;

        for (let index = 0; index < impactStatements.length; index++) {
          const is = impactStatements[index];

          for (let index = 0; index < is.partners.length; index++) {
            const partners = is.partners[index];

            partners.id = null;
          }

          isArray.push(
            fullPposalIsdc.upsertImpactStrategies(
              null,
              is.active,
              is.challenge_priorization,
              is.research_questions,
              is.component_work_package,
              is.performance_results,
              is.human_capacity,
              is.impact_area_id,
              is.impact_area_name,
              is.partners
            )
          );
        }
      } else {
        isArray.push(
          '***ERROR*** The initiative does not have information in the Impact Statements section, InitvStgId ' +
            currentInitvStgId +
            '- please validate'
        );
      }

      savedImpactStatements = await Promise.all(isArray);

      return savedImpactStatements;
    } catch (error) {
      throw new BaseError(
        'Error replicating impact statements',
        400,
        error.message,
        false
      );
    }
  }

  async replicationMelia(currentInitvStgId: number, newInitStgId: number) {
    try {
      let savedMeliaPlan;
      let savedMeliaResultsFramework;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const meiliaPlanResults = await fullPposal.requestMeliaFiles('melia');

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const meiliaPlanResultsIsdc = await fullPposalIsdc.requestMeliaFiles(
        'melia'
      );

      // UPSERT MELIA PLAN
      if (meiliaPlanResultsIsdc.meliaPlan) {
        savedMeliaPlan = await fullPposalIsdc.upsertMeliaAndFiles(
          null,
          null,
          null,
          meiliaPlanResultsIsdc.meliaPlan
        );
      } else if (meiliaPlanResults.meliaPlan) {
        meiliaPlanResults.meliaPlan.id = null;
        savedMeliaPlan = await fullPposalIsdc.upsertMeliaAndFiles(
          null,
          null,
          null,
          meiliaPlanResults.meliaPlan
        );
      } else {
        savedMeliaPlan =
          '***ERROR*** The initiative does not have information in the Melia Plan section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      // UPSERT RESULTS FRAMEWORK
      if (
        (meiliaPlanResultsIsdc.resultFramework.tableA.global_targets.length >
          0 ||
          meiliaPlanResultsIsdc.resultFramework.tableA.impact_areas_indicators
            .length > 0 ||
          meiliaPlanResultsIsdc.resultFramework.tableA.sdg_targets.length >
            0) &&
        meiliaPlanResultsIsdc.resultFramework.tableB
          .action_areas_outcomes_indicators.length > 0 &&
        meiliaPlanResultsIsdc.resultFramework.tableC.results.length > 0
      ) {
        savedMeliaResultsFramework =
          await fullPposalIsdc.upsertResultsFramework(
            meiliaPlanResultsIsdc.resultFramework.tableA,
            meiliaPlanResultsIsdc.resultFramework.tableB,
            meiliaPlanResultsIsdc.resultFramework.tableC
          );
      } else if (
        (meiliaPlanResults.resultFramework.tableA.global_targets.length > 0 ||
          meiliaPlanResults.resultFramework.tableA.impact_areas_indicators
            .length > 0 ||
          meiliaPlanResults.resultFramework.tableA.sdg_targets.length > 0) &&
        meiliaPlanResults.resultFramework.tableB
          .action_areas_outcomes_indicators.length > 0 &&
        meiliaPlanResults.resultFramework.tableC.results.length > 0
      ) {
        // Validation for insert new results and indicators
        for (
          let index = 0;
          index < meiliaPlanResults.resultFramework.tableC.results.length;
          index++
        ) {
          const results =
            meiliaPlanResults.resultFramework.tableC.results[index];

          results.id = null;

          results.indicators =
            typeof results.indicators === 'undefined' ? [] : results.indicators;

          if (results.indicators) {
            for (let index = 0; index < results.indicators.length; index++) {
              const indicators = results.indicators[index];
              indicators.id = null;
              indicators.results_id = null;
            }
          }
        }

        savedMeliaResultsFramework =
          await fullPposalIsdc.upsertResultsFramework(
            meiliaPlanResults.resultFramework.tableA,
            meiliaPlanResults.resultFramework.tableB,
            meiliaPlanResults.resultFramework.tableC
          );
      } else {
        savedMeliaResultsFramework =
          '***ERROR*** The initiative does not have information in the Melia Results Framework section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return {savedMeliaPlan, savedMeliaResultsFramework};
    } catch (error) {
      throw new BaseError(
        'Error replicating MELIA (Melia Plan, Results framework and Melia Studies and activities)',
        400,
        error.message,
        false
      );
    }
  }

  async replicationMeliaStudiesActivities(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedMeliaStudiesActivities;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const meliaStudiesActivities =
        await fullPposal.requestMeliaStudiesActivities();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const meliaStudiesActivitiesIsdc =
        await fullPposalIsdc.requestMeliaStudiesActivities();

      if (meliaStudiesActivitiesIsdc.length > 0) {
        savedMeliaStudiesActivities =
          await fullPposalIsdc.upsertMeliaStudiesActivities(
            meliaStudiesActivitiesIsdc
          );
      } else if (meliaStudiesActivities.length > 0) {
        for (let index = 0; index < meliaStudiesActivities.length; index++) {
          const melia = meliaStudiesActivities[index];
          melia.id = null;
        }
        savedMeliaStudiesActivities =
          await fullPposalIsdc.upsertMeliaStudiesActivities(
            meliaStudiesActivities
          );
      } else {
        savedMeliaStudiesActivities =
          '***ERROR*** The initiative does not have information in the Melia studies and activities section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return savedMeliaStudiesActivities;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Melia Studies and Activities',
        400,
        error.message,
        false
      );
    }
  }

  async replicationManagementPlan(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedManagementPlan;
      let savedRiskAssessment;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const managementPlanRisk = await fullPposal.requestManagePlanFiles(
        'managementPlanRisk'
      );

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const managementPlanRiskIsdc =
        await fullPposalIsdc.requestManagePlanFiles('managementPlanRisk');

      if (managementPlanRiskIsdc) {
        savedManagementPlan = await fullPposalIsdc.upsertManagePlanAndFiles(
          null,
          null,
          null,
          managementPlanRiskIsdc.id,
          managementPlanRiskIsdc.management_plan,
          managementPlanRiskIsdc.active
        );

        savedRiskAssessment = await fullPposalIsdc.upsertRiskAssessment(
          savedManagementPlan.upsertedManagePlan.id,
          managementPlanRiskIsdc.riskassessment
        );
      } else if (managementPlanRisk) {
        savedManagementPlan = await fullPposalIsdc.upsertManagePlanAndFiles(
          null,
          null,
          null,
          null,
          managementPlanRisk.management_plan,
          managementPlanRisk.active
        );

        for (
          let index = 0;
          index < managementPlanRisk.riskassessment.length;
          index++
        ) {
          const risk = managementPlanRisk.riskassessment[index];

          risk.id = null;

          for (let index = 0; index < risk.opportinities.length; index++) {
            const opportinities = risk.opportinities[index];

            opportinities.id = null;
          }
        }

        savedRiskAssessment = await fullPposalIsdc.upsertRiskAssessment(
          savedManagementPlan.upsertedManagePlan.id,
          managementPlanRisk.riskassessment
        );
      } else {
        savedManagementPlan =
          '***ERROR*** The initiative does not have information in the Management Plan and Risk section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return {savedManagementPlan, savedRiskAssessment};
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Management Plan and Risk Assessment',
        400,
        error.message,
        false
      );
    }
  }

  async replicationPolicyCompliance(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedPolicyCompliance;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const policyCompliance =
        await fullPposal.requestPolicyComplianceOversight();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const policyComplianceIsdc =
        await fullPposalIsdc.requestPolicyComplianceOversight();

      if (policyComplianceIsdc) {
        savedPolicyCompliance =
          await fullPposalIsdc.upsertPolicyComplianceOversight(
            policyComplianceIsdc.id,
            policyComplianceIsdc.research_governance_policy,
            policyComplianceIsdc.open_fair_data_policy,
            policyComplianceIsdc.open_fair_data_details,
            policyComplianceIsdc.active
          );
      } else if (policyCompliance) {
        savedPolicyCompliance =
          await fullPposalIsdc.upsertPolicyComplianceOversight(
            null,
            policyCompliance.research_governance_policy,
            policyCompliance.open_fair_data_policy,
            policyCompliance.open_fair_data_details,
            policyCompliance.active
          );
      } else {
        savedPolicyCompliance =
          '***ERROR*** The initiative does not have information in the Policy and Compliance section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return savedPolicyCompliance;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Policy and Compliance ',
        400,
        error.message,
        false
      );
    }
  }

  async replicationHumanResources(
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedHumanResources;
      let savedInitiativeTeam;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const humanResources = await fullPposal.requestHumanResourcesFiles(
        'humanResources'
      );

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const humanResourcesIsdc =
        await fullPposalIsdc.requestHumanResourcesFiles('humanResources');

      if (humanResourcesIsdc) {
        savedHumanResources = await fullPposalIsdc.upsertHumanResourcesAndFiles(
          null,
          null,
          null,
          humanResourcesIsdc.id,
          humanResourcesIsdc.gender_diversity_inclusion,
          humanResourcesIsdc.capacity_development,
          humanResourcesIsdc.active
        );

        savedInitiativeTeam = await fullPposalIsdc.upsertInitiativeTeam(
          savedHumanResources.upsertedHumanResources.id,
          humanResourcesIsdc.initvTeam
        );
      } else if (humanResources) {
        savedHumanResources = await fullPposalIsdc.upsertHumanResourcesAndFiles(
          null,
          null,
          null,
          null,
          humanResources.gender_diversity_inclusion,
          humanResources.capacity_development,
          humanResources.active
        );

        humanResources.initvTeam =
          typeof humanResources.initvTeam === 'undefined'
            ? []
            : humanResources.initvTeam;
        for (let index = 0; index < humanResources.initvTeam.length; index++) {
          const initvTeam = humanResources.initvTeam[index];

          initvTeam.id = null;
        }

        savedInitiativeTeam = await fullPposalIsdc.upsertInitiativeTeam(
          savedHumanResources.upsertedHumanResources.id,
          humanResources.initvTeam
        );
      } else {
        savedHumanResources =
          '***ERROR*** The initiative does not have information in the Human Resources section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return {savedHumanResources, savedInitiativeTeam};
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Human Resources ',
        400,
        error.message,
        false
      );
    }
  }

  async replicationFinancialResources(
    initvStg,
    newinitvStg,
    currentInitvStgId: number,
    newInitStgId: number
  ) {
    try {
      let savedFinancialResources;

      // 1. Get current information from initiative in current stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposal = new ProposalHandler(currentInitvStgId.toString());
      // get general information from proposal object
      const financialResources = await fullPposal.requestFinancialResources();

      //2. Validate if new stage is populated - Get information from initiative in new stage "Use Get of full proposal"
      // create new full proposal object
      const fullPposalIsdc = new ProposalHandler(newInitStgId.toString());
      // get general information from proposal object
      const financialResourcesIsdc =
        await fullPposalIsdc.requestFinancialResources();

      if (financialResourcesIsdc.length > 0) {
        savedFinancialResources = await fullPposalIsdc.upsertFinancialResources(
          financialResourcesIsdc,
          newinitvStg,
          financialResourcesIsdc.financial_type
        );
      } else if (financialResources.length > 0) {
        for (let index = 0; index < financialResources.length; index++) {
          const fn = financialResources[index];
          fn.id = null;
        }
        savedFinancialResources = await fullPposalIsdc.upsertFinancialResources(
          financialResources,
          newinitvStg,
          financialResourcesIsdc.financial_type
        );
      } else {
        savedFinancialResources =
          '***ERROR*** The initiative does not have information in the Financial Resources section, InitvStgId ' +
          currentInitvStgId +
          '- please validate';
      }

      return savedFinancialResources;
    } catch (error) {
      throw new BaseError(
        'Error replicating the information of Financial Resources ',
        400,
        error.message,
        false
      );
    }
  }

  async inactivePreviusInitiative(initvStg) {
    let updateOldInitiativeByStage;

    try {
      //Update Status Old Stage
      initvStg.active = false;

      updateOldInitiativeByStage = await this.initvStgRepo.save(initvStg);

      return updateOldInitiativeByStage;
    } catch (error) {
      throw new BaseError(
        'Error inactivating the initiative in the previous stage ',
        400,
        error.message,
        false
      );
    }
  }
}
