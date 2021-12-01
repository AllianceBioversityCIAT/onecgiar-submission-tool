import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Permissions} from '../entity/Permissions';
import {Roles} from '../entity/Roles';

export class AddParnetshipsKeyPartnersPermissions1613678231796
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('add partnerships permissions');
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
        resource: 'partnerships',
        action: 'create:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_owner',
        resource: 'partnerships',
        action: 'read:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'update.toc.initiative_owner',
        resource: 'partnerships',
        action: 'update:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'delete.toc.initiative_owner',
        resource: 'partnerships',
        action: 'delete:Own',
        attributes: '*',
        roles: [IO_role]
      },
      {
        name: 'read.toc.initiative_coordinator',
        resource: 'partnerships',
        action: 'read:Own',
        attributes: '*',
        roles: [IC_role]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);

    console.log('add key_partners permissions');
    const perRepo_ = getRepository(Permissions);
    const IO_role_ = await getRepository(Roles).findOne({
      where: {acronym: 'SGD'}
    });
    const IC_role_ = await getRepository(Roles).findOne({
      where: {acronym: 'PI'}
    });

    const newPerms_ = perRepo_.create([
      {
        name: 'create.toc.initiative_owner',
        resource: 'keyPartners',
        action: 'create:Own',
        attributes: '*',
        roles: [IO_role_]
      },
      {
        name: 'read.toc.initiative_owner',
        resource: 'keyPartners',
        action: 'read:Own',
        attributes: '*',
        roles: [IO_role_]
      },
      {
        name: 'update.toc.initiative_owner',
        resource: 'keyPartners',
        action: 'update:Own',
        attributes: '*',
        roles: [IO_role_]
      },
      {
        name: 'delete.toc.initiative_owner',
        resource: 'keyPartners',
        action: 'delete:Own',
        attributes: '*',
        roles: [IO_role_]
      },
      {
        name: 'read.toc.initiative_coordinator',
        resource: 'keyPartners',
        action: 'read:Own',
        attributes: '*',
        roles: [IC_role_]
      }
    ]);

    let IOPermis_ = await perRepo.save(newPerms_);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
