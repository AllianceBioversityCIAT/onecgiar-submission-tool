import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableCountriesByWPToCountriesByInitvStg1628175289554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter countries_by_work_packages table to countries_by_initiative_by_stage');
        await queryRunner.query(`
            ALTER TABLE countries_by_work_packages
            RENAME TO countries_by_initiative_by_stage
        `);
        console.log('Add coplumn reference to initiatives by stages');
        await queryRunner.query(`
            ALTER TABLE countries_by_initiative_by_stage
            ADD COLUMN initvStgId int(11) DEFAULT NULL
        `);
        console.log('Add constraint to initiatives by stage');
        await queryRunner.query(`
        ALTER TABLE countries_by_initiative_by_stage
        ADD CONSTRAINT FK_99668955799492cca2d96_initiatives_by_stages 
            FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE;  
        `);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
