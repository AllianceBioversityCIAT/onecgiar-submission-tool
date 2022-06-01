import {getConnection, MigrationInterface, QueryRunner} from "typeorm";

export class CreateAndInsertTableTracks1653679740760 implements MigrationInterface {
    name = 'CreateAndInsertTableTracks1653679740760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE tracks (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            acronym varchar(255) NOT NULL,
            description varchar(255),
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE INDEX IDX_98fc1bf4c279d14507b6d6d428 (acronym, name),
            PRIMARY KEY (id)) ENGINE=InnoDB`);

            await getConnection()
            .createQueryBuilder()
            .insert()
            .into('tracks')
            .values([
              {
                name: 'Light Track',
                acronym: 'LT'
              },
              {
                name: 'Standard Track',
                acronym: 'ST'
              },
              {
                name: 'Advanced Track',
                acronym: 'AT'
              }
            ])
            .execute();

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
