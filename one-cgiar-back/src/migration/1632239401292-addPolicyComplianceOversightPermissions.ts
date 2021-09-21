import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";

export class addPolicyComplianceOversightPermissions1632239401292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add policy compliance oversight permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.pco.initiative_owner',
                resource: 'pco',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.pco.initiative_owner',
                resource: 'pco',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.pco.initiative_owner',
                resource: 'pco',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.pco.initiative_owner',
                resource: 'pco',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.pco.initiative_coordinator',
                resource: 'pco',
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
