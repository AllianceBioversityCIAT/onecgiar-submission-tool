import {EntityRepository, getRepository, Repository} from 'typeorm';
import {ISDCResponses} from '../entity';

@EntityRepository(ISDCResponses)
export class IsdcResponsesRepository extends Repository<ISDCResponses> {
  async findIsdcFeedbackStatus(stageId) {

    try {
      const isdcFeedbackStatusQuery = `SELECT num.initvStgId, ini.official_code, ini.name, 
      CAST(count(num.num) AS UNSIGNED) as total_comments, 
      CAST(SUM(num.num) AS UNSIGNED) as responses, 
      CAST(count(num.num) - SUM(num.num) AS UNSIGNED) as pending, 
      CAST((SUM(num.num)/count(num.num))*100 AS UNSIGNED) as average
    FROM (SELECT if(REGEXP_REPLACE(REGEXP_REPLACE(updated_response,'<(\/?p)>',' '),'<([^>]+)>','') IS NULL, 0,1) as num, initvStgId
                                        FROM isdc_responses ) as num
    JOIN initiatives_by_stages ibs ON ibs.id = num.initvStgId
    JOIN initiatives ini ON ini.id = ibs.initiativeId
    where ibs.active = 1 AND ibs.stageId = ${stageId}
    group by num.initvStgId
    order by ini.id`;

      let isdcFeedbackStatus = await this.query(isdcFeedbackStatusQuery);
        return isdcFeedbackStatus;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
