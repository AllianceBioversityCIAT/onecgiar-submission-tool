import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { DepthScales } from '../entity/DepthScales'

export class InsertDepthScales1631111926064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const depthScalesRepo = getRepository(DepthScales);

        const depthScalesData = depthScalesRepo.create([

            {
                id: 1,
                name: 'Income',
                active:true
            },

            {
                id: 2,
                name: 'Health',
                active:true
            },

            {
                id: 3,
                name: 'Other (Annex 2)',
                active:true
            },

            {
                id: 4,
                name: 'Not Applicable',
                active:true
            },

        ]);

        const res = await depthScalesRepo.save(depthScalesData);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
