import {MigrationInterface, QueryRunner} from "typeorm";

export class depthScalesDropForeignKey1660059019693 implements MigrationInterface {
    name = 'depthScalesDropForeignKey1660059019693'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` DROP FOREIGN KEY `FK_95b53e2f75ea33d304e1b39128a`");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `projection_benefits_depth_scales` ADD CONSTRAINT `FK_95b53e2f75ea33d304e1b39128a` FOREIGN KEY (`depthScalesId`) REFERENCES `depth_scales`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        
    }

}
