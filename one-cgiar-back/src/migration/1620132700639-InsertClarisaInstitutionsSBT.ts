import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import axios from 'axios';
import { ClarisaInstitutions } from "../entity/ClarisaIntitutions";
require('dotenv').config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}



export class InsertClarisaInstitutionsSBT1620132700639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const clarisaRepo = getRepository(ClarisaInstitutions);
        const institutions = await axios.get(clarisaHost + 'institutions', { headers: clarisaHeader });

        let institutionsArray: ClarisaInstitutions[] = [];

        for (let index = 0; index < institutions.data.length; index++) {
            const element = institutions.data[index];
            let cla = clarisaRepo.create({
                acronym: element.acronym,
                code: element.code,
                country_name: element.countryOfficeDTO.map(c => c.name).join(', '),
                name: element.name,
                data: element
            });
            institutionsArray.push(cla)

        }

        const r = await clarisaRepo.save(institutionsArray);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
