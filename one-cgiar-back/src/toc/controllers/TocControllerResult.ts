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
        const narrative =  await axios({
          method: 'get',
          url: 'https://toc.loc.codeobia.com/api/toc/28a54f3f-713f-4f3e-97ec-e312ed3f4b2d/dashboard-result',
          timeout: 20000 // only wait for 2s
      });
        console.log(narrative.data);
          
        const message = await servicesInformation.splitInformation(narrative.data)

         res.json({response: message})
          
      } catch (error) {
        
        console.log(error.response);
      return res.status(error.response.status).json(error.response.data);
      }
}
