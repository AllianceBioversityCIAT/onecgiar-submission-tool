import axios from 'axios';
import {Request, Response} from 'express';
import {TocServicesResults} from '../services/TocServicesResult'


/**
 *GET TOC Result Dashboard
 * @returns toc Result Dashboard
 */

export async function getTocResultDashboard(req: Request,res: Response) {
  
  const id_toc = req.body.id_toc;
  let tocHost = 'https://toc.loc.codeobia.com/api/toc/'+id_toc+'/dashboard-result';
    console.log(tocHost);
    try {      
      let servicesInformation = new TocServicesResults();
      console.log(tocHost);
        const narrative = await axios.get(tocHost);
          const message = await servicesInformation.splitInformation(narrative.data)
         res.json({response: message})
          
      } catch (error) {
        
        console.log(error.response);
      return res.status(error.response.status).json(error.response.data);
      }
}
