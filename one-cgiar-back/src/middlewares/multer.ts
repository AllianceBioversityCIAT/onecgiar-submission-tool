import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
const multer = require("multer");
const fs = require('fs');
const mkdirp = require('mkdirp')


const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/${new Date().getFullYear()}`;



export const createFolder = async (dir: string) => {
    try {
        if (!fs.existsSync(dir)) {
            await mkdirp(dir)
            // shell.mkdir('-p', dir+'/');
        }
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


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let _path = await validateSubFolder(JSON.parse(JSON.stringify(req.body)));
        cb(null, `${_path}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
export let uploadFile = multer({ storage: storage });

const validateSubFolder = async (body: object) => {
    const initvStgRepo = getRepository(InitiativesByStages);
    let finalPath;
    try {
        if (body.hasOwnProperty('initvStgId')) {
            const initvStg = await initvStgRepo.findOne(body['initvStgId'], { relations: ['initiative'] });
            finalPath = `${parentD}/initiatives/${initvStg.initiative.id}`;
            console.log(finalPath)
        } else {
            finalPath = `${parentD}/default`;
        }
        await createFolder(finalPath);
        return finalPath;
    } catch (error) {
        console.log(error)
        return error;
    }
}
