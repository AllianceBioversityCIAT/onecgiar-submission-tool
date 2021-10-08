import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTablePrjectionBenefits1631191123845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add column reference to initiatives by stages');
        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN initvStgId int(11) DEFAULT NULL
        `);

        console.log('Add constraint to initiatives by stage');
        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD CONSTRAINT FK_99668955asds92ccad519_initiatives_by_stages 
            FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE;  
        `);

        console.log('Add column reference to depth scale');
        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN depth_scale_id int(11) DEFAULT NULL
        `);

        console.log('Add column reference to depth description');
        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN probability_id int(11) DEFAULT NULL
        `);

        console.log('Add column impact area active');
        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN impact_area_active tinyint(2) NOT NULL DEFAULT 1
        `);

        // console.log('Add column reference to depth description');
        // await queryRunner.query(`
        // ALTER TABLE projection_benefits
        // ALTER wrkPkgId SET DEFAULT NULL
        // `);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
