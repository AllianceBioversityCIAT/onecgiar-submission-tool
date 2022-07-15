import { MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import * as clarisa from '../controllers/Clarisa';
import { ProjectedProbabilitiesRepository } from '../repositories/ProjectedProbabilitiesRepository';

export class restoreProbabilitiesTable1657892105747 implements MigrationInterface {
    name = 'restoreProbabilitiesTable1657892105747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` CHANGE `probabilityID` `probabilityID` int NOT NULL");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `probabilityID`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `probabilityName`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `probabilityDescription`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `name` text NOT NULL");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` CHANGE `active` `active` tinyint NOT NULL");

        let projectedProbabilities = await clarisa.requestProjectedProbabilities();
        let insertData: any[] = [];
        if(projectedProbabilities.length > 0){
            projectedProbabilities.forEach(el => {
              insertData.push({ id: el.probabilityID,
                                name: el.probabilityName,
                                description: el.probabilityDescription});
            });
            const repositoryProjectedProbabilities = getCustomRepository(ProjectedProbabilitiesRepository);
            await repositoryProjectedProbabilities.save(insertData);
        }


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` CHANGE `active` `active` tinyint NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `probabilityDescription` text CHARACTER SET \"utf8mb3\" COLLATE \"utf8_bin\" NOT NULL");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `probabilityName` text CHARACTER SET \"utf8mb3\" COLLATE \"utf8_bin\" NOT NULL");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD `probabilityID` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` ADD PRIMARY KEY (`probabilityID`)");
        await queryRunner.query("ALTER TABLE `clarisa_projected_probabilities` CHANGE `probabilityID` `probabilityID` int NOT NULL AUTO_INCREMENT");
    }

}
