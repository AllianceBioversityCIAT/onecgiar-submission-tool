import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
const multer = require("multer");
const fs = require('fs');
const mkdirp = require('mkdirp')


// const pth = require('path').resolve(process.cwd(), '../');
import pth from 'path';
const parentD = `./public/uploads`;



export const createFolder = async (dir: string) => {
    try {
        if (!fs.existsSync(dir)) {
            await mkdirp(dir)
            // shell.mkdir('-p', dir+'/');
        }

        return dir
    } catch (error) {
        console.log(error)
    }
}

export const startMulter = async (parentpath?: string) => {
    try {
        if (parentpath) {
            await createFolder(`${parentpath}/uploads/${new Date().getFullYear()}`);
        }

    } catch (error) {
        return error
    }
}


// const storage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         let { finalPath, _path } = await validateSubFolder(JSON.parse(JSON.stringify(req.body)));
//         req.body.path = _path;
//         cb(null, `${finalPath}`);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });


var storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { initiativeId, ubication, stageId } = req.params;
        let finalPath = await createFolder(parentD + '/INIT-' + initiativeId + '/' + ubication + '/' + 'stage-' + stageId);
        cb(null, finalPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

export let uploadFile = multer({ storage: storage });

const validateSubFolder = async (body: object) => {
    const initvStgRepo = getRepository(InitiativesByStages);
    let finalPath, _path;
    try {
        if (body.hasOwnProperty('initvStgId')) {
            const initvStg = await initvStgRepo.findOne(body['initvStgId'], { relations: ['initiative', 'stage'] });
            _path = `${new Date().getFullYear()}/initiatives/${initvStg.initiative.id}/${initvStg.stage.description.split(' ').join('-').toLowerCase()}/${body['section']}/${body['id']}`;
        } else {
            _path = `default`;
        }
        finalPath = `${parentD}/${_path}`
        body['path'] = _path
        await createFolder(finalPath);
        return { finalPath, _path };
    } catch (error) {
        console.log(error)
        return error;
    }
}
