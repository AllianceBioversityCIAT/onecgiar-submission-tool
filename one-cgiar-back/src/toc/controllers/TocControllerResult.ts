import axios from 'axios';
import {Request, Response} from 'express';
import {TocServicesResults} from '../services/TocServicesResult'
import { TocResultServices } from '../services/TocResultServices';


/**
 *GET TOC Result Dashboard
 * @returns toc Result Dashboard
 */

export async function getTocResultDashboard(req: Request,res: Response) {
  
  const id_toc = await req.body.id_toc;
  
  let tocHost = await 'https://toc.mel.cgiar.org/api/toc/'+id_toc+'/dashboard-result';
    console.log(tocHost);
    try {      
      let servicesInformation = new TocServicesResults();
      console.log(tocHost);
        const narrative =  await axios({
          method: 'get',
          url: tocHost,
          timeout: 20000 // only wait for 2s
      });
        //console.log(narrative.data);
          
        const message = await servicesInformation.splitInformation(narrative.data, id_toc)

         res.json({response: message})
          
      } catch (error) {
        
        console.log(error.response);
      return res.status(error.response.status).json(error.response.data);
      }
}
