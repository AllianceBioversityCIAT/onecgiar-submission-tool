import {getConnection, MigrationInterface, QueryRunner} from "typeorm";

export class CreateYearsTable1653077145142 implements MigrationInterface {
    name = 'CreateYearsTable1653077145142'

    public async up(queryRunner: QueryRunner): Promise<void> {

        //Create table years
        await queryRunner.query(`CREATE TABLE years (year varchar(4) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
        PRIMARY KEY (year)) ENGINE=InnoDB`);

        //Insert
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into('years')
        .values([
          {
            year: '2022'
          },
          {
            year: '2023'
          },
          {
            year: '2024'
          },
          {
            year: '2025'
          },
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
