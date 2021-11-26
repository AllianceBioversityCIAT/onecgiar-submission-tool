import {
  getConnection,
  getRepository,
  MigrationInterface,
  QueryRunner
} from 'typeorm';
import {Roles} from '../entity/Roles';
import {Permissions} from '../entity/Permissions';

export class CreateRolesandPermission1612271497205
  implements MigrationInterface
{
  name = 'CreateRolesandPermission1612271497205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepository = getRepository(Roles);
    const permissionRepository = getRepository(Permissions);

    let sgd = new Roles();
    sgd.acronym = 'SGD';
    sgd.description = 'Initiative owner';
    sgd.name = 'sgd';

    let pi = new Roles();
    pi.acronym = 'PI';
    pi.description = 'Initiative Coordinator';
    pi.name = 'pi';

    let guest = new Roles();
    guest.acronym = 'GUEST';
    guest.description = 'Guest';
    guest.name = 'guest';

    let createdRoles = await rolesRepository.save([sgd, pi, guest]);
    console.log(createdRoles);

    /***
     *
     *  create permissions
     *
     */

    let newPermissions = permissionRepository.create([
      {
        resource: 'initiatives',
        action: 'create:Own',
        name: 'create.initiatives.initiative_owner',
        attributes: '*',
        roles: [sgd]
      },
      {
        resource: 'initiatives',
        action: 'read:Own',
        name: 'read.initiatives.initiative_owner',
        attributes: '*',
        roles: [sgd]
      },
      {
        resource: 'initiatives',
        action: 'update:Own',
        name: 'update.initiatives.initiative_owner',
        attributes: '*',
        roles: [sgd]
      },
      {
        resource: 'initiatives',
        action: 'delete:Own',
        name: 'delete.initiatives.initiative_owner',
        attributes: '*',
        roles: [sgd]
      },
      {
        resource: 'initiatives',
        action: 'read:Own',
        name: 'read.initiatives.initiative_coordinator',
        attributes: '*',
        roles: [pi]
      },
      {
        resource: 'initiatives',
        action: 'update:Own',
        name: 'update.initiatives.initiative_coordinator',
        attributes: '*',
        roles: [pi]
      }
    ]);

    let createdPrmssions = await permissionRepository.save(newPermissions);
    console.log(createdPrmssions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
