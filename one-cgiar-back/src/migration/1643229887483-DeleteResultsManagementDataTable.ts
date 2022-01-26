import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteResultsManagementDataTable1643229887483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `
            drop table IF EXISTS results_data_management;
                  `
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
