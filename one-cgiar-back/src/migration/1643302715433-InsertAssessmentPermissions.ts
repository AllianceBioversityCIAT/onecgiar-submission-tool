import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Roles} from '../entity';
import {Permissions} from '../entity';

export class InsertAssessmentPermissions1643302715433
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const perRepo = getRepository(Permissions);
    const assessmentRole = await getRepository(Roles).findOne({
      where: {acronym: 'ASSESS'}
    });
    const adminRole = await getRepository(Roles).findOne({
      where: {acronym: 'ADM'}
    });

    const newPerms = perRepo.create([
      {
        name: 'create.assessment.assessor',
        resource: 'assessment',
        action: 'create:Any',
        attributes: '*',
        roles: [assessmentRole, adminRole]
      },
      {
        name: 'update.assessment.assessor',
        resource: 'assessment',
        action: 'update:Any',
        attributes: '*',
        roles: [assessmentRole, adminRole]
      },
      {
        name: 'delete.assessment.assessor',
        resource: 'assessment',
        action: 'delete:Own',
        attributes: '*',
        roles: [assessmentRole, adminRole]
      },
      {
        name: 'read.assessment.assessor',
        resource: 'assessment',
        action: 'read:Any',
        attributes: '*',
        roles: [assessmentRole, adminRole]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
