import {MigrationInterface, QueryRunner} from "typeorm";

export class FinancialResourcesReplica1659449463319 implements MigrationInterface {
    name = 'FinancialResourcesReplica1659449463319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into financial_resources 
                                             (initvStgId,
                                                financial_type,
                                                active,
                                                financial_type_id,
                                                table_name,
                                                col_name) 
                                        select res.id as initvStgId, 
                                               fr.financial_type, 
                                               fr.active, 
                                               fr.financial_type_id, 
                                               fr.table_name, 
                                               fr.col_name  
                                        from financial_resources fr 
                                            inner join initiatives_by_stages ibs on ibs.id = fr.initvStgId 
                                                                                 and ibs.stageId = 3
                                            inner join (select ibs2.id, ibs2.initiativeId 
                                                        from initiatives_by_stages ibs2 
                                                        where ibs2.stageId = 4) res on res.initiativeId = ibs.initiativeId;`);
        await queryRunner.query(`insert into financial_resources_years 
                                             (value,
                                                year,
                                                financialResourcesId,
                                                active)
                                        select fry.value , fry.year, res.id as financialResourcesId, fry.active  
                                        from financial_resources_years fry 
                                            inner join financial_resources fr on fr.id = fry.financialResourcesId 
                                            inner join initiatives_by_stages ibs on ibs.id = fr.initvStgId 
                                                                                and ibs.stageId = 3
                                            left join (select ibs.initiativeId, fr.id, fr.initvStgId, fr.col_name, fr.table_name, fr.financial_type_id 
                                                        from financial_resources fr 
                                                        inner join initiatives_by_stages ibs on ibs.id = fr.initvStgId 
                                                                                and ibs.stageId = 4) res on res.initiativeId = ibs.initiativeId 
                                                                                                         and if(fr.financial_type_id is null, true, res.financial_type_id = fr.financial_type_id)
                                                                                                         and res.table_name = fr.table_name
                                                                                                         and res.col_name = fr.col_name;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
