import {EntityRepository, getRepository, Repository} from 'typeorm';
import {TOCs} from '../entity';

@EntityRepository(TOCs)
export class TocResponsesRepository extends Repository<TOCs> {
  async findTocProgressReporting(stageId) {

    try {
      const tocProgressReportingQuery = `SELECT i.official_code, i.name, ibs.id,
      (select count(result_type_id)
               from results r2
              where r2.initvStgId  = r.initvStgId
                and result_type_id = 1
                and r2.active > 0) as output,
                  (select count(result_type_id)
               from results r2
              where r2.initvStgId  = r.initvStgId
                and result_type_id = 2
                and r2.active > 0) as outcome,
                  (select count(result_type_id)
               from results r2
              where r2.initvStgId  = r.initvStgId
                and result_type_id = 3
                and r2.active > 0) as eoi_outcome
        FROM initiatives_by_stages ibs
   left join results r  on ibs.id = r.initvStgId
   left join initiatives i on i.id = ibs.initiativeId
        WHERE ibs.active > 0 and
        ibs.stageId = ${stageId}
    GROUP by i.id
    order by i.id`;

      let tocProgressReporting = await this.query(tocProgressReportingQuery);
        return tocProgressReporting;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
