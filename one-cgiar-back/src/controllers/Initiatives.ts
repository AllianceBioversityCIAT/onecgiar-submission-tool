import { validate } from 'class-validator';
import e, { Request, Response } from 'express'
import { getConnection, getManager, getRepository, In, QueryRunner } from 'typeorm'
import { ActionAreasByInitiativeStage } from '../entity/ActionAreasByInitiativeStage';
import { ConceptInfo } from '../entity/ConceptInfo';
import { Initiatives, InterfInfoStage } from '../entity/Initiatives'
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { KeyPartners } from '../entity/KeyPartner';
import { Stages } from '../entity/Stages';
import { TOCFiles } from '../entity/TOCFiles';
import { Users } from '../entity/Users';


require('dotenv').config();



/**
 * All Initiatives 
 * @param req 
 * @param res 
 */
export const getInitiatives = async (req: Request, res: Response) => {
    const initiativesRepo = getRepository(Initiatives);
    let initiatives;

    try {
        initiatives = await initiativesRepo.find({ relations: ['initvByStages', 'initvByStages.stage', 'userByStages', 'userByStages.user'] });
        res.status(200).json({ data: initiatives, msg: 'All Initiatives' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get any initiatives." });
    }
}

/**
 * 
 * @param req params:userId
 * @param res 
 */
export const getInitiativesByUser = async (req: Request, res: Response) => {


    const { userId } = req.params;
    const queryRunner = getConnection().createQueryBuilder();
    const conceptRepo = getRepository(ConceptInfo);

    let initiatives,
        initvSQL =` 
        SELECT
            initvStg.id AS initvStgId,
            stage.description AS currentStage,
            stage.id AS currentStageId,
            initvStg.active AS initvStageIsActive,
            initvStg.status AS initvStageStatus,
            initvStgUsr.is_coordinator AS isCoordinator,
            initvStgUsr.is_lead AS isLead,
            initvStgUsr.is_owner AS isOwner

        FROM
            initiatives_by_users initvStgUsr
        LEFT JOIN initiatives_by_stages initvStg ON initvStg.initiativeId = initvStgUsr.initiativeId
        LEFT JOIN stages stage ON stage.id = initvStg.stageId
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
        res.status(200).json({ data: initiatives, msg: 'All Initiatives' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get any initiatives." });
    }
}


/**
 * 
 * @param req params:{ name, user, is_coordinator, is_lead, is_owner, current_stage }
 * @param res 
 */
export const createInitiative = async (req: Request, res: Response) => {
    const { name, user, is_coordinator, is_lead, is_owner, current_stage } = req.body;
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
            initByUsr.is_coordinator = is_coordinator;
            initByUsr.is_lead = is_lead;
            initByUsr.is_owner = is_owner;
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
        res.status(404).json({ msg: "Could not create initiatives." });
    }
}


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
        res.status(404).json({ msg: "Could not create initiatives." });
    }
}


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
            // let values: Record<string, any> = {};
            columns.forEach(ele => {
                // let ele = e;
                // console.log(newEmptyEntity[ele] = stageData[ele]);
                if (ele === 'initvStgId') {
                    newData[ele] = initiativeStage;
                }
                else if (ele !== 'created_at' && ele !== 'updated_at' && ele !== 'id') {
                    newData[ele] = stageData[ele]
                }
            });

            console.log(newData);
            const insertedData = await tableRepo.save(newData);
            // const insertedData = await tableRepo.save(newEmptyEntity);

            console.log(insertedData)
            res.json({ msg: `${stage.description} stage data has been saved `, data: insertedData });

        } else {
            return res.status(400).json({ msg: 'None stage schema found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not assign stage to initiative.", data: error });
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

    const { action_area_id, initiative_by_stage_id } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const actArsRepo = getRepository(ActionAreasByInitiativeStage);

    const actionArea = new ActionAreasByInitiativeStage();
    actionArea.action_area_id = action_area_id;
    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initiative_by_stage_id);
        actionArea.initvStg = initiativeStg;

        const errors = await validate(actionArea);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let createdActionArea = await actArsRepo.save(actionArea);
        res.json({ msg: 'Action area assigned to initiative by stage', data: createdActionArea });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not assign action area to initiative stage." });
    }

}

export const assignKeyPartnerByInitvStg = async (req: Request, res: Response) => {
    const { key_partner_id, initiative_by_stage_id, toc_description, comparative_advantage } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const keyPartnesRepo = getRepository(KeyPartners);

    const keyPartner = new KeyPartners();
    keyPartner.key_partner_id = key_partner_id;
    keyPartner.toc_description = toc_description;
    keyPartner.comparative_advantage = comparative_advantage;

    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initiative_by_stage_id);
        keyPartner.initvStg = initiativeStg;

        const errors = await validate(keyPartner);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let createdkeyPartner = await keyPartnesRepo.save(keyPartner);
        res.json({ msg: 'Key partner assigned to initiative by stage', data: createdkeyPartner });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not assign key partner to initiative stage." });
    }
}

export const assignTOCFilesByInitvStg = async (req: Request, res: Response) => {
    const { url, initiative_by_stage_id, narrative } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const tocFilesRepo = getRepository(TOCFiles);

    const tocFile = new TOCFiles();
    tocFile.url = url;
    tocFile.narrative = narrative;
    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initiative_by_stage_id);
        tocFile.initvStg = initiativeStg;

        const errors = await validate(tocFile);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let createdtocFile = await tocFilesRepo.save(tocFile);
        res.json({ msg: 'TOC file assigned to initiative by stage', data: createdtocFile });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not assign TOC file to initiative stage." });
    }


}


