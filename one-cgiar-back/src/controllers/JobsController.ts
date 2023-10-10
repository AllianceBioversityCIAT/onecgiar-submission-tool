import axios from 'axios';
import {Request, Response} from 'express';
import * as taskClarisa from '../utils/task-clarisa';

export async function runJobs(req: Request, res: Response) {
  try {
    await taskClarisa.Main();
    res.json({response: `Jobs executed`});
  } catch (error) {
    console.log(error.response.data);
    return res.status(error.response.status).json(error.response.data);
  }
}
