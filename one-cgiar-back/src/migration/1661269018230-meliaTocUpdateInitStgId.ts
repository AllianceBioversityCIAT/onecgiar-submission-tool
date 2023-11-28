import {MigrationInterface, QueryRunner} from "typeorm";

export class meliaTocUpdateInitStgId1661269018230 implements MigrationInterface {
    name = 'meliaTocUpdateInitStgId1661269018230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `melia_toc` ADD `initvStgIdId` int NULL");
        await queryRunner.query("ALTER TABLE `melia_toc` ADD CONSTRAINT `FK_28705baa11c3329d82081b1ffbc` FOREIGN KEY (`initvStgIdId`) REFERENCES `initiatives_by_stages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `melia_toc` DROP FOREIGN KEY `FK_28705baa11c3329d82081b1ffbc`");
        await queryRunner.query("ALTER TABLE `melia_toc` DROP COLUMN `initvStgIdId`");
        
    }

}
