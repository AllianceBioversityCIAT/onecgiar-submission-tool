import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Permissions} from '../entity/Permissions';
import {Roles} from '../entity/Roles';

export class AddPermissionsGuestRole1633019339060
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepository = getRepository(Roles);

    console.log('add permissions for guest role');
    const perRepo = getRepository(Permissions);
    const IO_role = await getRepository(Roles).findOne({
      where: {acronym: 'SGD'}
    });
    const IC_role = await getRepository(Roles).findOne({
      where: {acronym: 'PI'}
    });
    const guest = await rolesRepository.findOne({where: {acronym: 'GUEST'}});

    const newPerms = perRepo.create([
      {
        name: 'read.pco.guest',
        resource: 'pco',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.pco.guest',
        resource: 'pco',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'read.fr.guest',
        resource: 'fr',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.fr.guest',
        resource: 'fr',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'read.hr.guest',
        resource: 'hr',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.hr.guest',
        resource: 'hr',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'read.mpr.guest',
        resource: 'mpr',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.mpr.guest',
        resource: 'mpr',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'read.melia.guest',
        resource: 'melia',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.melia.guest',
        resource: 'melia',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'read.strategies.guest',
        resource: 'strategies',
        action: 'read:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.strategies.guest',
        resource: 'strategies',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.packages.guest',
        resource: 'packages',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.initiatives.guest',
        resource: 'initiatives',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      },
      {
        name: 'update.benefits.guest',
        resource: 'benefits',
        action: 'update:Any',
        attributes: '*',
        roles: [guest]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
