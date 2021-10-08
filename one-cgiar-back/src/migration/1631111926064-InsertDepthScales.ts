import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { DepthScales } from '../entity/DepthScales'

export class InsertDepthScales1631111926064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const depthScalesRepo = getRepository(DepthScales);

        const depthScalesData = depthScalesRepo.create([
            {
                id: 1,
                impactIndicatorId: 1,
                name: 'Income',
                active: true
            },
            {
                id: 2,
                impactIndicatorId: 1,
                name: 'Health',
                active: true
            },
            {
                id: 3,
                impactIndicatorId: 2,
                name: 'Income',
                active: true
            },
            {
                id: 4,
                impactIndicatorId: 2,
                name: 'Health',
                active: true
            },
            {
                id: 5,
                impactIndicatorId: 3,
                name: 'Income',
                active: true
            },
            {
                id: 6,
                impactIndicatorId: 3,
                name: 'Health',
                active: true
            },
            {
                id: 7,
                impactIndicatorId: 4,
                name: 'Income',
                active: true
            },
            {
                id: 8,
                impactIndicatorId: 4,
                name: 'Health',
                active: true
            },
            {
                id: 9,
                impactIndicatorId: 5,
                name: 'Income',
                active: true
            },
            {
                id: 10,
                impactIndicatorId: 5,
                name: 'Health',
                active: true
            },
            {
                id: 11,
                impactIndicatorId: 6,
                name: 'Not Applicable',
                active: true
            },
            {
                id: 12,
                impactIndicatorId: 8,
                name: 'Other (Annex 2)',
                active: true
            },
            {
                id: 13,
                impactIndicatorId: 9,
                name: 'Income',
                active: true
            },
            {
                id: 14,
                impactIndicatorId: 9,
                name: 'Health',
                active: true
            },
            {
                id: 15,
                impactIndicatorId: 10,
                name: 'Not Applicable',
                active: true
            },
            {
                id: 16,
                impactIndicatorId: 11,
                name: 'Not Applicable',
                active: true
            },
            {
                id: 17,
                impactIndicatorId: 20,
                name: 'Income',
                active: true
            },
            {
                id: 18,
                impactIndicatorId: 20,
                name: 'Health',
                active: true
            },
            {
                id: 19,
                impactIndicatorId: 13,
                name: 'Income',
                active: true
            },
            {
                id: 20,
                impactIndicatorId: 13,
                name: 'Health',
                active: true
            },
            {
                id: 21,
                impactIndicatorId: 14,
                name: 'Income',
                active: true
            },
            {
                id: 22,
                impactIndicatorId: 14,
                name: 'Health',
                active: true
            },
            {
                id: 23,
                impactIndicatorId: 15,
                name: 'Other (Annex 2)',
                active: true
            },
            {
                id: 24,
                impactIndicatorId: 16,
                name: 'Other (Annex 2)',
                active: true
            },
            {
                id: 25,
                impactIndicatorId: 17,
                name: 'Other (Annex 2)',
                active: true
            },
            {
                id: 26,
                impactIndicatorId: 18,
                name: 'Other (Annex 2)',
                active: true
            },
            {
                id: 27,
                impactIndicatorId: 19,
                name: 'Not Applicable',
                active: true
            }

        ]);

        const res = await depthScalesRepo.save(depthScalesData);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
