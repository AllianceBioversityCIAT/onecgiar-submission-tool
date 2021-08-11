import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnwrkPkgIdGeoScopeSetNull1628541762961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Set null to initiatives by stage');
        await queryRunner.query(`
        ALTER TABLE regions_by_initiative_by_stage
        MODIFY COLUMN wrkPkgId int(11) DEFAULT NULL  
        `);
        await queryRunner.query(`
        ALTER TABLE countries_by_initiative_by_stage
        MODIFY COLUMN wrkPkgId int(11) DEFAULT NULL  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
