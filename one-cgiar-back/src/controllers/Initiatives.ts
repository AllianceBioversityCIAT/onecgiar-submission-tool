import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getRepository, In } from 'typeorm'
import { ActionAreasByInitiativeStage } from '../entity/ActionAreasByInitiativeStage';
import { Initiatives } from '../entity/Initiatives'
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { KeyPartners } from '../entity/KeyPartner';
import { Stages } from '../entity/Stages';
import { TOCFiles } from '../entity/TOCFiles';
import { Users } from '../entity/Users';

export const getInitiatives = async (req: Request, res: Response) => {
    const initiativesRepo = getRepository(Initiatives);
    let initiatives;

    try {
        initiatives = await initiativesRepo.find();
        res.status(200).json({ data: initiatives, msg: 'All Initiatives' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get any initiatives." });
    }
}

export const createInitiative = async (req: Request, res: Response) => {
    const { name, user, is_coordinator, is_lead, is_owner } = req.body;
    const userRepository = getRepository(Users);
    const initiativesRepository = getRepository(Initiatives);
    const initiativesByUsersRepository = getRepository(InitiativesByUsers);

    const initiative = new Initiatives();
    const initByUsr = new InitiativesByUsers();
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

            let createdIniByUsr = await initiativesByUsersRepository.save(initByUsr);
            res.json({ msg: 'Initiative created', data: createdInitiative });
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

    const { stageId, initiativeId } = req.body;
    const stageRepo = getRepository(Stages);
    const initiativeRepo = getRepository(Initiatives);
    const stageByInitiRepo = getRepository(InitiativesByStages);
    const stageInitiative = new InitiativesByStages();

    try {

        let stage = await stageRepo.findOneOrFail(stageId);
        let initiative = await initiativeRepo.findOneOrFail(initiativeId);
        stageInitiative.initiative = initiative;
        stageInitiative.stage = stage;
        const errors = await validate(stageInitiative);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let assignedStageToInit = await stageByInitiRepo.save(stageInitiative);
        res.json({ msg: 'Stage assigned to Initiative', data: assignedStageToInit });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not assign stage to initiative." });
    }

}

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