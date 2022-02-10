import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Statuses } from "../entity/Statuses";

const statusRepo = getRepository(Statuses);

export class UpdateSubmissionStatuses1644506178953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const statuses = await statusRepo.find();
        for (let index = 0; index < statuses.length; index++) {
            const status = statuses[index];
            switch (status.status) {
                case 'Pending':
                    status.status = 'Editing';
                    status.icon = 'edit'
                    break;
                case 'Steped up':
                    status.status = 'Submitted';
                    // status.icon = 'edit'
                    break;
            
                default:
                    break;
            }
        }
        const updatedStatuses = await statusRepo.save(statuses)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
