import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateSbtConfigTableValueClarisa1652014863469
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE sbt_config set value = "OST"
         WHERE id = 1
           AND type = "clarisa"
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
