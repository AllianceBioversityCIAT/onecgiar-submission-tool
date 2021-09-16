import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";


export class AddMeliaPermissions1631712962986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add melia permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.melia.initiative_owner',
                resource: 'melia',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.melia.initiative_owner',
                resource: 'melia',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.melia.initiative_owner',
                resource: 'melia',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.melia.initiative_owner',
                resource: 'melia',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.melia.initiative_coordinator',
                resource: 'melia',
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
