import {MigrationInterface, QueryRunner} from "typeorm";

export class meliaToc1661196718032 implements MigrationInterface {
    name = 'meliaToc1661196718032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("CREATE TABLE `melia_toc` (`id` int NOT NULL AUTO_INCREMENT, `active` tinyint NOT NULL, `meliaIdId` int NULL, `outcomeIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `melia_toc` ADD CONSTRAINT `FK_ed3879ee50f976086fed09f98f2` FOREIGN KEY (`meliaIdId`) REFERENCES `melia_studies_activities`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `melia_toc` ADD CONSTRAINT `FK_90a6b665e395e29a6e3febad5b9` FOREIGN KEY (`outcomeIdId`) REFERENCES `results`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query("ALTER TABLE `melia_toc` DROP FOREIGN KEY `FK_90a6b665e395e29a6e3febad5b9`");
        await queryRunner.query("ALTER TABLE `melia_toc` DROP FOREIGN KEY `FK_ed3879ee50f976086fed09f98f2`");
        await queryRunner.query("DROP TABLE `melia_toc`");
        
    }

}
