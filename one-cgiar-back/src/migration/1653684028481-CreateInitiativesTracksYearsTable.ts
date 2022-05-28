import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitiativesTracksYearsTable1653684028481 implements MigrationInterface {
    name = 'CreateInitiativesTracksYearsTable1653684028481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE initiatives_tracks_years (
            id int NOT NULL AUTO_INCREMENT,
            track_id int NOT NULL,
            track_year_id int NOT NULL,
            initvStgId int NOT NULL,
            value int NOT NULL DEFAULT '0',
            active tinyint NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`
        );
        await queryRunner.query("ALTER TABLE initiatives_tracks_years ADD CONSTRAINT FK_86d4c3ab4c3460d18cba21fa362 FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE initiatives_tracks_years ADD CONSTRAINT FK_949e84a31a8bf1a96dd383a58c5 FOREIGN KEY (track_year_id) REFERENCES tracks_years(id) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE initiatives_tracks_years ADD CONSTRAINT FK_0f2ddcbd1390c275204cf162af7 FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages(id) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
