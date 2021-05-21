import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { RegionsByWorkPackages } from "../entity/RegionsByWorkPackages";
import { WorkPackages } from "../entity/WorkPackages";
import { ExcelUtil } from "../utils/excel-util";

const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;


export class InsertWorkPackageRegions1621452090913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
        const wpRepo = getRepository(WorkPackages);
        const initvStageRepo = getRepository(InitiativesByStages);

        /**
        * read excel file
        */
        const wb = new ExcelUtil(parentD + fileName);
        const rcSheet = await wb.readWorkSheet('regions_contribution');
        const rgnSheet = await wb.readWorkSheet('regions');

        let reduceInitvIds = []

        const regionsExtCode = rgnSheet.getColumn('C').values.slice(2, rgnSheet.getColumn('C').values.length);
        const unCodes = rgnSheet.getColumn('A').values.slice(2, rgnSheet.getColumn('A').values.length);
        const intiativesId = rcSheet.getColumn('A').values.slice(2, rcSheet.getColumn('A').values.length);
        const initiativesExtCode = rcSheet.getColumn('B').values.slice(2, rcSheet.getColumn('B').values.length);


        let regionsArray = []

        initiativesExtCode.forEach(async (value, i) => {
            // const initivId = intiativesId[i];
            let index = regionsExtCode.findIndex(item => item == value);
            let unCode = unCodes[index].toString();

            let regionWP ={
                active: true,
                region_id: parseInt(unCode),
                initiativeId: intiativesId[i]
            };

            regionsArray.push(regionWP);

        });

        const workPackages = await queryRunner.query(`SELECT * FROM work_packages WHERE initvStgId IN (SELECT id FROM initiatives_by_stages WHERE initiativeId IN (${intiativesId}) AND stageId = 2 )`);

        // rcSheet.eachRow(function (row, rowNumber) {
        //     if (rowNumber > 1) {
        //         console.log(row.getCell('A').value)
        //     }
        // });
        // rcSheet.getColumn('A').eachCell(function (row, rowNumber) {
        //     if (rowNumber > 1 && reduceInitvIds.indexOf(row.value.toString()) === -1) {
        //         reduceInitvIds.push(row.value.toString());
        //     }
        // });
        // const workPackages = await queryRunner.query(`SELECT * FROM work_packages WHERE initvStgId IN (SELECT id FROM initiatives_by_stages WHERE initiativeId IN (${reduceInitvIds}) AND stageId = 2 )`);
        // rcSheet.getColumn('B').eachCell(function (row, rowNumber) {
        //     if (rowNumber > 1) {
        //         const extractionCode = row.value.toString();
        //         console.log('wp', workPackages.find(wp => reduceInitvIds.indexOf(wp.initvStgId)))
        //         rgnSheet.eachRow(function (r, rN) {
        //             if (rN > 1) {
        //                 const extCode = r.getCell('C').value.toString();
        //                 if (extCode == extractionCode) {
        //                     console.log('un-code', r.getCell('A').value)
        //                 }
        //             }
        //         })
        //     }
        // });






        throw new Error('deleteme')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
