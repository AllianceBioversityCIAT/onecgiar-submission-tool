import {MigrationInterface, QueryRunner} from "typeorm";

export class depthScalesProjectedBenefits1659016334528 implements MigrationInterface {
    name = 'depthScalesProjectedBenefits1659016334528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `projection_benefits_depth_scales` (`id` int NOT NULL AUTO_INCREMENT, `active` tinyint NOT NULL, `projectionBenefitsId` int NULL, `depthScalesId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` ADD CONSTRAINT `FK_d744acb8bd6ff85e7067b15b583` FOREIGN KEY (`projectionBenefitsId`) REFERENCES `projection_benefits`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` ADD CONSTRAINT `FK_95b53e2f75ea33d304e1b39128a` FOREIGN KEY (`depthScalesId`) REFERENCES `depth_scales`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` DROP FOREIGN KEY `FK_95b53e2f75ea33d304e1b39128a`");
        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` DROP FOREIGN KEY `FK_d744acb8bd6ff85e7067b15b583`");
        await queryRunner.query("DROP TABLE `projection_benefits_depth_scales`");
    }

}
