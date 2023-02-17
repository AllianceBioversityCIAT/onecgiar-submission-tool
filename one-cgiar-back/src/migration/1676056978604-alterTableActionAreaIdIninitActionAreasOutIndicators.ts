import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableActionAreaIdIninitActionAreasOutIndicators1676056978604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE init_action_areas_out_indicators
            ADD action_area_id int;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
