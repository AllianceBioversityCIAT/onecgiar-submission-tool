import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Roles} from '../entity/Roles';

export class AlterRolesNamesDescription1626987418744
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesRepo = getRepository(Roles);
    const roleCoLead = await rolesRepo.findOne({where: {acronym: 'PI'}});

    roleCoLead.name = 'Deputy';

    const roleDeputy = await rolesRepo.save(roleCoLead);
    console.log(roleDeputy);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
