import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ConceptInfo } from "../entity/ConceptInfo";
import { Initiatives } from "../entity/Initiatives";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { Stages } from "../entity/Stages";
import { ExcelUtil } from "../utils/excel-util";

// import { Users } from "../entity/Users";
// import * as fs from 'fs';


const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

//1620397182889
//1620334100488

export class InsertPreConceDataInSBTConceptGeneralInformation1620397182889 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
        const conceptRepo = getRepository(ConceptInfo);
        const stageRepo = getRepository(Stages);
        const initvStageRepo = getRepository(InitiativesByStages);
        try {

            /**
             * Get concept stage
             */
            const concept = await stageRepo.findOne({ where: { description: 'Concept' } });


            /**
             * CLARISA Action Areas
             */
            const actionAreas = [
                { name: 'Systems Transformation', acronym: 'ST', code: 1 },
                { name: 'Resilient Agrifood Systems', acronym: 'RAFS', code: 2 },
                { name: 'Genetic Innovation', acronym: 'GI', code: 3 },
            ]

            /**
             * SBT DB initiatives
             */
            const sqlQuery = `  SELECT * FROM initiatives`;

            const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(sqlQuery, {}, {});
            const initiatives = await queryRunner.connection.query(query, parameters);
            /**
             * read excel file
             */
            const wb = new ExcelUtil(parentD + fileName);
            const wSheet = await wb.readWorkSheet('initiatives');
            /**
             * Concept info array
             */
            let newConceptInfos = [];

            /**
             * Iterate over initiatives to create: initiative by stage and concept info data
             */
            // console.log(initiatives.length)
            for (let index = 0; index < initiatives.length; index++) {
                /** initiaitives item */
                const initiative: Initiatives = initiatives[index];

                /**
                 * create initiative by stage
                 */
                let initvStg = new InitiativesByStages();
                initvStg.id = initiative.id;
                initvStg.stage = concept;
                initvStg.initiative = initiative;
                /**
                 * save initiative by stage
                 */
                initvStg = await initvStageRepo.save(initvStg);

                /**
                 * create concept info
                 */
                let newConceptInfo = new ConceptInfo();
                newConceptInfo.name = initiative.name;
                newConceptInfo.id = initiative.id;
                newConceptInfo.initvStg = initvStg;


                /**
                 * Assign action area
                 */
                let excelAA = wb.getCellInRowByColumnHeader(wSheet, index + 1, 'AA_Code') ? wb.getCellInRowByColumnHeader(wSheet, index + 1, 'AA_Code').value : null;
                if (excelAA) {
                    const clarisaAA = actionAreas.find(AA => excelAA.toString().includes(AA.acronym));
                    newConceptInfo.action_area_description = clarisaAA ? clarisaAA.name : null;
                    newConceptInfo.action_area_id = clarisaAA ? clarisaAA.code : null;
                    
                    newConceptInfos.push(newConceptInfo)
                }
            }
            let r = await conceptRepo.save(newConceptInfos);

        } catch (error) {
            console.log(error);
        }


    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
