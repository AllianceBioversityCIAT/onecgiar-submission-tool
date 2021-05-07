import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ConceptInfo } from "../entity/ConceptInfo";
import { Initiatives } from "../entity/Initiatives";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { Stages } from "../entity/Stages";
import { Users } from "../entity/Users";
import { ExcelUtil } from "../utils/excel-util";

import * as fs from 'fs';


const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

//1620397182889
//1620334100488

export class InsertPreConceDataInSBTConceptGeneralInformation1620397182889 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileName = '20210430_initiatives_transformed_v1.1.xlsx'
        const initvRepo = getRepository(Initiatives);
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
            console.log(initiatives.length)
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
                // initvStg = await initvStageRepo.save(initvStg);

                /**
                 * create concept info
                 */
                let newConceptInfo = new ConceptInfo();
                newConceptInfo.name = initiative.name;
                newConceptInfo.id = initiative.id;


                /**
                 * Assign action area
                 */
                let excelAA = wb.getCellInRowByColumnHeader(wSheet, index + 1, 'AA_Code').value;
                const clarisaAA = actionAreas.find(AA => excelAA.toString().includes(AA.acronym));
                if (clarisaAA) {
                    newConceptInfo.action_area_description = clarisaAA.name;
                    newConceptInfo.action_area_id = clarisaAA.code;

                }

                /**
                 * Create user if not exist
                 */
                if (index > 0) {
                    let excelLead = wb.getCellInRowByColumnHeader(wSheet, index + 1, 'PCF002_InitLeadName').value;
                    let excelLeadEmail = wb.getCellInRowByColumnHeader(wSheet, index + 1, 'PCF003_InitLeadEmail').value;
                    await this.parseUser(excelLead.toString(), excelLeadEmail.toString())
                    // console.log()
                }




                // console.log(newConceptInfo)



            }



        } catch (error) {
            console.log(error);
        }

        throw new Error;

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }


    private async parseUser(user: string, email: string) {

        console.log(email)

        /**
         * check if user already exists
         */
        const userRepo = getRepository(Users);
        const BDuser = await userRepo.findOne({ email });

        if (BDuser != null) {
            return BDuser;
        }


        /**
         * create new user
         */
        let newUser: Users = new Users()
        const [firstName, ...others] = user.split(' ');
        newUser.first_name = firstName;
        newUser.last_name = others.join(' ');
        newUser.email = email;

        /**
         * validate if is CGIAR
         */
        let rex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[cgiar]+(?:\.[a-zA-Z0-9-]+)/
        console.log(rex.test(email), email)
        newUser.is_cgiar = (rex.test(email)) ? true : false;
        newUser.password = (rex.test(email)) ? null : this.generatePassword();

        this.writeUserAndPasswords(newUser);

        /**
         * hash password
         */
        if (!newUser.is_cgiar) {
            newUser.hashPassword();
        }
        /**
         * save new user
         */
        // newUser = await userRepo.save(newUser);
        return newUser
    }

    private generatePassword() {
        return Math.random().toString(36).slice(-8);
    }

    private writeUserAndPasswords(user: Users) {
        let txt = `
        ------------------------------
        first name: ${user.first_name},
        last name: ${user.last_name},
        email: ${user.email},
        is_cgiar: ${user.is_cgiar},
        password: ${user.password},
        ------------------------------
         `;
        fs.appendFile(`${parentD}/users.txt`, txt, function (err) {
            if (err) {
                // append failed
            } else {
                // done
            }
        })
    }





}
