import axios from 'axios';
import {Request, Response} from 'express';

const tocHost = 'https://toc.loc.codeobia.com/api/toc/75ebe59f-457b-4574-a772-b3db2b27f9df/dashboard-result';

/**
 *GET TOC Result Dashboard
 * @returns toc Result Dashboard
 */

export async function getTocResultDashboard(req: Request,res: Response) {
    try {
        const narrative = await axios.get(tocHost);
        res.status(200).json({data: narrative.data, msg: 'All Information Toc Dashboard Result'});
      } catch (error) {
        console.log(error.response.data);
        return res.status(error.response.status).json(error.response.data);
      }
}
