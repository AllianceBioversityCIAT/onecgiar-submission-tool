import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Roles} from '../entity/Roles';
import {Permissions} from '../entity/Permissions';

export class CreatePermissionsForGuestRole1619531931196
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepository = getRepository(Roles);
    const permissionRepository = getRepository(Permissions);

    const guest = await rolesRepository.findOne({where: {acronym: 'GUEST'}});

    let newPermissions = permissionRepository.create([
      {
        resource: 'initiatives',
        action: 'read:Any',
        name: 'read.initiatives.guest',
        attributes: '*',
        roles: [guest]
      },
      {
        resource: 'tocs',
        action: 'read:Any',
        name: 'read.tocs.guest',
        attributes: '*',
        roles: [guest]
      },
      {
        resource: 'benefits',
        action: 'read:Any',
        name: 'read.benefits.guest',
        attributes: '*',
        roles: [guest]
      },
      {
        resource: 'packages',
        action: 'read:Any',
        name: 'read.packages.guest',
        attributes: '*',
        roles: [guest]
      },
      {
        resource: 'partnerships',
        action: 'read:Any',
        name: 'read.partnerships.guest',
        attributes: '*',
        roles: [guest]
      },
      {
        resource: 'keyPartners',
        action: 'read:Any',
        name: 'read.keyPartners.guest',
        attributes: '*',
        roles: [guest]
      }
    ]);
    let createdPrmssions = await permissionRepository.save(newPermissions);
    console.log(createdPrmssions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
