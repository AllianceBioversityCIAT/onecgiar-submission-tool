import {MigrationInterface, QueryRunner} from "typeorm";

export class clarisaProjectedBenefitsProbabilities1657541955659 implements MigrationInterface {
    name = 'clarisaProjectedBenefitsProbabilities1657541955659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `probabilityID` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `probabilityName` text NOT NULL");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `probabilityDescription` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `probabilityDescription`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `probabilityName`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` DROP COLUMN `probabilityID`");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `name` varchar(100) CHARACTER SET \"utf8mb3\" COLLATE \"utf8_bin\" NULL");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `projected_probabilities` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `projected_probabilities` ADD `description` varchar(250) CHARACTER SET \"utf8mb3\" COLLATE \"utf8_bin\" NULL");
    }

}
