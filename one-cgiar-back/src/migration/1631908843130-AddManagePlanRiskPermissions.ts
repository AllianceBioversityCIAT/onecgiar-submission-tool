import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";


export class AddManagePlanRiskPermissions1631908843130 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add management plan and risk assessment permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.mpr.initiative_owner',
                resource: 'mpr',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.mpr.initiative_owner',
                resource: 'mpr',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.mpr.initiative_owner',
                resource: 'mpr',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'delete.mpr.initiative_owner',
                resource: 'mpr',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.mpr.initiative_coordinator',
                resource: 'mpr',
                action: 'read:Own',
                attributes: '*',
                roles: [IC_role]
            }, {
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
            },{
                name: 'delete.strategies.initiative_owner',
                resource: 'strategies',
                action: 'delete:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.strategies.initiative_coordinator',
                resource: 'strategies',
                action: 'read:Own',
                attributes: '*',
                roles: [IC_role]
            }
        ]);

        let IOPermis = await perRepo.save(newPerms);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
