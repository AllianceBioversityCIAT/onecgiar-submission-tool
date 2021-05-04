import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import axios from 'axios';
import {  } from "../entity/ClarisaIntitutions";
import { ClarisaCountries } from "../entity/ClarisaCountries";
require('dotenv').config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}


export class InsertClarisaCountriesSBT1620162772212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const clarisaRepo = getRepository(ClarisaCountries);
        const regions = await axios.get(clarisaHost + 'countries', { headers: clarisaHeader });

        let countriesArray: ClarisaCountries[] = [];

        for (let index = 0; index < regions.data.length; index++) {
            const element = regions.data[index];
            let cla = clarisaRepo.create({
                isoAlpha2: element.isoAlpha2,
                code: element.code,
                name: element.name,
                data: element
            });
            countriesArray.push(cla)

        }

        const r = await clarisaRepo.save(countriesArray);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
