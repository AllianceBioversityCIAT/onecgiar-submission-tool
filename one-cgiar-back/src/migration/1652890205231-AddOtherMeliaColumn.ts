import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOtherMeliaColumn1652890205231 implements MigrationInterface {
    name = 'AddOtherMeliaColumn1652890205231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `melia_studies_activities` ADD `other_melia` TEXT DEFAULT NULL after type_melia_id");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
