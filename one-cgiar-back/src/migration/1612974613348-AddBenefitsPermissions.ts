import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Permissions} from '../entity/Permissions';
import {Roles} from '../entity/Roles';

export class AddBenefitsPermissions1612974613348 implements MigrationInterface {
  name = 'AddBenefitsPermissions1612974613348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('add projection_benefits permissions');
    const perRepo = getRepository(Permissions);
    const IO_role = await getRepository(Roles).findOne({
      where: {acronym: 'SGD'}
    });
    const IC_role = await getRepository(Roles).findOne({
      where: {acronym: 'PI'}
    });

    const newPerms = perRepo.create([
      {
        name: 'create.toc.initiative_owner',
        resource: 'benefits',
        action: 'create:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_owner',
        resource: 'benefits',
        action: 'read:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'update.toc.initiative_owner',
        resource: 'benefits',
        action: 'update:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'delete.toc.initiative_owner',
        resource: 'benefits',
        action: 'delete:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_coordinator',
        resource: 'benefits',
        action: 'read:Own',
        attributes: '*',
        roles: [IC_role]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
