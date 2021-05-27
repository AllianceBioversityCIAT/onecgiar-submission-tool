import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getConnection, getManager, getRepository, In, QueryFailedError, QueryRunner } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { ActionAreasByInitiativeStage } from '../entity/ActionAreasByInitiativeStage';
import { ConceptInfo } from '../entity/ConceptInfo';
import { Initiatives, InterfInfoStage } from '../entity/Initiatives'
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { KeyPartners } from '../entity/KeyPartner';
import { Roles } from '../entity/Roles';
import { Stages } from '../entity/Stages';
import { StagesMeta } from '../entity/StagesMeta';
import { TOCs } from '../entity/TOCs';
import { Users } from '../entity/Users';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
import { ResponseHandler } from '../handlers/Response';
import { getClaActionAreas } from './Clarisa';


require('dotenv').config();



/**
 * All Initiatives 
 * @param req 
 * @param res 
 */
export const getInitiatives = async (req: Request, res: Response) => {

    const { userId } = res.locals.jwtPayload;

    const conceptRepo = getRepository(ConceptInfo);
    const queryRunner = getConnection().createQueryBuilder();
    let initiatives,
        initvSQL = ` 
        SELECT
            initvStg.id AS initvStgId,
            stage.description AS currentStage,
            CONCAT("Stage ", stage.id,': ',stage.description) AS currentStageName,
            stage.id AS currentStageId,
            initiative.name AS initiativeName,
            initvStg.active AS initvStageIsActive,
            IF( initvStg.status IS NULL, 'Editing', initvStg.status) AS initvStageStatus,
            (SELECT id FROM stages WHERE active = true) AS activeStageId,
            (SELECT description FROM stages WHERE active = true) AS activeStageName,

            (SELECT userId FROM initiatives_by_users WHERE userId = :userId AND active = TRUE AND initiativeId = initiative.id LIMIT 1) AS userInitiative,
            (SELECT roleId FROM initiatives_by_users WHERE userId = :userId AND active = TRUE AND initiativeId = initiative.id LIMIT 1) AS userInitiativeRole

        FROM
            initiatives initiative
        LEFT JOIN initiatives_by_stages initvStg ON initvStg.initiativeId = initiative.id
        LEFT JOIN stages stage ON stage.id = initvStg.stageId
        
        `;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            initvSQL,
            { userId },
            {}
        );
        initiatives = await queryRunner.connection.query(query, parameters);
        let initiativesIds = initiatives.map(init => init.initvStgId);
        if (initiatives.length == 0)
            // res.sendStatus(204)
            res.json(new ResponseHandler('All Initiatives.', { initiatives: [] }));
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
            // res.status(200).json({ data: initiatives, msg: 'All Initiatives' });
            res.json(new ResponseHandler('All Initiatives.', { initiatives }));

        }

    } catch (error) {
        console.log(error);
        let e;
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
    const conceptRepo = getRepository(ConceptInfo);

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
        let e;
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
        let e;
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
    const queryRunner = getConnection().createQueryBuilder();
    const querySql = `
        SELECT
            initvUsr.*, users.first_name AS first_name,
            users.last_name AS last_name,
            users.email AS email
        FROM
            initiatives_by_users initvUsr
        LEFT JOIN users users ON users.id = initvUsr.userId
        WHERE
            initiativeId = :initiativeId;
    `;

    let users;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            querySql,
            { initiativeId },
            {}
        );
        users = await queryRunner.connection.query(query, parameters);
        res.json(new ResponseHandler('Users by Initiative.', { users }));
    } catch (error) {
        console.log(error);
        let e;
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
        let e;
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
        let e;
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
        let e;
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
        const initvStg = await initvStgRepo.find({ where: { initiative: initiativeId } });
        let stagesMeta = await stageMetaRepo.find({ where: { stage: initiativeId }, order: { order: 'ASC' } });

        res.json(new ResponseHandler('Stages meta.', {  stagesMeta }));
    } catch (error) {
        console.log(error);
        let e;
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
        let e;
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
        let e;
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

function getRepoConstStage(tableName: string) {
    switch (tableName) {
        case 'pre_concept':
            return null;
            break;
        case 'concept':
            return new ConceptInfo();
            break;
        case 'full_proposal':
            return null;
            break;

        default:
            break;
    }
}



/***
 *
 *
 *
 ***/

export const assignActArsByInitvStg = async (req: Request, res: Response) => {

    const { action_area_id, initvStgId } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const actArsRepo = getRepository(ActionAreasByInitiativeStage);

    const actionArea = new ActionAreasByInitiativeStage();
    actionArea.action_area_id = action_area_id;
    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
        actionArea.initvStg = initiativeStg;

        const errors = await validate(actionArea);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let createdActionArea = await actArsRepo.save(actionArea);
        res.json({ msg: 'Action area assigned to initiative by stage', data: createdActionArea });

    } catch (error) {
        console.log(error);
        let e;
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

// export const assignKeyPartnerByInitvStg = async (req: Request, res: Response) => {
//     const { key_partner_id, initvStgId, description, comparative_advantage } = req.body;
//     const initvStgRepo = getRepository(InitiativesByStages);
//     const keyPartnesRepo = getRepository(KeyPartners);

//     const keyPartner = new KeyPartners();
//     keyPartner.key_partner_id = key_partner_id;
//     keyPartner.description = description;
//     keyPartner.comparative_advantage = comparative_advantage;

//     try {

//         // let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
//         // keyPartner.initvStg = initiativeStg;

//         const errors = await validate(keyPartner);
//         if (errors.length > 0) {
//             return res.status(400).json(errors);
//         }

//         let createdkeyPartner = await keyPartnesRepo.save(keyPartner);
//         res.json({ msg: 'Key partner assigned to initiative by stage', data: createdkeyPartner });

//     } catch (error) {
//         console.log(error);
//         res.status(404).json({ msg: "Could not assign key partner to initiative stage." });
//     }
// }

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
        let e;
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

export const getActionAreas = async (req: Request, res: Response) => {
    try {
        const actionAreas = await getClaActionAreas();
        res.json(new ResponseHandler('Action areas.', { actionAreas }));
    } catch (error) {
        console.log(error);
        let e;
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


