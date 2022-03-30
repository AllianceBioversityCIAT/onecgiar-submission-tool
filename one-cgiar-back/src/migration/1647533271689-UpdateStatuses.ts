import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Roles, Stages } from "../entity";
import { Statuses } from "../entity/Statuses";

const statusRepo = getRepository(Statuses);
const rolesRepo = getRepository(Roles);
const stagesRepo = getRepository(Stages);

export class UpdateStatuses1647533271689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const statuses = await statusRepo.find({ where: { active: true } });
        const adminRole = await rolesRepo.findOne({ where: { acronym: 'ADM' } })
        const stagesArray = await stagesRepo.find({ where: { active: true } });
        for (let index = 0; index < statuses.length; index++) {
            const status = statuses[index];
            status.rolesAvailables = [adminRole.id];
            status.stagesAvailables = stagesArray.map(stg => stg.id);
            // switch (status.status) {
            //     case 'Editing':
            //         break;
            //     case 'Steped up':
            //         status.status = 'Submitted';
            //         status.description = 'Initiative submitted';
            //         // status.icon = 'edit'
            //         break;
            //     case 'On hold':
            //         status.stagesAvailables = null;
            //         // status.icon = 'edit'
            //         break;

            //     default:
            //         break;
            // }
        }
        const updatedStatuses = await statusRepo.save(statuses)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
