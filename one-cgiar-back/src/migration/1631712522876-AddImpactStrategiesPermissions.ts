import { getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Permissions } from "../entity/Permissions";
import { Roles } from "../entity/Roles";

export class AddImpactStrategiesPermissions1631712522876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('add impact_strategies permissions');
        const perRepo = getRepository(Permissions);
        const IO_role = await getRepository(Roles).findOne({ where: { acronym: 'SGD' } })
        const IC_role = await getRepository(Roles).findOne({ where: { acronym: 'PI' } })

        const newPerms = perRepo.create([
            {
                name: 'create.strategies.initiative_owner',
                resource: 'strategies',
                action: 'create:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'read.strategies.initiative_owner',
                resource: 'strategies',
                action: 'read:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
                name: 'update.strategies.initiative_owner',
                resource: 'strategies',
                action: 'update:Own',
                attributes: '*',
                roles: [IO_role]
            },
            {
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
            },
        ]);

        let IOPermis = await perRepo.save(newPerms);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
