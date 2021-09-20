import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";

export class AddHumanResourcesPermissions1632143732297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add human resources permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.hr.initiative_owner',
                resource: 'hr',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.hr.initiative_owner',
                resource: 'hr',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.hr.initiative_owner',
                resource: 'hr',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.hr.initiative_owner',
                resource: 'hr',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.hr.initiative_coordinator',
                resource: 'hr',
                action: 'read:Own',
                attributes: '*',
                roles: [IC_role]
            },
        ]);

        let IOPermis = await perRepo.save(newPerms);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
