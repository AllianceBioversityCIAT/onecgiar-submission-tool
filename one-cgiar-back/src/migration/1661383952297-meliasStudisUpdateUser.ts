import {MigrationInterface, QueryRunner} from "typeorm";

export class meliasStudisUpdateUser1661383952297 implements MigrationInterface {
    name = 'meliasStudisUpdateUser1661383952297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `melia_studies_activities` ADD `updateUserId` int NULL");
        await queryRunner.query("ALTER TABLE `melia_studies_activities` ADD CONSTRAINT `FK_2c8701938a10db7cc2ec1b91eea` FOREIGN KEY (`updateUserId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `melia_studies_activities` DROP FOREIGN KEY `FK_2c8701938a10db7cc2ec1b91eea`");
        await queryRunner.query("ALTER TABLE `melia_studies_activities` DROP COLUMN `updateUserId`");
        
    }

}
