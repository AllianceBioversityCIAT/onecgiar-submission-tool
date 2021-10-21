import { BaseError } from "../handlers/BaseError";
import axios from 'axios';
import { Request, Response } from 'express';


const tocHost = 'https://dev-toc.s3.us-east-2.amazonaws.com/toc_';


/**
 * 
 * @returns toc narrative
 */


export async function getTocNarrative(req: Request, res: Response) {

    const tocId = req.params.TocId;

    try {
        const narrative = await axios.get(tocHost + tocId + '/' + tocId +'.txt');

        res.json({ TocNarrative: narrative.data })

    } catch (error) {
        console.log(error)
        throw new BaseError('TOC : narrative', 400, error.message, true);
    }

}