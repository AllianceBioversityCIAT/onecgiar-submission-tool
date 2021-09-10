import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getConnection, getRepository, In, QueryFailedError } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Narratives } from '../entity/Narratives';
import { Initiatives } from '../entity/Initiatives'
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { Roles } from '../entity/Roles';
import { Stages } from '../entity/Stages';
import { StagesMeta } from '../entity/StagesMeta';
import { TOCs } from '../entity/TOCs';
import { Users } from '../entity/Users';
import { APIError, BaseError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
import { ResponseHandler } from '../handlers/Response';
import { forwardStage, validatedSection } from '../utils/section-validation';
import { getClaActionAreas, getClaCountries, getClaCRPs, getClaInstitutions, getClaInstitutionsTypes, getClaRegions, getImpactAreas, getImpactAreasIndicators, requestClaInstitution } from './Clarisa';

import _, { initial } from "lodash";
import { InitiativeStageHandler } from '../handlers/InitiativeStageController';
import { CountriesByInitiativeByStage } from '../entity/CountriesByInitiativeByStage';
import { RegionsByInitiativeByStage } from '../entity/RegionsByInitiativeByStage';
import { InitiativeHandler } from '../handlers/InitiativesHandler';
import { ProposalHandler } from '../handlers/FullProposalController';
import { ConceptHandler } from '../handlers/ConceptController';


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
 * @param req paramas: { initiativeId, stageId }
 * @param res 
 * @returns 
 */
export const getSummary = async (req: Request, res: Response) => {
    const { initiativeId, stageId } = req.params;

    const queryRunner = getConnection().createQueryRunner().connection;
    const initvStgRepo = getRepository(InitiativesByStages);
    const countriesInitvStgRepo = getRepository(CountriesByInitiativeByStage);
    const regionsInitvStgRepo = getRepository(RegionsByInitiativeByStage);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { id: stageId } });

        // get intiative by stage
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null || initvStg == undefined) {
            throw new BaseError('Summary: Error', 400, `Summary not found in stage: ${stage.description}`, false);
        }

        const initiative = new InitiativeStageHandler(initvStg.id + '');

        let GIquery = (` 
                SELECT
                    initvStgs.id AS initvStgId,
                    general.id AS generalInformationId,
                    IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
                
                    (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                    (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                    (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
                
                    (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                    (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                    (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                                            
                    general.action_area_description AS action_area_description,
                    general.action_area_id AS action_area_id
                
                FROM
                    initiatives_by_stages initvStgs
                LEFT JOIN general_information general ON general.initvStgId = initvStgs.id
                
                WHERE initvStgs.id = ${initvStg.id};
            `),
            COquery = (
                `SELECT id,country_id,initvStgId
                FROM countries_by_initiative_by_stage 
               WHERE initvStgId = ${initvStg.id}
                 AND active = 1
                 AND wrkPkgId IS NULL
              GROUP BY id,country_id`
            ),
            REquery = (
                `
                SELECT id,region_id,initvStgId
                  FROM regions_by_initiative_by_stage
                 WHERE initvStgId = ${initvStg.id}
                   AND active = 1
                   AND wrkPkgId IS NULL
                GROUP BY id,region_id
                `
            )

        const gI = await queryRunner.query(GIquery);
        const generalInformation = gI[0];

        // get geo scope from initiative
        // const regions = await regionsInitvStgRepo.find({ where: { initvStg: initvStg.id } });
        // const countries = await countriesInitvStgRepo.find({ where: { initvStg: initvStg.id } });
        const regions = await queryRunner.query(REquery);
        const countries = await queryRunner.query(COquery);
        const budget = await initiative.getBudget('general_information', 'budget', true);
        const goblalDimension = initvStg.global_dimension;

        const geoScope = { regions, countries, goblalDimension }

        res.json(new ResponseHandler('Initiatives: Summary.', { generalInformation, budget, geoScope }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req paramas: { initiativeId, stageId }
 * @param res 
 * @returns 
 */
export const upsertSummary = async (req: Request, res: Response) => {
    const { initiativeId, stageId } = req.params;

    // summary section data
    const { generalInformationId, name, action_area_id, action_area_description, budgetId, budget_value, regions, countries, is_global } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {
        // get stage
        const stage = await stageRepo.findOne({ where: { id: stageId } });
        // get intiative by stage
        let initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage }, relations: ['stage', 'initiative'] });


        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Summary: Error', 400, `Summary not found in stage: ${stage.description}`, false);
        }
        initvStg.global_dimension = is_global;
        initvStg = await initvStgRepo.save(initvStg)

        // create initiative by stage handler object
        const initvStgObj = new InitiativeStageHandler(`${initvStg.id}`, `${initvStg.stage.id}`, `${initvStg.initiative.id}`);
        // get current stage object
        const currentStage = await initvStgObj.stage;



        // create object for concept or full proposal
        let dummyHandler;
        if (currentStage[0].description === 'Full Proposal') {
            dummyHandler = new ProposalHandler(initvStg.id.toString());
        } else {
            dummyHandler = new ConceptHandler(initvStg.id.toString());
        }


        // upsert geo scope, budget, general information
        const upsertedGeoScope = await initvStgObj.upsertGeoScopes(regions, countries);
        const upsertedBudget = await initvStgObj.addBudget(budget_value, 'general_information', 'budget', budgetId, true);
        const upsertedGeneralInformation = await dummyHandler.upsertGeneralInformation(generalInformationId, name, action_area_id, action_area_description);

        res.json(new ResponseHandler('Initiatives: Summary.', { generalInformation: upsertedGeneralInformation, geoScope: upsertedGeoScope, budget: upsertedBudget }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}




/**
 * 
 * @param req paramas: { currentInitiativeId }
 * @param res 
 * @returns 
 */
export const replicationProcess = async (req: Request, res: Response) => {
    const { currentInitiativeId } = req.params;
    const { replicationStageId } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {
        // get replicate to stage
        const stage = await stageRepo.findOne(replicationStageId);
        // get replicate to stage description
        const stgDesc = stage.description.split(' ').join('_').toLocaleLowerCase();
        // data pushed to next stage
        const fordwarded = await forwardStage(stgDesc, currentInitiativeId);
        res.json(new ResponseHandler('Replication data', fordwarded));
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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

    const { title, link, table_name, col_name, citationId, active } = req.body;

    // get initiative by stage id from client
    const { initiativeId, stageId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {
        const stage = await stageRepo.findOne(stageId);
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Add link: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        const initiative = new InitiativeStageHandler(initvStg.id + '');

        const addedLink = await initiative.addLink(title, link, table_name, col_name, citationId, active);

        res.json(new ResponseHandler('Initiatives:Add link.', { addedLink }));
    } catch (error) {
        console.log(error)
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

    const { table_name, col_name, active } = req.body;

    // get initiative by stage id from client
    const { initiativeId, stageId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        const stage = await stageRepo.findOne(stageId);
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Add link: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        const initiative = new InitiativeStageHandler(initvStg.id + '');

        const getLinks = await initiative.getLink(table_name, col_name, active);

        res.json(new ResponseHandler('Initiatives:Get link.', { getLinks }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}


/**
 * 
 * @param req params:{ value:number, table_name: string, col_name: string, budgetId?: string }
 * @param res 
 */
export async function addBudget(req: Request, res: Response) {

    const { value, table_name, col_name, budgetId, active } = req.body;

    // get initiative by stage id from client
    const { initiativeId, stageId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        const stage = await stageRepo.findOne(stageId);
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Add Budget: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        const initiative = new InitiativeStageHandler(initvStg.id + '');

        const addedBudget = await initiative.addBudget(value, table_name, col_name, budgetId, active);

        res.json(new ResponseHandler('Initiatives:Add Budget.', { addedBudget }));
    } catch (error) {
        console.log(error)
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

    const { table_name, col_name, active } = req.body;

    // get initiative by stage id from client
    const { initiativeId, stageId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        const stage = await stageRepo.findOne(stageId);
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Get budget: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        const initiative = new InitiativeStageHandler(initvStg.id + '');

        const getBudget = await initiative.getBudget(table_name, col_name, active);

        res.json(new ResponseHandler('Initiatives:Get budget.', { getBudget }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}


export async function removeBudget(req: Request, res: Response) {

    const { budgetId } = req.params;

    try {

        const initiative = new InitiativeStageHandler();

        const removeBudget = await initiative.removeBudget(budgetId);

        res.json(new ResponseHandler('Initiatives:Remove budget.', { removeBudget }));

    } catch (error) {

        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * All Initiatives 
 * @param req 
 * @param res 
 */
export async function getInitiatives(req: Request, res: Response) {

    try {
        // const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
        //     initvSQL,
        //     { userId },
        //     {}
        // );


        // let initvs:Initiatives = new Initiatives();
        // initvs = await queryRunner.connection.query(query, parameters);
        // initiatives = await queryRunner.query(initvSQL);

        // create new Meta Data object
        const initiativeshandler = new InitiativeHandler();

        // Get active initiatives and detail
        let initiatives = await initiativeshandler.getAllInitiatives();

        if (initiatives.length == 0)

            res.json(new ResponseHandler('All Initiatives.', { initiatives: [] }));

        else {

            res.json(new ResponseHandler('All Initiatives.', { initiatives }));

        }

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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


    const { userId } = res.locals.jwtPayload;
    const queryRunner = getConnection().createQueryBuilder();
    const conceptRepo = getRepository(Narratives);

    let initiatives,
        initvSQL = ` 
        SELECT
            initvStg.id AS initvStgId,
            stage.description AS currentStage,
            stage.id AS currentStageId,
            initiative.name AS initiativeName,
            initvStg.active AS initvStageIsActive,
            initvStg.status AS initvStageStatus,
            (SELECT id FROM stages WHERE active = true) AS activeStageId,
            (SELECT description FROM stages WHERE active = true) AS activeStageName           

        FROM
            initiatives_by_users initvStgUsr
        LEFT JOIN initiatives_by_stages initvStg ON initvStg.initiativeId = initvStgUsr.initiativeId
        LEFT JOIN stages stage ON stage.id = initvStg.stageId
        LEFT JOIN initiatives initiative ON initiative.id = initvStg.initiativeId
        WHERE
            initvStgUsr.userId = ${userId}
    `;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            initvSQL,
            {},
            {}
        );
        initiatives = await queryRunner.connection.query(query, parameters);
        let initiativesIds = initiatives.map(init => init.initvStgId);
        if (initiatives.length == 0)
            res.sendStatus(204)
        else {
            /**
             * more stages to be added
             */
            const concepts = await conceptRepo.find({
                where: {
                    initvStg: In(initiativesIds)
                },
                relations: ['initvStg'],
                select: ["name", "action_area_description", "action_area_id"]

            });
            initiatives.forEach(initiative => {
                initiative['concept'] = concepts.find(c => { return (c.initvStg.id === initiative.initvStgId) ? c.initvStg : null });
            });
            /**
             * more stages to be added
             */
            res.json(new ResponseHandler('User Initiatives.', { initiatives }));

        }

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
export const getUserRoleByInitiative = async (req: Request, res: Response) => {
    const { initiativeId } = req.params;
    const { userId } = res.locals.jwtPayload;
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
        WHERE initvUsr.initiativeId = :initiativeId
        AND initvUsr.active = TRUE
        AND initvUsr.userId = :userId
    `;

    let roles;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            querySql,
            { initiativeId, userId },
            {}
        );
        roles = await queryRunner.connection.query(query, parameters);
        res.json(new ResponseHandler('User roles by Initiative.', { roles }));
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
export const getUsersByInitiative = async (req: Request, res: Response) => {
    const { initiativeId } = req.params;
    try {
        const initiativeshandler = new InitiativeHandler();
        const users = await initiativeshandler.getUsersByInitiative(initiativeId);
        res.json(new ResponseHandler('Users by Initiative.', { users }));
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @param req params:{ userId, roleId }
 * @param res 
 */
export const assignUsersByInitiative = async (req: Request, res: Response) => {
    const { userId, roleId, active } = req.body;
    const { initiativeId } = req.params;
    const initvUsrsRepo = getRepository(InitiativesByUsers);
    const initiativesRepo = getRepository(Initiatives);
    const userRepo = getRepository(Users);
    const rolesRepo = getRepository(Roles);
    let newUsrByInitv: InitiativesByUsers;
    try {

        let usersByInitiative = await initvUsrsRepo.find({ where: { initiative: initiativeId }, relations: ['role', 'user'] });
        const user = await userRepo.findOne(userId);
        const initiative = await initiativesRepo.findOne(initiativeId);

        const role = await rolesRepo.findOne(roleId);
        const leadRole = await rolesRepo.findOne({ where: { acronym: 'SGD' } });
        const coLeadRole = await rolesRepo.findOne({ where: { acronym: 'PI' } });
        const coordinatorRole = await rolesRepo.findOne({ where: { acronym: 'CO' } });


        if (role.acronym == 'ADM') {
            throw new APIError(
                'UNAUTHORIZED',
                HttpStatusCode.UNAUTHORIZED,
                true,
                'Role not accesible.'
            );
        }

        if (usersByInitiative.length > 0) {

            newUsrByInitv = new InitiativesByUsers();
            newUsrByInitv.active = active;
            newUsrByInitv.role = role;
            newUsrByInitv.user = user;
            newUsrByInitv.initiative = initiative;

            if (role.acronym == 'SGD') {
                usersByInitiative.forEach(initvUsr => {
                    if (user.id != initvUsr.user.id) {
                        initvUsr.role = (initvUsr.role && initvUsr.role.acronym == 'SGD') ? coordinatorRole : initvUsr.role;
                    } else {
                        newUsrByInitv.id = initvUsr.id;
                    }
                });
            } else if (role.acronym == 'PI') {
                usersByInitiative.forEach(initvUsr => {
                    if (user.id != initvUsr.user.id) {
                        initvUsr.role = (initvUsr.role && initvUsr.role.acronym == 'PI') ? coordinatorRole : initvUsr.role;
                    } else {
                        newUsrByInitv.id = initvUsr.id;
                    }
                });
            } else {
                usersByInitiative.forEach(initvUsr => {
                    if (user.id != initvUsr.user.id) {
                        initvUsr.role = (initvUsr.role && initvUsr.role.acronym == 'CO') ? coordinatorRole : initvUsr.role;
                    } else {
                        newUsrByInitv.id = initvUsr.id;
                    }
                });
            }

            usersByInitiative = await initvUsrsRepo.save(usersByInitiative);
            newUsrByInitv = await initvUsrsRepo.save(newUsrByInitv);

        }
        else {
            newUsrByInitv = new InitiativesByUsers();
            newUsrByInitv.active = active;
            newUsrByInitv.role = role;
            newUsrByInitv.user = user;
            newUsrByInitv.initiative = initiative;

            newUsrByInitv = await initvUsrsRepo.save(newUsrByInitv);
        }

        res.json(new ResponseHandler('Assigned user to intiative', { assignedUser: newUsrByInitv }));

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @param req body:{ name, user, current_stage }
 * @param res 
 */
export const createInitiative = async (req: Request, res: Response) => {
    const { name, user, current_stage } = req.body;
    const userRepository = getRepository(Users);
    const initiativesRepository = getRepository(Initiatives);
    const initiativesByUsersRepository = getRepository(InitiativesByUsers);
    const initiativesByStagesRepository = getRepository(InitiativesByStages);
    const stageRepository = getRepository(Stages);

    const initiative = new Initiatives();
    const initByUsr = new InitiativesByUsers();
    const newInitStg = new InitiativesByStages();
    initiative.name = name;

    try {
        const errors = await validate(initiative);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const userDB = await userRepository.findOne({
            select: ['id'],
            where: { id: user },
            order: { created_at: "ASC" },
        });

        if (userDB) {
            let createdInitiative = await initiativesRepository.save(initiative);
            initByUsr.initiative = createdInitiative;
            initByUsr.user = userDB;
            // initByUsr.is_coordinator = is_coordinator;
            // initByUsr.is_lead = is_lead;
            // initByUsr.is_owner = is_owner;
            if (current_stage) {
                let sltdStage = await stageRepository.findOne(current_stage);
                newInitStg.initiative = createdInitiative;
                newInitStg.stage = sltdStage;
                let result = await initiativesByStagesRepository.save(newInitStg);
            }

            let createdIniByUsr = await initiativesByUsersRepository.save(initByUsr);
            res.json({ msg: 'Initiative created', data: { createdInitiative, initiative_by_stage: newInitStg } });
        }
        else
            return res.status(400).json({ data: userDB, msg: 'None user found' });

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @param res stages , stagesMeta
 */
export const getStage = async (req: Request, res: Response) => {

    const stageRepo = getRepository(Stages);
    const stageMetaRepo = getRepository(StagesMeta);

    try {
        let stages = await stageRepo.find();
        let stagesMeta = await stageMetaRepo.find({ where: { stage: In(stages.map(stage => stage.id)) }, order: { order: 'ASC' } });

        res.json(new ResponseHandler('Stages.', { stages, stagesMeta }));
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @param req stageId
 * @param res stageMeta
 */
export const getStageMeta = async (req: Request, res: Response) => {

    // get stage id from params
    const { initiativeId } = req.params
    const stageMetaRepo = getRepository(StagesMeta);
    const initvStgRepo = getRepository(InitiativesByStages);

    try {
        console.log(initiativeId)
        const initvStg = await initvStgRepo.findOne({ where: { id: initiativeId }, relations: ['stage'] });
        let stagesMeta = await stageMetaRepo.find({ where: { stage: initvStg.stage }, order: { order: 'ASC' } });

        const stgDesc = initvStg.stage.description.split(' ').join('_').toLocaleLowerCase();
        const validatedSections = await validatedSection(initvStg.id, stgDesc);
        res.json(new ResponseHandler('Stages meta.', { stagesMeta, validatedSections }));
    } catch (error) {
        console.log(error);
        error = new BaseError('Get stages meta - sections.', error.status || 400, error.message, false);
        return res.status(error.httpCode).json(error);
    }
}

/**
 * 
 * @param req params:{ description, active, start_date, end_date }
 * @param res 
 */
export const createStage = async (req: Request, res: Response) => {

    const { description, active, start_date, end_date } = req.body;
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
        res.json({ msg: 'Stage created', data: createdStage });
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @param req params:{ stageInitiativeId, stageId, stageData }
 * @param res 
 */
export const assignStageToInitiative = async (req: Request, res: Response) => {

    const { stageInitiativeId, stageId, stageData } = req.body;

    const stageRepo = getRepository(Stages);
    const stageByInitiRepo = getRepository(InitiativesByStages);
    const qN = getConnection().createQueryRunner();

    /**
     * 
     * 
     */

    try {

        let stage = await stageRepo.findOneOrFail(stageId);
        let tableName = `${stage.description.split(' ').join('_').toLocaleLowerCase()}_info`;
        let initiativeStage = await stageByInitiRepo.findOneOrFail(stageInitiativeId);
        let newData = getRepoConstStage(`${stage.description.split(' ').join('_').toLocaleLowerCase()}`);
        newData.initvStg = initiativeStage;

        const columns = (await qN.getTable(tableName)!).columns.map(c => c.name);
        const tableRepo = getConnection().manager;


        if (columns.length > 0) {
            columns.forEach(ele => {
                if (ele === 'initvStgId') {
                    newData[ele] = initiativeStage;
                }
                else if (ele !== 'created_at' && ele !== 'updated_at' && ele !== 'id') {
                    newData[ele] = stageData[ele]
                }
            });

            // console.log(newData);
            const insertedData = await tableRepo.save(newData);
            res.json({ msg: `${stage.description} stage data has been saved `, data: insertedData });

        } else {
            return res.status(400).json({ msg: 'None stage schema found.' });
        }
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
                'Bad Request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }
        return res.status(error.httpCode).json(error);
    }

}

export const assignTOCsByInitvStg = async (req: Request, res: Response) => {
    const { url, initvStgId, narrative } = req.body;
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
        res.json({ msg: 'TOC file assigned to initiative by stage', data: createdtocFile });

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @returns depthScale
 */
export async function getDepthScale(req: Request, res: Response) {

    const { impactIndicatorId } = req.params
    const initiativeshandler = new InitiativeHandler();

    try {

        let depthScale = await initiativeshandler.requestDepthScale(impactIndicatorId);

        res.json(new ResponseHandler('Get Depth Scale.', { depthScale }));

    } catch (error) {

        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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

    const { impactIndicatorId } = req.params
    const initiativeshandler = new InitiativeHandler();

    try {

        let depthDescription = await initiativeshandler.requestDepthDescription(impactIndicatorId);

        res.json(new ResponseHandler('Get Depth Description.', { depthDescription }));

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
                'Bad Request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }
        return res.status(error.httpCode).json(error);

    }
}


export async function getProjectedProbabilities(req: Request, res: Response) {

    const initiativeshandler = new InitiativeHandler();

    try {

        let projectedProbabilities = await initiativeshandler.requestProjectedProbabilities();

        res.json(new ResponseHandler('Get Projected Probabilites.', { projectedProbabilities }));

    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * CLARISA getters
 * 
 */

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */

export const getActionAreas = async (req: Request, res: Response) => {
    try {
        const actionAreas = await getClaActionAreas();
        res.json(new ResponseHandler('Action areas.', { actionAreas }));
    } catch (error) {
        console.log(error);
        let e = error;
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            e = new APIError(
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
 * @returns 
 */

export const getCountries = async (req: Request, res: Response) => {
    try {
        const countries = await getClaCountries();
        res.json(new ResponseHandler('Countries.', { countries }));
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

export const getRegions = async (req: Request, res: Response) => {
    try {
        const regions = await getClaRegions();
        res.json(new ResponseHandler('Regions.', { regions }));
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

export const getInstitutions = async (req: Request, res: Response) => {
    try {
        const institutions = await getClaInstitutions();
        res.json(new ResponseHandler('Institutions.', { regions: institutions }));
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

export const getInstitutionsTypes = async (req: Request, res: Response) => {
    try {
        const institutionsTypes = await getClaInstitutionsTypes();
        res.json(new ResponseHandler('Institutions types.', { regions: institutionsTypes }));
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

export const getCRP = async (req: Request, res: Response) => {
    try {
        const crps = await getClaCRPs();
        res.json(new ResponseHandler('CGIAR entities.', { crps }));
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

export const requestInstitution = async (req: Request, res: Response) => {
    try {
        const institutionRequested = await requestClaInstitution(req.body);
        res.json(new ResponseHandler('Requested institution.', { institutionRequested }));
    } catch (error) {
        console.log(error);
        return res.status(error.httpCode).json(error);
    }
}


export async function requestImpactAreas(req: Request, res: Response) {

    try {
        const impactAreasRequested = await getImpactAreas();
        res.json(new ResponseHandler('Requested Impact areas.', { impactAreasRequested }));
    } catch (error) {
        console.log(error);
        return res.status(error.httpCode).json(error);
    }

}


export async function requestImpactAreasIndicators(req: Request, res: Response) {

    try {
        const impactAreasIndicatorsRequested = await getImpactAreasIndicators();
        res.json(new ResponseHandler('Requested Impact areas indicators.', { impactAreasIndicatorsRequested }));
    } catch (error) {
        console.log(error);
        return res.status(error.httpCode).json(error);
    }

}


function getRepoConstStage(tableName: string) {
    switch (tableName) {
        case 'pre_concept':
            return null;
            break;
        case 'concept':
            return new Narratives();
            break;
        case 'full_proposal':
            return null;
            break;

        default:
            break;
    }
}

