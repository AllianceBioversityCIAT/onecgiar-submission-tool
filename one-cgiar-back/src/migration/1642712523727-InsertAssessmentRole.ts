import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Roles} from '../entity/Roles';
import {Permissions} from '../entity/Permissions';

export class InsertAssessmentRole1642712523727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepository = getRepository(Roles);
    const permissionRepository = getRepository(Permissions);

    const assessRole = new Roles();
    assessRole.acronym = 'ASSESS';
    assessRole.description = 'Assessment team';
    assessRole.name = 'Assess';

    const createdRole = await rolesRepository.save(assessRole);

    let newPermissions = permissionRepository.create([
      {
        resource: 'initiatives',
        action: 'read:Any',
        name: 'assess.initiatives.assessor',
        attributes: '*',
        roles: [createdRole]
      }
    ]);

    let createdPrmssions = await permissionRepository.save(newPermissions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
