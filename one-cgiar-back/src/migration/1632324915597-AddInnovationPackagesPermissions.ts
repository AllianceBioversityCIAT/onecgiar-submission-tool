import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";

export class AddInnovationPackagesPermissions1632324915597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        console.log('add innovation packages and scaling readiness plan permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.ip.initiative_owner',
                resource: 'ip',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.ip.initiative_owner',
                resource: 'ip',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.ip.initiative_owner',
                resource: 'ip',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.ip.initiative_owner',
                resource: 'ip',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.ip.initiative_coordinator',
                resource: 'ip',
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
