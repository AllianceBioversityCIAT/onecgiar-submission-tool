import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertGeneralInformationMappingMetaConceptToProposal1623181188756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Insert in mapping_metadata')

        const conceptMeta = await queryRunner.query(`
        SELECT id, group_by, col_name, table_name, stage_name FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE description LIKE 'Concept') AND group_by LIKE 'General Information' ORDER BY col_name
        `);
        const proposaltMeta = await queryRunner.query(`
        SELECT id, group_by, col_name, table_name, stage_name FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE description LIKE 'Full Proposal') AND group_by LIKE 'General Information' ORDER BY col_name
        `);

        for (let index = 0; index < conceptMeta.length; index++) {
            const cncptMta = conceptMeta[index];
            const ppltMta = proposaltMeta[index];

            await queryRunner.query(`
                INSERT INTO mapping_metadata ( from_meta_id, to_meta_id, from_stage_name, to_stage_name )
                VALUES (${cncptMta.id}, ${ppltMta.id}, '${cncptMta.stage_name}', '${ppltMta.stage_name}');
            `);

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
