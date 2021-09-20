import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";

export class AddFinancialResourcesPermissions1632146533031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add human resources permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.fr.initiative_owner',
                resource: 'fr',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.fr.initiative_owner',
                resource: 'fr',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.fr.initiative_owner',
                resource: 'fr',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.fr.initiative_owner',
                resource: 'fr',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.fr.initiative_coordinator',
                resource: 'fr',
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
