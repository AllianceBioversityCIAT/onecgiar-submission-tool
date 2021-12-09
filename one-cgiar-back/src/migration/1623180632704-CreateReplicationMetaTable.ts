import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateReplicationMetaTable1623180632704
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('CREATE mapping_metadata');
    await queryRunner.query(`
        CREATE TABLE mapping_metadata (
            id int(11) NOT NULL AUTO_INCREMENT,
            
            from_meta_id int(11) DEFAULT NULL,
            to_meta_id int(11) DEFAULT NULL,

            from_stage_name TEXT DEFAULT NULL,
            to_stage_name TEXT DEFAULT NULL,
            
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

            PRIMARY KEY (id)               
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
