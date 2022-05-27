import {MigrationInterface, QueryRunner} from "typeorm";
import { query } from "winston";

export class UpdateIntvStgStatus1653690658197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update initiatives_by_stages set statusId = 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
