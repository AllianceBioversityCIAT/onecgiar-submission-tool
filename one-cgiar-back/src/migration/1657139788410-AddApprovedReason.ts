import {MigrationInterface, QueryRunner} from "typeorm";

export class AddApprovedReason1657139788410 implements MigrationInterface {
    name = 'AddApprovedReason1657139788410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `initiatives_approval` ADD `approved_reason` text NULL after is_approved");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
