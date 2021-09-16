import {MigrationInterface, QueryRunner,getRepository} from "typeorm";
import { projectedProbabilities } from '../entity/ProjectedProbabilities'

export class InsertProjectedProbabilities1631113106403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const projectedProbabilitiesRepo = getRepository(projectedProbabilities);

        const rojectedProbabilitiesData = projectedProbabilitiesRepo.create([   

            {
                id: 1,
                name: 'Very high certainty',
                description:'>80% expectation of achieving these impacts by 2030, at this point in the design process',
                active:true
            },
            {
                id: 2,
                name: 'High certainty',
                description:'60%-80% expectation of achieving these impacts by 2030, at this point',
                active:true
            },
            {
                id: 3,
                name: 'Medium certainty',
                description:'40%-60% expectation of achieving these impacts by 2030, at this point',
                active:true
            },
            {
                id: 4,
                name: 'Lower certainty',
                description:'<40% expectation of achieving these impacts by 2030, at this point',
                active:true
            },

        ]);

        const res = await projectedProbabilitiesRepo.save(rojectedProbabilitiesData);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
