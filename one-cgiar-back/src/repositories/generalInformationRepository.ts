import {EntityRepository, getRepository, Repository} from 'typeorm';
import {Budget, GeneralInformation} from '../entity';

@EntityRepository(GeneralInformation)
export class GeneralInformationRepository extends Repository<GeneralInformation> {
  async requestSummary(initvStg) {
    const budgetRepo = getRepository(Budget);

    let GIquery = ` 
                SELECT
                    initvStgs.id AS initvStgId,
                    general.id AS generalInformationId,
                    IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
                    IF(general.acronym IS NULL OR general.acronym = '' , (SELECT acronym FROM initiatives WHERE id = initvStgs.initiativeId ), general.acronym) AS acronym,
                    (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
                    (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
                    (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
                
                    (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                    (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                    (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                                            
                    general.action_area_description AS action_area_description,
                    general.action_area_id AS action_area_id
                
                FROM
                    initiatives_by_stages initvStgs
                LEFT JOIN general_information general ON general.initvStgId = initvStgs.id
                
                WHERE initvStgs.id = ${initvStg.id};
            `,
      COquery = ` SELECT DISTINCT(co.country_id),
                (SELECT cc.name FROM  clarisa_countries cc WHERE cc.code = co.country_id) as name,
               co.initvStgId
               FROM countries_by_initiative_by_stage co
              WHERE co.initvStgId = ${initvStg.id}
                AND co.active = 1
                AND co.wrkPkgId IS NOT NULL
             GROUP BY co.id,co.country_id`,
      REquery = `
                SELECT DISTINCT (r.region_id),
                (SELECT cr.name FROM  clarisa_regions_cgiar cr WHERE cr.id = r.region_id) as name
                ,r.initvStgId
                  FROM regions_by_initiative_by_stage r
                 WHERE r.initvStgId = ${initvStg.id}
                   AND r.active = 1
                   AND r.wrkPkgId IS NOT NULL
                 GROUP BY r.region_id
                `;

    const gI = await this.query(GIquery);
    const regions = await this.query(REquery);
    const countries = await this.query(COquery);

    const generalInformation = gI[0];
        
    const goblalDimension = initvStg.global_dimension;

    const geoScope = {regions, countries, goblalDimension};
    
    var budget: Budget = await budgetRepo.findOne({
      where: {
        initvStg: initvStg,
        table_name: 'general_information',
        col_name: 'budget',
        active: true
      }
    });

    return {generalInformation, budget, geoScope};
  }
}