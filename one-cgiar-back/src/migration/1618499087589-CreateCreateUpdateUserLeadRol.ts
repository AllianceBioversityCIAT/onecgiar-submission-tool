import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Roles} from '../entity/Roles';
import {Permissions} from '../entity/Permissions';

export class CreateCreateUpdateUserLeadRol1618499087589
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepository = getRepository(Roles);
    const permissionRepository = getRepository(Permissions);

    const leadRole = await rolesRepository.findOne({where: {acronym: 'SGD'}});

    let newPermissions = permissionRepository.create([
      {
        resource: 'users',
        action: 'create:Any',
        name: 'create.user.initiative_owner',
        attributes: '*',
        roles: [leadRole]
      },
      {
        resource: 'users',
        action: 'read:Any',
        name: 'read.user.initiative_owner',
        attributes: '*',
        roles: [leadRole]
      },
      {
        resource: 'users',
        action: 'update:Any',
        name: 'update.user.initiative_owner',
        attributes: '*',
        roles: [leadRole]
      },
      {
        resource: 'users',
        action: 'delete:Any',
        name: 'delete.user.initiative_owner',
        attributes: '*',
        roles: [leadRole]
      }
    ]);

    let createdPrmssions = await permissionRepository.save(newPermissions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
