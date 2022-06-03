import {getConnection, MigrationInterface, QueryRunner} from 'typeorm';

export class CreateAndInsertTracksYearsTable1653683035084
  implements MigrationInterface
{
  name = 'CreateAndInsertTracksYearsTable1653683035084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE tracks_years (
        id int NOT NULL AUTO_INCREMENT,
        year varchar(4) NOT NULL,
        name varchar(255) NOT NULL,
        cycle varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE INDEX IDX_0698c88093e5143d5a3ce60aa9 (year),
        PRIMARY KEY (id)) ENGINE=InnoDB`);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('tracks_years')
      .values([
        {
          year: '2022',
          name: 'Year 1',
          cycle: '1'
        },
        {
          year: '2023',
          name: 'Year 2',
          cycle: '1'
        },
        {
          year: '2024',
          name: 'Year 3',
          cycle: '1'
        }
      ])
      .execute();
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
