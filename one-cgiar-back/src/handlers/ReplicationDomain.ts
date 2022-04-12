import {getRepository} from 'typeorm';
import {InitiativesByStages, Stages} from '../entity';
import {HttpStatusCode} from '../interfaces/Constants';
import {APIError} from './BaseError';
import {ConceptHandler} from './ConceptDomain';
import {ProposalHandler} from './FullProposalDomain';
import {InitiativeStageHandler} from './InitiativeStageDomain';

export class ReplicationDomain extends InitiativeStageHandler {
  /**
   * Replicate from pre concept to full proposal
   *
   */

  public async replicationPre(initiativeId) {
    const initvStgRepo = getRepository(InitiativesByStages);
    const stgRepo = getRepository(Stages);

    try {
      // full proposal stage
      const proposalStage = await stgRepo.findOne({
        where: {description: 'Full Proposal'}
      });

      // check if initiative by stage exists in full proposal -- if not, create one
      let proposalInitvStg = await initvStgRepo.findOne({
        where: {initiative: initiativeId, stage: proposalStage}
      });
      if (!proposalInitvStg) {
        proposalInitvStg = new InitiativesByStages();
        proposalInitvStg.active = true;
        proposalInitvStg.initiative = initiativeId;
        proposalInitvStg.stage = proposalStage;
      }
      // replicate general information data in full proposal
      await this.replicateGeneralInformation(proposalInitvStg);
    } catch (error) {
      console.log(error);
      throw new APIError(
        'Bad request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    //   initialTheoryChange: await metaData.pre_validationInitialTOC(),
    // results: null,
    // innovations: null,
    // keyPartners: null,
    // globalBudget: null
  }

  public async replicateGeneralInformation(
    proposalInitvStg: InitiativesByStages
  ) {
    try {
      const preConcept = new ConceptHandler();
      // get pre concept general information
      const pre_GI = await preConcept.getGeneralInformation();

      // full proposal object
      const fullProposal = new ProposalHandler(proposalInitvStg.id);
      // check if general information already exists in FP
      const fullProposal_GI = await fullProposal.getGeneralInformation();
      // upsert general information to full proposal
      await fullProposal.upsertGeneralInformation(
        fullProposal_GI['generalInformationId'] || null,
        pre_GI['name'],
        pre_GI['actiona_area_id'],
        pre_GI['action_area_description'],
        pre_GI['acronym']
      );
    } catch (error) {
      console.log(error);
      throw new APIError(
        'Bad request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
  }
}
