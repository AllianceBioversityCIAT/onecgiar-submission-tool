import {MigrationInterface, QueryRunner,getRepository} from "typeorm";
import { DepthDescriptions } from '../entity/DepthDescriptions'

export class InsertDepthDescriptions1631112569328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const depthDescriptionsRepo = getRepository(DepthDescriptions);

        const depthDescriptionsData = depthDescriptionsRepo.create([   
            {
                id: 1,
                name: 'Life saving',
                active:true
            },
            {
                id: 2,
                name: 'Transformative',
                active:true
            },
            {
                id: 3,
                name: 'Substantial',
                active:true
            },
            {
                id: 4,
                name: 'Significant',
                active:true
            },
            {
                id: 5,
                name: 'Perceptible',
                active:true
            },
            {
                id: 6,
                name: 'Not applicable',
                active:true
            },

        ]);

        const res = await depthDescriptionsRepo.save(depthDescriptionsData);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
