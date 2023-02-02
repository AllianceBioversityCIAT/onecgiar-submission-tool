import axios from 'axios';
import {Request, Response} from 'express';
import {TocServicesResults} from '../services/TocServicesResult'
const tocHost = 'https://toc.loc.codeobia.com/api/toc/16c17bd0-0d40-423f-aa90-6572034d95da/dashboard-result';

/**
 *GET TOC Result Dashboard
 * @returns toc Result Dashboard
 */

export async function getTocResultDashboard(req: Request,res: Response) {
    try {
      let servicesInformation = new TocServicesResults();
        const narrative = await axios.get(tocHost);
          const message = await servicesInformation.splitInformation(narrative.data)
         res.json({response: message})
          
      } catch (error) {
        
        return {
          error:'Not exists information'
        };
      }
}
