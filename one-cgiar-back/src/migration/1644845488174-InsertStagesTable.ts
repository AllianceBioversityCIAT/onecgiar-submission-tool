import {MigrationInterface, QueryRunner} from 'typeorm';

export class InsertStagesTable1644845488174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('update data stages');
    await queryRunner.query(`
        UPDATE stages SET description = 'Concept Old' where id = 1;

                `);
    await queryRunner.query(`
                UPDATE stages SET description = 'Pre Concept' where id = 2;
                        `);
    await queryRunner.query(`
         
                        UPDATE stages SET active = 1 where id = 3;
                                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
