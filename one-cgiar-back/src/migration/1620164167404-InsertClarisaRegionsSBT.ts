import axios from "axios";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ClarisaRegions } from "../entity/ClarisaRegions";
require('dotenv').config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}

export class InsertClarisaRegionsSBT1620164167404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const clarisaRepo = getRepository(ClarisaRegions);
        const regions = await axios.get(clarisaHost + 'un-regions', { headers: clarisaHeader });

        let regionsArray: ClarisaRegions[] = [];

        for (let index = 0; index < regions.data.length; index++) {
            const element = regions.data[index];
            let cla = clarisaRepo.create({
                um49Code: element.um49Code,
                name: element.name,
                parentRegion: element
            });
            regionsArray.push(cla)

        }

        const r = await clarisaRepo.save(regionsArray);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
