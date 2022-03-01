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

    const newPerms = perRepo.create([
      {
        name: 'create.assessment.asesor',
        resource: 'assessment',
        action: 'create:Any',
        attributes: '*',
        roles: [assessmentRole]
      },
      {
        name: 'update.assessment.asesor',
        resource: 'assessment',
        action: 'update:Any',
        attributes: '*',
        roles: [assessmentRole]
      },
      {
        name: 'delete.assessment.asesor',
        resource: 'assessment',
        action: 'delete:Own',
        attributes: '*',
        roles: [assessmentRole]
      },
      {
        name: 'read.assessment.asesor',
        resource: 'assessment',
        action: 'read:Any',
        attributes: '*',
        roles: [assessmentRole]
      }
    ]);

    let IOPermis = await perRepo.save(newPerms);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
