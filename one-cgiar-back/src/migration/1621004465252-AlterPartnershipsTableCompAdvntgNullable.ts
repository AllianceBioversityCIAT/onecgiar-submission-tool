import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterPartnershipsTableCompAdvntgNullable1621004465252
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Alter partnerships');
    await queryRunner.query(
      `ALTER TABLE partnerships MODIFY comparative_advantage TEXT DEFAULT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
