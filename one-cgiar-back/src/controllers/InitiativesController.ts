import {validate} from 'class-validator';
import {Request, Response} from 'express';
import {getConnection, getRepository, In, QueryFailedError} from 'typeorm';
import {EntityNotFoundError} from 'typeorm/error/EntityNotFoundError';
import {Narratives} from '../entity/Narratives';
import {Initiatives} from '../entity/Initiatives';
import {InitiativesByStages} from '../entity/InititativesByStages';
import {InitiativesByUsers} from '../entity/InititativesByUsers';
import { Roles } from '../entity/Roles';
import {Stages} from '../entity/Stages';
import {StagesMeta} from '../entity/StagesMeta';
import {TOCs} from '../entity/TOCs';
import {Users} from '../entity/Users';
import {APIError, BaseError} from '../handlers/BaseError';
import {HttpStatusCode} from '../interfaces/Constants';
import {ResponseHandler} from '../handlers/Response';
import {validatedSection} from '../utils/section-validation';
import * as clarisa from './Clarisa';
import {InitiativeStageHandler} from '../handlers/InitiativeStageDomain';
import {InitiativeHandler} from '../handlers/InitiativesDomain';
import {ProposalHandler} from '../handlers/FullProposalDomain';
import {ConceptHandler} from '../handlers/ConceptDomain';
import {MetaDataHandler} from '../handlers/MetaDataDomain';
import {Submissions} from '../entity/Submissions';
import {SubmissionsStatus} from '../entity/SubmissionStatus';
import {Statuses} from '../entity/Statuses';
import {toInteger} from 'lodash';
import {ReplicationDomain} from '../handlers/ReplicationDomain';
import {GeneralInformationRepository} from '../repositories/generalInformationRepository';

require('dotenv').config();

/***
 *
 *  TO UPDATE!
 *
 *
 */

/** TEMPORAL */
/**
 *
 * @param req params: { initiativeId, stageId }
 * @param res
 * @returns
 */
export const getSummary = async (req: Request, res: Response) => {
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get initiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage},
      relations: ['stage', 'initiative']
    });
    // if not initiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Summary: Error',
        400,
        `Summary not found in stage: ${stage.description}`,
        false
      );
    }

    const initiative = new InitiativeStageHandler();

    const summary = await initiative.getSummary(initvStg);

    const generalInformation = summary.generalInformation;
    const budget = summary.budget;
    const geoScope = summary.geoScope;

    res.json(
      new ResponseHandler('Initiatives: Summary.', {
        generalInformation,
        budget,
        geoScope
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req params: { initiativeId, stageId }
 * @param res
 * @returns
 */
export const upsertSummary = async (req: Request, res: Response) => {
  const {initiativeId, stageId} = req.params;

  // summary section data
  const {
    generalInformationId,
    name,
    acronym,
    action_area_id,
    action_area_description,
    budgetId,
    budget_value,
    regions,
    countries,
    is_global
  } = req.body;




  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});
    // get initiatives by stage
    let initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage},
      relations: ['stage', 'initiative']
    });

    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Summary: Error',
        400,
        `Summary not found in stage: ${stage.description}`,
        false
      );
    }
    initvStg.global_dimension = is_global;
    // initvStg = await initvStgRepo.save(initvStg);

    // create initiative by stage handler object
    const initvStgObj = new InitiativeStageHandler(
      `${initvStg.id}`,
      `${initvStg.stage.id}`,
      `${initvStg.initiative.id}`
    );
    // get current stage object
    // const currentStage = await initvStgObj.stage;

    // create object for concept or full proposal
    // let dummyHandler;
    // if (
    //   currentStage[0].description === 'Full Proposal'
    // ) {
    //   dummyHandler = new ProposalHandler(initvStg.id.toString());
    // } else {
    //   dummyHandler = new ConceptHandler(initvStg.id.toString());
    // }

    const summary = await initvStgObj.upsertSummary(
      generalInformationId,
      name,
      action_area_id,
      action_area_description,
      acronym,
      budgetId,
      budget_value,
      regions,
      countries
    );

    const upsertedGeoScope = summary.upsertedGeoScope;

    const upsertedBudget = summary.upsertedBudget;

    const upsertedGeneralInformation = summary.upsertedGeneralInformation;

    // // upsert geo scope, budget, general information
    // const upsertedGeoScope = await initvStgObj.upsertGeoScopes(
    //   regions,
    //   countries
    // );
    // const upsertedBudget = await initvStgObj.addBudget(
    //   budget_value,
    //   'general_information',
    //   'budget',
    //   budgetId,
    //   true
    // );
    // const upsertedGeneralInformation =
    //   await dummyHandler.upsertGeneralInformation(
    //     generalInformationId,
    //     name,
    //     action_area_id,
    //     action_area_description,
    //     acronym
    //   );

    res.json(
      new ResponseHandler('Initiatives: Summary.', {
        generalInformation: upsertedGeneralInformation,
        geoScope: upsertedGeoScope,
        budget: upsertedBudget
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 ** REPLICATION PROCESS
 * @param req params: { initiativeId,stageId, newStageId}
 * @param res replicationProcess
 * @returns
 */
export async function replicationProcess(req: Request, res: Response) {
  const {stageId, initiativeId} = req.params;
  const {newStageId} = req.body;

  // instantiate class InitiativeStageHandler (Domain)
  const replication = new ReplicationDomain();

  try {
    // Call replication Process from Domain
    const replicationProcess = await replication.replicationProcess(
      toInteger(initiativeId),
      toInteger(stageId),
      newStageId
    );

    return res.json(replicationProcess);
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req params:{ title: string, link: string, table_name: string, col_name: string, citationId?: string }
 * @param res
 */
export const addLink = async (req: Request, res: Response) => {
  const {title, link, table_name, col_name, citationId, active} = req.body;

  // get initiative by stage id from client
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    const stage = await stageRepo.findOne(stageId);
    // get initiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Add link: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    const initiative = new InitiativeStageHandler(initvStg.id + '');

    const addedLink = await initiative.addLink(
      title,
      link,
      table_name,
      col_name,
      citationId,
      active
    );

    res.json(new ResponseHandler('Initiatives:Add link.', {addedLink}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getInitvStgId(req: Request, res: Response) {
  // get initiative by stage id from client
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    const stage = await stageRepo.findOne(stageId);
    // get initiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Add link: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }
    res.json(new ResponseHandler('Initiatives:Get initvStg.', initvStg.id));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getLink(req: Request, res: Response) {
  const {table_name, col_name, active} = req.body;

  // get initiative by stage id from client
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    const stage = await stageRepo.findOne(stageId);
    // get initiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Add link: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    const initiative = new InitiativeStageHandler(initvStg.id + '');

    const getLinks = await initiative.getLink(table_name, col_name, active);

    res.json(new ResponseHandler('Initiatives:Get link.', {getLinks}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req params:{ value:number, table_name: string, col_name: string, budgetId?: string }
 * @param res
 */
export async function addBudget(req: Request, res: Response) {
  const {value, table_name, col_name, budgetId, active} = req.body;

  // get initiative by stage id from client
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    const stage = await stageRepo.findOne(stageId);
    // get initiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Add Budget: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    const initiative = new InitiativeStageHandler(initvStg.id + '');

    const addedBudget = await initiative.addBudget(
      value,
      table_name,
      col_name,
      budgetId,
      active
    );

    res.json(new ResponseHandler('Initiatives:Add Budget.', {addedBudget}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getBudget(req: Request, res: Response) {
  const {table_name, col_name, active} = req.body;

  // get initiative by stage id from client
  const {initiativeId, stageId} = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    const stage = await stageRepo.findOne(stageId);
    // get initiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Get budget: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    const initiative = new InitiativeStageHandler(initvStg.id + '');

    const getBudget = await initiative.getBudget(table_name, col_name, active);

    res.json(new ResponseHandler('Initiatives:Get budget.', {getBudget}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

export async function removeBudget(req: Request, res: Response) {
  const {budgetId} = req.params;

  try {
    const initiative = new InitiativeStageHandler();

    const removeBudget = await initiative.removeBudget(budgetId);

    res.json(new ResponseHandler('Initiatives:Remove budget.', {removeBudget}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * All Initiatives actives
 * @param req
 * @param res
 */
export async function getInitiatives(req: Request, res: Response) {
  try {
    const {userId} = res.locals.jwtPayload;
    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    // Get active initiatives and detail
    let initiatives = await initiativeshandler.getAllInitiatives(userId);

    if (initiatives.length == 0)
      res.json(
        new ResponseHandler('All Initiatives whit status active.', {
          initiatives: []
        })
      );
    else {
      res.json(
        new ResponseHandler('All Initiatives whit status active.', {
          initiatives
        })
      );
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}
/**
 * All Initiatives actives
 * @param req
 * @param res
 */
export async function getInitiativesList(req: Request, res: Response) {
  try {
    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    // Get active initiatives and detail
    let initiatives = await initiativeshandler.getInitiativesList();

    if (initiatives.length == 0)
      res.json(
        new ResponseHandler('There are no initiatives', {
          initiatives: []
        })
      );
    else {
      res.json(
        new ResponseHandler('Initiatives list', {
          initiatives
        })
      );
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 * All Initiatives whit all status
 * @param req
 * @param res
 */
export async function getInitiativesAllStatus(req: Request, res: Response) {
  try {
    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    // Get active initiatives and detail
    let initiatives = await initiativeshandler.getAllInitiativesAllStatus();

    if (initiatives.length == 0)
      res.json(
        new ResponseHandler('All Initiatives whit all status.', {
          initiatives: []
        })
      );
    else {
      res.json(
        new ResponseHandler('All Initiatives whit all status.', {initiatives})
      );
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 */
export const getInitiativesByUser = async (req: Request, res: Response) => {
  const {userId} = res.locals.jwtPayload;
  const queryRunner = getConnection().createQueryBuilder();
  const conceptRepo = getRepository(Narratives);

  let initiatives,
    initvSQL = ` 
    SELECT
            initvStg.id AS initvStgId,
            initiative.id as initId,
            stage.description AS currentStage,
            stage.id AS currentStageId,
            initiative.name AS initiativeName,
            initvStg.active AS initvStageIsActive,
            s.status,
            stage.id AS activeStageId
        FROM
            initiatives_by_users initvStgUsr
        LEFT JOIN initiatives_by_stages initvStg ON initvStg.initiativeId = initvStgUsr.initiativeId and initvStg.active > 0
        LEFT JOIN stages stage ON stage.id = initvStg.stageId
        LEFT JOIN initiatives initiative ON initiative.id = initvStg.initiativeId
        left join statuses s on s.id = initvStg.statusId
        WHERE
            initvStgUsr.userId = ${userId}
    `;

  try {
    const [query, parameters] =
      await queryRunner.connection.driver.escapeQueryWithParameters(
        initvSQL,
        {},
        {}
      );
    initiatives = await queryRunner.connection.query(query, parameters);
    let initiativesIds = initiatives.map((init) => init.initvStgId);
    if (initiatives.length == 0) res.sendStatus(204);
    else {
      /**
       * more stages to be added
       */
      const concepts = await conceptRepo.find({
        where: {
          initvStg: In(initiativesIds)
        },
        relations: ['initvStg'],
        select: ['name', 'action_area_description', 'action_area_id']
      });
      initiatives.forEach((initiative) => {
        initiative['concept'] = concepts.find((c) => {
          return c.initvStg.id === initiative.initvStgId ? c.initvStg : null;
        });
      });
      /**
       * more stages to be added
       */
      res.json(new ResponseHandler('User Initiatives.', {initiatives}));
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 */
export const getUserRoleByInitiative = async (req: Request, res: Response) => {
  const {initiativeId} = req.params;
  const {userId} = res.locals.jwtPayload;
  const queryRunner = getConnection().createQueryBuilder();
  const querySql = `
        SELECT
            initvUsr.initiativeId, 
            initvUsr.active,
            role.id AS roleId,
            role.acronym,
            role.name
        FROM
            initiatives_by_users initvUsr
        LEFT JOIN users users ON users.id = initvUsr.userId
        LEFT JOIN roles role ON role.id = initvUsr.roleId
        WHERE initvUsr.initiativeId = ${initiativeId}
        AND initvUsr.active = TRUE
        AND initvUsr.userId = ${userId}
    `;

  let roles;

  try {
    const [query, parameters] =
      await queryRunner.connection.driver.escapeQueryWithParameters(
        querySql,
        {initiativeId, userId},
        {}
      );
    roles = await queryRunner.connection.query(query, parameters);
    res.json(new ResponseHandler('User roles by Initiative.', {roles}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 */
export const getUsersByInitiative = async (req: Request, res: Response) => {
  const {initiativeId} = req.params;
  try {
    const initiativeshandler = new InitiativeHandler();
    const users = await initiativeshandler.getUsersByInitiative(initiativeId);
    res.json(new ResponseHandler('Users by Initiative.', {users}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req params:{ userId, roleId }
 * @param res
 */
export const assignUsersByInitiative = async (req: Request, res: Response) => {
  const {userId, roleId, active} = req.body;
  const {initiativeId} = req.params;
  const initvUsrsRepo = getRepository(InitiativesByUsers);
  const initiativesRepo = getRepository(Initiatives);
  const userRepo = getRepository(Users);
  const rolesRepo = getRepository(Roles);
  let newUsrByInitv: InitiativesByUsers;
  try {
    let usersByInitiative = await initvUsrsRepo.find({
      where: {initiative: initiativeId, user:userId},
      relations: ['role', 'user']
    });
    const user = await userRepo.findOne(userId);
    const initiative = await initiativesRepo.findOne(initiativeId);

    const role = await rolesRepo.findOne(roleId);
    await rolesRepo.findOne({where: {acronym: 'SGD'}});
    await rolesRepo.findOne({where: {acronym: 'PI'}});
    const coordinatorRole = await rolesRepo.findOne({where: {acronym: 'CO'}});

    if (role.acronym == 'ADM') {
      throw new APIError(
        'UNAUTHORIZED',
        HttpStatusCode.UNAUTHORIZED,
        true,
        'Role not accessible.'
      );
    }

    if (usersByInitiative.length > 0) {
      usersByInitiative[0]['user']['is_active'] = (active != undefined? active: usersByInitiative[0]['user']['is_active']);
      newUsrByInitv = new InitiativesByUsers();
      newUsrByInitv.active = active;
      newUsrByInitv.role = role;
      newUsrByInitv.user = user;
      newUsrByInitv.initiative = initiative;

      if (role.acronym == 'SGD') {
        usersByInitiative.forEach((initvUsr) => {
          if (user.id != initvUsr.user.id) {
            initvUsr.role =
              initvUsr.role && initvUsr.role.acronym == 'SGD'
                ? coordinatorRole
                : initvUsr.role;
          } else {
            newUsrByInitv.id = initvUsr.id;
          }
        });
      } else if (role.acronym == 'PI') {
        usersByInitiative.forEach((initvUsr) => {
          if (user.id != initvUsr.user.id) {
            initvUsr.role =
              initvUsr.role && initvUsr.role.acronym == 'PI'
                ? coordinatorRole
                : initvUsr.role;
          } else {
            newUsrByInitv.id = initvUsr.id;
          }
        });
      } else {
        usersByInitiative.forEach((initvUsr) => {
          if (user.id != initvUsr.user.id) {
            initvUsr.role =
              initvUsr.role && initvUsr.role.acronym == 'CO'
                ? coordinatorRole
                : initvUsr.role;
          } else {
            newUsrByInitv.id = initvUsr.id;
          }
        });
      }

      usersByInitiative = await initvUsrsRepo.save(usersByInitiative);
      newUsrByInitv = await initvUsrsRepo.save(newUsrByInitv);
    } else {
      newUsrByInitv = new InitiativesByUsers();
      newUsrByInitv.active = active;
      newUsrByInitv.role = role;
      newUsrByInitv.user = user;
      newUsrByInitv.initiative = initiative;

      newUsrByInitv = await initvUsrsRepo.save(newUsrByInitv);
    }

    res.json(
      new ResponseHandler('Assigned user to initiative', {
        assignedUser: newUsrByInitv
      })
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req body:{ name, user, current_stage }
 * @param res
 */
export const createInitiative = async (req: Request, res: Response) => {
  const {name, user, current_stage, official_code, acronym} = req.body;
  const userRepository = getRepository(Users);
  const initiativesRepository = getRepository(Initiatives);
  const initiativesByUsersRepository = getRepository(InitiativesByUsers);
  const initiativesByStagesRepository = getRepository(InitiativesByStages);
  const stageRepository = getRepository(Stages);
  const statusesRepo = getRepository(Statuses);

  const initiative = new Initiatives();
  const initByUsr = new InitiativesByUsers();
  const newInitStg = new InitiativesByStages();
  initiative.name = name;
  initiative.acronym = acronym;
  initiative.official_code = official_code;

  try {
    const errors = await validate(initiative);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const userDB = await userRepository.findOne({
      select: ['id'],
      where: {id: user},
      order: {created_at: 'ASC'}
    });

    if (userDB) {
      let createdInitiative = await initiativesRepository.save(initiative);
      initByUsr.initiative = createdInitiative;
      initByUsr.user = userDB;
      // initByUsr.is_coordinator = is_coordinator;
      // initByUsr.is_lead = is_lead;
      // initByUsr.is_owner = is_owner;
      if (current_stage) {
        // set editing as current status
        const editingStatus = await statusesRepo.findOne({
          where: {status: 'Editing'}
        });
        let sltdStage = await stageRepository.findOne(current_stage);
        newInitStg.status = editingStatus;
        newInitStg.initiative = createdInitiative;
        newInitStg.stage = sltdStage;
        await initiativesByStagesRepository.save(newInitStg);
      }

      await initiativesByUsersRepository.save(initByUsr);
      res.json({
        msg: 'Initiative created',
        data: {createdInitiative, initiative_by_stage: newInitStg}
      });
    } else return res.status(400).json({data: userDB, msg: 'None user found'});
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res stages , stagesMeta
 */
export const getStage = async (req: Request, res: Response) => {
  const stageRepo = getRepository(Stages);
  const stageMetaRepo = getRepository(StagesMeta);

  try {
    let stages = await stageRepo.find();
    let stagesMeta = await stageMetaRepo.find({
      where: {stage: In(stages.map((stage) => stage.id))},
      order: {order: 'ASC'}
    });

    res.json(new ResponseHandler('Stages.', {stages, stagesMeta}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req stageId
 * @param res stageMeta
 */
export const getStageMeta = async (req: Request, res: Response) => {
  // get stage id from params
  const {initiativeId} = req.params;
  const stageMetaRepo = getRepository(StagesMeta);
  const initvStgRepo = getRepository(InitiativesByStages);

  try {
    console.log(initiativeId);
    const initvStg = await initvStgRepo.findOne({
      where: {id: initiativeId},
      relations: ['stage']
    });
    let stagesMeta = await stageMetaRepo.find({
      where: {stage: initvStg.stage},
      order: {order: 'ASC'}
    });

    const stgDesc = initvStg.stage.description
      .split(' ')
      .join('_')
      .toLocaleLowerCase();
    const validatedSections = await validatedSection(initvStg.id, stgDesc);
    res.json(
      new ResponseHandler('Stages meta.', {stagesMeta, validatedSections})
    );
  } catch (error) {
    console.log(error);
    const err = new BaseError(
      'Get stages meta - sections.',
      error.status || 400,
      error.message,
      false
    );
    return res.status(err.httpCode).json(err);
  }
};

/**
 *
 * @param req params:{ description, active, start_date, end_date }
 * @param res
 */
export const createStage = async (req: Request, res: Response) => {
  const {description, active, start_date, end_date} = req.body;
  const stageRepo = getRepository(Stages);
  const stage = new Stages();
  stage.description = description;
  stage.active = active;
  stage.start_date = start_date;
  stage.end_date = end_date;

  try {
    const errors = await validate(stage);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    let createdStage = await stageRepo.save(stage);
    res.json({msg: 'Stage created', data: createdStage});
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/// -*----*- ///
/**
 *
 * @param req params:{ initiativeId, stageId }
 * @param res
 */
export const submitInitiative = async (req: Request, res: Response) => {
  // console.log(req.params, req.body)

  const {initiativeId, stageId} = req.params;
  // const { description, active, start_date, end_date } = req.body;
  const initvStgRepo = getRepository(InitiativesByStages);
  const usersRepo = getRepository(Users);
  const submissionStatusRepo = getRepository(SubmissionsStatus);
  const submissionRepo = getRepository(Submissions);
  const statusesRepo = getRepository(Statuses);

  try {
    // get initiative by stage
    const initvStg = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage: stageId}
    });
    // get current user
    const {userId} = res.locals.jwtPayload;

    // get current user
    const user = await usersRepo.findOne(userId, {relations: ['roles']});
    // get editing status
    const submittedStatus = await statusesRepo.findOne({
      where: {status: 'Submitted', active: 1}
    });
    // create new Meta Data object
    const metaData = new MetaDataHandler(initvStg.id.toString());
    const validateSbSts = await metaData.validationSubmissionStatuses();

    let submissionObject = await submissionRepo.findOne({
      where: {initvStg, active: 1}
    });

    // validate if initiative is completed
    await validateSbSts.isComplete();
    // validate if initiative in this stage is already submitted
    if (submissionObject) {
      const sts = await submissionStatusRepo.find({
        where: {submission: submissionObject},
        relations: ['submission']
      });
      return res.json(
        new ResponseHandler('Initiative already submitted', {
          submission: sts
        })
      );
    } else {
      // create new submission object
      let submission = new Submissions();
      submission.initvStg = initvStg;
      submission.active = true;
      submission.first_name = user.first_name;
      submission.last_name = user.last_name;
      submission.userId = user.id;

      submission = await submissionRepo.save(submission);
      initvStg.status = submittedStatus;
      const initvStgUpd = await initvStgRepo.save(initvStg);

      // create submission status
      const submissionStatus = new SubmissionsStatus();
      submissionStatus.active = true;
      submissionStatus.submission = submission;
      submissionStatus.statusId = submittedStatus.id;
      const evaluatedSubmission = await submissionStatusRepo.save(
        submissionStatus
      );
      return res.json(
        new ResponseHandler('Initiative submitted', {
          submission: evaluatedSubmission
        })
      );
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req params:{ initiativeId, stageId }
 * @param res
 */
export const getAssessmentStatus = async (req: Request, res: Response) => {
  const statusesRepo = getRepository(Statuses);
  const stagesRepo = getRepository(Stages);
  const initvStgRepo = getRepository(InitiativesByStages);

  const {initiativeId, stageId} = req.params;
  // get current user
  const {userId} = res.locals.jwtPayload;

  try {
    // get current stage
    // const stage = await stagesRepo.findOne(stageId);
    // get statuses
    const statuses = await statusesRepo.find({where: {active: true}});
    // get initiative by stage
    const initvStg = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage: stageId}
    });
    const metaData = new MetaDataHandler(initvStg.id.toString());
    const validateSbSts = await metaData.validationSubmissionStatuses();
    // const validateSbSts = await metaData.validationSubmissionStatuses(initvStg);

    const assessmentValidation = await validateSbSts.isAssessor(userId);

    const statusesAvailable = statuses.filter((status) => {
      if (status.stagesAvailables) {
        const stsArray = Object.values(status.stagesAvailables);
        return stsArray.find((sts) => sts == stageId);
      }
    });

    return res.json(
      new ResponseHandler('Initiative submission statuses', {
        statuses: statusesAvailable
      })
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      error = new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req params:{ initiativeId, stageId }
 * @param res
 */
export const getSubmission = async (req: Request, res: Response) => {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const submissionRepo = getRepository(Submissions);
  try {
    // get initiative by stage
    const initvStg = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage: stageId}
    });

    const submission = await submissionRepo.findOne({where: {initvStg}});

    return res.json(new ResponseHandler('Initiative submission', {submission}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      error = new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req params:{ initiativeId, stageId }
 * @param body params:{ description, statusId }
 * @param res
 */
export const updateSubmissionStatusByInitiative = async (
  req: Request,
  res: Response
) => {
  const {initiativeId, stageId} = req.params;
  const {description, statusId} = req.body;
  const initvStgRepo = getRepository(InitiativesByStages);
  const submissionStatusRepo = getRepository(SubmissionsStatus);

  try {
    // get initiative by stage
    const initvStg = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage: stageId}
    });
    const metaData = new MetaDataHandler(initvStg.id.toString());
    const validateSbSts = await metaData.validationSubmissionStatuses();

    // get current user
    const {userId} = res.locals.jwtPayload;

    //validate if **assessor** or admin is doing assessment
    const assessmentUser = await validateSbSts.isAssessor(userId);
    // validate if initiative by stage is completed
    await validateSbSts.isComplete();
    // validate  if status is available or submission is not completed yet
    const {submission, newSubStatus, newStatusxInitv} =
      await validateSbSts.validateStatus(statusId);

    newSubStatus.submission = submission;
    newSubStatus.description = description;
    newSubStatus.userId = assessmentUser.user.id;
    newSubStatus.first_name = assessmentUser.user.first_name;
    newSubStatus.last_name = assessmentUser.user.last_name;
    const updatedStatus = await submissionStatusRepo.save(newSubStatus);

    // update status in initiative by stage
    initvStg.status = newStatusxInitv;
    await initvStgRepo.save(initvStg);

    const statusS = await submissionStatusRepo.findOne({
      where: {id: newSubStatus.id, active: 1},
      relations: ['submission']
    });

    return res.json(
      new ResponseHandler('Initiative submission status updated', {
        updatedSubmission: statusS
      })
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/// -*----*- ///

/**
 *
 * @param req params:{ stageInitiativeId, stageId, stageData }
 * @param res
 */
export const assignStageToInitiative = async (req: Request, res: Response) => {
  const {stageInitiativeId, stageId, stageData} = req.body;

  const stageRepo = getRepository(Stages);
  const stageByInitiRepo = getRepository(InitiativesByStages);
  const qN = getConnection().createQueryRunner();

  /**
   *
   *
   */

  try {
    let stage = await stageRepo.findOneOrFail(stageId);
    let tableName = `${stage.description
      .split(' ')
      .join('_')
      .toLocaleLowerCase()}_info`;
    let initiativeStage = await stageByInitiRepo.findOneOrFail(
      stageInitiativeId
    );
    let newData = getRepoConstStage(
      `${stage.description.split(' ').join('_').toLocaleLowerCase()}`
    );
    newData.initvStg = initiativeStage;

    const columns = (await qN.getTable(tableName)!).columns.map((c) => c.name);
    const tableRepo = getConnection().manager;

    if (columns.length > 0) {
      columns.forEach((ele) => {
        if (ele === 'initvStgId') {
          newData[ele] = initiativeStage;
        } else if (
          ele !== 'created_at' &&
          ele !== 'updated_at' &&
          ele !== 'id'
        ) {
          newData[ele] = stageData[ele];
        }
      });

      // console.log(newData);
      const insertedData = await tableRepo.save(newData);
      res.json({
        msg: `${stage.description} stage data has been saved `,
        data: insertedData
      });
    } else {
      return res.status(400).json({msg: 'None stage schema found.'});
    }
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

export const assignTOCsByInitvStg = async (req: Request, res: Response) => {
  const {initvStgId, narrative} = req.body;
  const initvStgRepo = getRepository(InitiativesByStages);
  const TOCsRepo = getRepository(TOCs);

  const tocFile = new TOCs();
  // tocFile.url = url;
  tocFile.narrative = narrative;
  try {
    let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
    tocFile.initvStg = initiativeStg;

    const errors = await validate(tocFile);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    let createdtocFile = await TOCsRepo.save(tocFile);
    res.json({
      msg: 'TOC file assigned to initiative by stage',
      data: createdtocFile
    });
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns depthScale
 */
export async function getDepthScale(req: Request, res: Response) {
  const {impactIndicatorId} = req.params;
  const initiativeshandler = new InitiativeHandler();

  try {
    let depthScale = await initiativeshandler.requestDepthScale(
      impactIndicatorId
    );

    res.json(new ResponseHandler('Get Depth Scale.', {depthScale}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @returns depthDescription
 */
export async function getDepthDescription(req: Request, res: Response) {
  const {impactIndicatorId} = req.params;
  const initiativeshandler = new InitiativeHandler();

  try {
    let depthDescription = await initiativeshandler.requestDepthDescription(
      impactIndicatorId
    );

    res.json(new ResponseHandler('Get Depth Description.', {depthDescription}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 * PREVIEW PARTNERS
 * @param req
 * @param res
 * @returns
 */

export async function getPreviewPartners(req: Request, res: Response) {
  const initiativeshandler = new InitiativeHandler();

  try {
    const previewPartners = await initiativeshandler.requestPreviewPartners();

    res.json(
      new ResponseHandler('Full Proposal: Get Preview Partners.', {
        previewPartners
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * CLARISA getters
 *
 */

/**
 *
 * @param req
 * @param res
 * @returns
 */

export async function getActionAreas(req: Request, res: Response) {
  try {
    //Get Action Areas from CLARISA
    // const actionAreas = await getClaActionAreas();

    //Get Action Areas from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let actionAreas = await initiativeshandler.requestActionAreas();

    res.json(new ResponseHandler('Action areas.', {actionAreas}));
  } catch (error) {
    console.log(error);
    if (
      error instanceof QueryFailedError ||
      error instanceof EntityNotFoundError
    ) {
      new APIError(
        'Bad Request',
        HttpStatusCode.BAD_REQUEST,
        true,
        error.message
      );
    }
    return res.status(error.httpCode).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @returns countries
 */

export const getCountries = async (req: Request, res: Response) => {
  try {
    //Get Countries from CLARISA
    // const countries = await clarisa.getClaCountries();

    //Get Countries from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let countries = await initiativeshandler.requestCountries();

    res.json(new ResponseHandler('Countries.', {countries}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns regions
 */

export const getRegions = async (req: Request, res: Response) => {
  try {
    //Get Regions from CLARISA
    // const regions = await clarisa.getClaRegions();

    //Get Regions from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let regions = await initiativeshandler.requestRegions();

    res.json(new ResponseHandler('Regions.', {regions}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 * CLARISA REGIONS CGIAR
 * @param req
 * @param res
 * @returns regions
 */

export const getRegionsCgiar = async (req: Request, res: Response) => {
  try {
    //Get Regions from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let regions = await initiativeshandler.requestRegionsCgiar();

    res.json(new ResponseHandler('Regions CGIAR.', {regions}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

export const getInstitutions = async (req: Request, res: Response) => {
  try {
    //Get institution from Clarisa
    // const institutions = await getClaInstitutions();

    //Get institution from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let institutions = await initiativeshandler.requestInstitutions();
    res.json(
      new ResponseHandler('Institutions.', {institutions: institutions})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 * GET INSTITUTIONS TYPES
 * @param req
 * @param res
 * @returns
 */

export const getInstitutionsTypes = async (req: Request, res: Response) => {
  try {
    //Get institution types from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let institutionsTypes = await initiativeshandler.requestInstitutionsTypes();

    res.json(
      new ResponseHandler('Institutions types.', {types: institutionsTypes})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

export const getGlobalTargets = async (req: Request, res: Response) => {
  try {
    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let globalTargets = await initiativeshandler.requestGlobalTargets();

    res.json(
      new ResponseHandler('Global Targets.', {globalTargets: globalTargets})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */

export const getCRP = async (req: Request, res: Response) => {
  try {
    const crps = await clarisa.getClaCRPs();
    res.json(new ResponseHandler('CGIAR entities.', {crps}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 * REQUEST IMPACT AREAS FROM ST
 * @param req
 * @param res
 * @returns
 */
export async function getImpactAreas(req: Request, res: Response) {
  try {
    //Get impact areas from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let impactAreasRequested = await initiativeshandler.requestImpactAreas();

    res.json(
      new ResponseHandler('Requested Impact areas.', {impactAreasRequested})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * REQUEST IMPACT AREAS INDICATORS FROM ST
 * @param req
 * @param res
 * @returns impactAreasIndicators
 */
export async function getImpactAreasIndicators(req: Request, res: Response) {
  try {
    //Get impact areas from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let impactAreasIndicatorsRequested =
      await initiativeshandler.requestImpactAreasIndicators();

    res.json(
      new ResponseHandler('Requested Impact areas Indicators.', {
        impactAreasIndicatorsRequested
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * REQUEST RISKS FROM ST
 * @param req
 * @param res
 * @returns
 */
export async function GetRisks(req: Request, res: Response) {
  try {
    //Get impact areas from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let risks = await initiativeshandler.requestRisks();

    res.json(new ResponseHandler('Requested Risks.', {risks}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * REQUEST RISKS THEME FROM ST
 * @param req
 * @param res
 * @returns
 */
export async function GetRisksTheme(req: Request, res: Response) {
  try {
    //Get impact areas from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let risksTheme = await initiativeshandler.requestRisksTheme();

    res.json(new ResponseHandler('Requested Risks Theme.', {risksTheme}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * REQUEST PROJECTED BENEFITS FROM ST
 * @param req
 * @param res
 * @returns
 */
export async function getProjectedBenefits(req: Request, res: Response) {
  try {
    const initiativeshandler = new InitiativeHandler();

    let impactProjectedBenefitsRequested =
      await initiativeshandler.requestProjectedBenefits();

    res.json(
      new ResponseHandler('Requested projected benefits.', {
        impactProjectedBenefitsRequested
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

export async function getProjectedProbabilities(req: Request, res: Response) {
  try {
    const initiativeshandler = new InitiativeHandler();
    const probabilities = await initiativeshandler.requestProjectedProbabilities();
    res.json(new ResponseHandler('Requested probabilities.', {probabilities}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET SDG TARGETS FROM ST
 * @param req
 * @param res
 * @returns
 */
export async function getSdgTargets(req: Request, res: Response) {
  try {
    const initiativeshandler = new InitiativeHandler();
    const sdgTargets = await initiativeshandler.requestSdgTargets();
    res.json(new ResponseHandler('Requested SDG Targets.', {sdgTargets}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

export async function getActionAreasOutcomesIndicators(
  req: Request,
  res: Response
) {
  try {
    const initiativeshandler = new InitiativeHandler();
    const outcomesIndicators =
      await initiativeshandler.requestActionAreasOutIndicators();
    res.json(
      new ResponseHandler('Requested Action Areas Outcomes Indicators.', {
        outcomesIndicators
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

function getRepoConstStage(tableName: string) {
  switch (tableName) {
    case 'pre_concept': {
      return null;
      break;
    }
    case 'concept': {
      return new Narratives();
      break;
    }
    case 'full_proposal': {
      return null;
      break;
    }

    default:
      break;
  }
}

/**
 * CLARISA MELIA STUDY TYPES
 * @param req
 * @param res
 * @returns meliaStudyTypes
 */
export const getMeliaStudyTypes = async (req: Request, res: Response) => {
  try {
    //Get MELIA Study Types from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let meliaStudyTypes = await initiativeshandler.requestMeliaStudyTypes();

    res.json(new ResponseHandler('MELIA Study Types', {meliaStudyTypes}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @returns Years
 */

export const getYears = async (req: Request, res: Response) => {
  try {
    //Get Years from submission

    // create new Meta Data object
    const initiativeshandler = new InitiativeHandler();

    let years = await initiativeshandler.requestYears();

    res.json(new ResponseHandler('Years', {years}));
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};
