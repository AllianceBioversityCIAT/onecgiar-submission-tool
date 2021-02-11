import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";


export class AddWorkPackagesPermissions1612977908151 implements MigrationInterface {
    name = 'AddWorkPackagesPermissions1612977908151'

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add work_packages permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.toc.initiative_owner',
                resource: 'packages',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.toc.initiative_owner',
                resource: 'packages',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.toc.initiative_owner',
                resource: 'packages',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.toc.initiative_owner',
                resource: 'packages',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.toc.initiative_coordinator',
                resource: 'packages',
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
