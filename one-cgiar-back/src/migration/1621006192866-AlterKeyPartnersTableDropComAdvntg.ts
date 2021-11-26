import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterKeyPartnersTableDropComAdvntg1621006192866
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Alter key_partners');
    await queryRunner.query(
      `ALTER TABLE key_partners DROP COLUMN comparative_advantage`
    );
    await queryRunner.query(
      `ALTER TABLE key_partners DROP FOREIGN KEY FK_8b4c2233d99492cca2d96_initv_stages`
    );
    await queryRunner.query(`ALTER TABLE key_partners DROP COLUMN initvStgId`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
