import axios from "axios";
import { Request, Response } from "express";
import { TocServicesResults } from "../services/TocServicesResult";

export class tocController {

  async  getTocResultDashboard(req: Request,res: Response) {
  
    const id_toc = await req.body.id_toc;
      try {      
        let servicesInformation = new TocServicesResults();
          //console.log(narrative.data);
            
          const message = await servicesInformation.splitInformation(id_toc)
  
           res.json({response: message})
            
        } catch (error) {
          
          console.log(error.response);
        return res.status(error.response.status).json(error.response.data);
        }
  }

  async getToc(req: Request, res: Response) {
    try {
      let servicesInformation = new TocServicesResults();

      const message = await servicesInformation.queryTest(
      );

      res.json({ response: "Hello Toc", message });

    } catch (error) {
      console.log(error.response);
      return res.status(error.response.status).json(error.response.data);
    }
  }


  async getTest(req: Request, res: Response){
    try {
      let servicesInformation = new TocServicesResults();

      const message = await servicesInformation.entitiesTest(
      );

      res.json({ response: "Hello Toc", message });

    } catch (error) {
      console.log(error.response);
      return res.status(error.response.status).json(error.response.data);
    }
  }
}
