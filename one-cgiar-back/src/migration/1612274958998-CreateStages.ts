import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Initiatives } from "../entity/Initiatives";
import { Stages } from "../entity/Stages";

export class CreateStages1612274958998 implements MigrationInterface {
    name = 'CreateStages1612274958998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stagesRepository = getRepository(Stages);


        const newStages = stagesRepository.create([
            {
                description: 'Pre Concept',
                active: false,
                start_date: null,
                end_date: null
            },
            {
                description: 'Concept',
                active: true,
                start_date: null,
                end_date: null
            },
            {
                description: 'Full Proposal',
                active: false,
                start_date: null,
                end_date: null
            },
        ]);


        let createdStages = await stagesRepository.save(newStages);
        console.log(createdStages)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
