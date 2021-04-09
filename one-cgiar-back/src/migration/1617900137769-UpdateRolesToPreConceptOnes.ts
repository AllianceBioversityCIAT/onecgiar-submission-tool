import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Roles } from "../entity/Roles";
import { Permissions } from "../entity/Permissions";

export class UpdateRolesToPreConceptOnes1617900137769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const rolesRepository = getRepository(Roles);
        const permissionRepository = getRepository(Permissions);

        const lead = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } });
        const co_lead = await getRepository(Roles).findOne({ where: { acronym: 'PI' } });
        const guest = await getRepository(Roles).findOne({ where: { acronym: 'GUEST' } });
        const admin = await getRepository(Roles).findOne({ where: { acronym: 'ADM' } });

        lead.name = 'Lead Person';
        lead.description = 'Science Group Directors/Designated (SGD) / Initiative Design Team';

        co_lead.name = 'Co-lead Person';
        co_lead.description = 'Principal Investigator (PI)';

        guest.description ='Invited user';
        guest.name ='Guest';

        admin.name = 'Admin';

        let coordinator = new Roles();
        coordinator.acronym = 'CO';
        coordinator.name = 'Coordinator';
        coordinator.description = 'Initiative coordinator user';

        let updatedRoles = await rolesRepository.save([lead, co_lead, guest, coordinator, admin]);
        console.log(updatedRoles);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
