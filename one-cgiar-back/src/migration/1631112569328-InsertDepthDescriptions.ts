import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { DepthDescriptions } from '../entity/DepthDescriptions'

export class InsertDepthDescriptions1631112569328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const depthDescriptionsRepo = getRepository(DepthDescriptions);

        const depthDescriptionsData = depthDescriptionsRepo.create([
            {
                id: 1,
                impactIndicatorId: 1,
                name: "Life saving",
                active: true
            },
            {
                id: 2,
                impactIndicatorId: 1,
                name: "Transformative",
                active: true
            },
            {
                id: 3,
                impactIndicatorId: 1,
                name: "Substantial",
                active: true
            },
            {
                id: 4,
                impactIndicatorId: 1,
                name: "Significant",
                active: true
            },
            {
                id: 5,
                impactIndicatorId: 1,
                name: "Perceptible",
                active: true
            },
            {
                id: 6,
                impactIndicatorId: 2,
                name: "Life saving",
                active: true
            },
            {
                id: 7,
                impactIndicatorId: 2,
                name: "Transformative",
                active: true
            },
            {
                id: 8,
                impactIndicatorId: 2,
                name: "Substantial",
                active: true
            },
            {
                id: 9,
                impactIndicatorId: 2,
                name: "Significant",
                active: true
            },
            {
                id: 10,
                impactIndicatorId: 2,
                name: "Perceptible",
                active: true
            },
            {
                id: 11,
                impactIndicatorId: 3,
                name: "Life saving",
                active: true
            },
            {
                id: 12,
                impactIndicatorId: 3,
                name: "Transformative",
                active: true
            },
            {
                id: 13,
                impactIndicatorId: 3,
                name: "Substantial",
                active: true
            },
            {
                id: 14,
                impactIndicatorId: 3,
                name: "Significant",
                active: true
            },
            {
                id: 15,
                impactIndicatorId: 3,
                name: "Perceptible",
                active: true
            },
            {
                id: 16,
                impactIndicatorId: 4,
                name: "Life saving",
                active: true
            },
            {
                id: 17,
                impactIndicatorId: 4,
                name: "Transformative",
                active: true
            },
            {
                id: 18,
                impactIndicatorId: 4,
                name: "Substantial",
                active: true
            },
            {
                id: 19,
                impactIndicatorId: 4,
                name: "Significant",
                active: true
            },
            {
                id: 20,
                impactIndicatorId: 4,
                name: "Perceptible",
                active: true
            },
            {
                id: 21,
                impactIndicatorId: 6,
                name: "Not applicable",
                active: true
            },
            {
                id: 22,
                impactIndicatorId: 5,
                name: "Life saving",
                active: true
            },
            {
                id: 23,
                impactIndicatorId: 5,
                name: "Transformative",
                active: true
            },
            {
                id: 24,
                impactIndicatorId: 5,
                name: "Substantial",
                active: true
            },
            {
                id: 25,
                impactIndicatorId: 5,
                name: "Significant",
                active: true
            },
            {
                id: 26,
                impactIndicatorId: 5,
                name: "Perceptible",
                active: true
            },
            {
                id: 27,
                impactIndicatorId: 8,
                name: "Transformative",
                active: true
            },
            {
                id: 28,
                impactIndicatorId: 8,
                name: "Substantial",
                active: true
            },
            {
                id: 29,
                impactIndicatorId: 9,
                name: "Life saving",
                active: true
            },
            {
                id: 30,
                impactIndicatorId: 9,
                name: "Transformative",
                active: true
            },
            {
                id: 31,
                impactIndicatorId: 9,
                name: "Substantial",
                active: true
            },
            {
                id: 32,
                impactIndicatorId: 9,
                name: "Significant",
                active: true
            },
            {
                id: 33,
                impactIndicatorId: 9,
                name: "Perceptible",
                active: true
            },
            {
                id: 34,
                impactIndicatorId: 10,
                name: "Not applicable",
                active: true
            },
            {
                id: 35,
                impactIndicatorId: 11,
                name: "Not applicable",
                active: true
            },
            {
                id: 36,
                impactIndicatorId: 20,
                name: "Life saving",
                active: true
            },
            {
                id: 37,
                impactIndicatorId: 20,
                name: "Transformative",
                active: true
            },
            {
                id: 38,
                impactIndicatorId: 20,
                name: "Substantial",
                active: true
            },
            {
                id: 39,
                impactIndicatorId: 20,
                name: "Significant",
                active: true
            },
            {
                id: 40,
                impactIndicatorId: 20,
                name: "Perceptible",
                active: true
            },
            {
                id: 41,
                impactIndicatorId: 13,
                name: "Transformative",
                active: true
            },
            {
                id: 42,
                impactIndicatorId: 13,
                name: "Substantial",
                active: true
            },
            {
                id: 43,
                impactIndicatorId: 13,
                name: "Significant",
                active: true
            },
            {
                id: 44,
                impactIndicatorId: 13,
                name: "Perceptible",
                active: true
            },
            {
                id: 45,
                impactIndicatorId: 14,
                name: "Life saving",
                active: true
            },
            {
                id: 46,
                impactIndicatorId: 14,
                name: "Transformative",
                active: true
            },
            {
                id: 47,
                impactIndicatorId: 14,
                name: "Substantial",
                active: true
            },
            {
                id: 48,
                impactIndicatorId: 14,
                name: "Significant",
                active: true
            },
            {
                id: 49,
                impactIndicatorId: 15,
                name: "Transformative",
                active: true
            },
            {
                id: 50,
                impactIndicatorId: 15,
                name: "Substantial",
                active: true
            },
            {
                id: 51,
                impactIndicatorId: 15,
                name: "Significant",
                active: true
            },
            {
                id: 52,
                impactIndicatorId: 16,
                name: "Transformative",
                active: true
            },
            {
                id: 53,
                impactIndicatorId: 16,
                name: "Substantial",
                active: true
            },
            {
                id: 54,
                impactIndicatorId: 16,
                name: "Significant",
                active: true
            },
            {
                id: 55,
                impactIndicatorId: 17,
                name: "Transformative",
                active: true
            },
            {
                id: 56,
                impactIndicatorId: 17,
                name: "Substantial",
                active: true
            },
            {
                id: 57,
                impactIndicatorId: 17,
                name: "Significant",
                active: true
            },
            {
                id: 58,
                impactIndicatorId: 18,
                name: "Transformative",
                active: true
            },
            {
                id: 59,
                impactIndicatorId: 18,
                name: "Substantial",
                active: true
            },
            {
                id: 60,
                impactIndicatorId: 19,
                name: "Not applicable",
                active: true
            },

        ]);

        const res = await depthDescriptionsRepo.save(depthDescriptionsData);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
