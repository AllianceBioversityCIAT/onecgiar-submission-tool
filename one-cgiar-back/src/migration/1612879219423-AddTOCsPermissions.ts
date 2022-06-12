import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Permissions} from '../entity/Permissions';
import {Roles} from '../entity/Roles';

export class AddTOCsPermissions1612879219423 implements MigrationInterface {
  name = 'AddTOCsPermissions1612879219423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('add TOCs permissions');
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
        resource: 'tocs',
        action: 'create:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_owner',
        resource: 'tocs',
        action: 'read:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'update.toc.initiative_owner',
        resource: 'tocs',
        action: 'update:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'delete.toc.initiative_owner',
        resource: 'tocs',
        action: 'delete:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_coordinator',
        resource: 'tocs',
        action: 'read:Own',
        attributes: '*',
        roles: [IC_role]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
