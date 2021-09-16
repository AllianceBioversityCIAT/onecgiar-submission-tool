import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Initiatives } from "../entity/Initiatives";
import { ExcelUtil } from "../utils/excel-util";

const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

export class InsertPreConceptDataInSBTConcept1620321135781 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const fileName = '20210430_initiatives_transformed_v1.1.xlsx'
        const repo = getRepository(Initiatives);

        try {
            const sqlQuery = `  SELECT * FROM excel_metadata WHERE sbt_table = 'initiatives'  `;

            const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(sqlQuery, {}, {});
            const excelMeta = await queryRunner.connection.query(query, parameters);

            const wb = new ExcelUtil(parentD + fileName);
            const wSheet = await wb.readWorkSheet('initiatives');

            let arrayObj = [];
            for (let i = 2; i <= wSheet.rowCount; i++) {
                let createObj = {};
                for (let index = 0; index < excelMeta.length; index++) {
                    const element = excelMeta[index];
                    createObj[element.sbt_col] = wb.getCellInRowByColumnHeader(wSheet, i, element.excel_col).value;
                }
                arrayObj.push(createObj)
            }
            let initiatives = repo.create(arrayObj);
            await repo.save(initiatives);
        } catch (error) {
            console.log(error)
        }
        // throw new Error('erro')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
