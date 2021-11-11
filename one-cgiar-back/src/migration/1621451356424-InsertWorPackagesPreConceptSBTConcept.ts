import { validate, ValidationError } from "class-validator";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { Stages } from "../entity/Stages";
import { WorkPackages } from "../entity/WorkPackages";
import { APIError } from "../handlers/BaseError";
import { HttpStatusCode } from "../interfaces/Constants";
import { ExcelUtil } from "../utils/excel-util";


const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

//  --- 1621436229812
// 1621451356424
export class InsertWorPackagesPreConceptSBTConcept1621451356424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
        const wpRepo = getRepository(WorkPackages);
        const initvStageRepo = getRepository(InitiativesByStages);

        
        /**
        * read excel file
        */
        const wb = new ExcelUtil(parentD + fileName);
        const wSheet = await wb.readWorkSheet('work_packages');


        /**
         * Iterate over excel rows
         */
        let WP = []
        for (let index = 2; index <= wSheet.rowCount; index++) {
            // get initiative id and WP information from excel file
            const initvId = wb.getCellInRowByColumnHeader(wSheet, index, 'initiative_id').value.toString();
            let tlt = wb.getCellInRowByColumnHeader(wSheet, index, 'title').value.toString();
            const acronym = `Work Package ${wb.getCellInRowByColumnHeader(wSheet, index, 'Work Package').value.toString()}`;// wb.getCellInRowByColumnHeader(wSheet, index, 'Work Package').value
            const name = tlt;
            const pathwayContent = wb.getCellInRowByColumnHeader(wSheet, index, 'Main focus').value.toString();
            const results = wb.getCellInRowByColumnHeader(wSheet, index, 'Outcomes').value.toString();
            // const wpId = wb.getCellInRowByColumnHeader(wSheet, index, 'Work Package').value.toString();

            // get initiative by stage
            const intvStg = await initvStageRepo.findOne({ where: { initiative: initvId } });

            // create WP
            let workPackage = new WorkPackages();
            // workPackage.id = parseInt(wpId);
            workPackage.name = name || null;
            workPackage.acronym = acronym || null;
            workPackage.results = results || null;
            workPackage.pathway_content = pathwayContent || null;
            workPackage.is_global = null;

            workPackage.initvStg = intvStg;
            // validate WP
            const errors = await validate(workPackage);
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                throw new APIError(
                    'BAD REQUEST',
                    HttpStatusCode.BAD_REQUEST,
                    true,
                    message
                );
            }

            WP.push(workPackage);

        }

        let r = await wpRepo.save(WP);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
