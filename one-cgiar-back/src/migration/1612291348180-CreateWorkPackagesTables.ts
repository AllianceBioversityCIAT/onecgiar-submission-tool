import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkPackagesTables1612291348180 implements MigrationInterface {
    name = 'CreateWorkPackagesTables1612291348180'

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create work_packages table');
        await queryRunner.query(`
            CREATE TABLE work_packages (
                id int(11) NOT NULL AUTO_INCREMENT,
                active tinyint(2) NOT NULL DEFAULT 1,
                name varchar(500) COLLATE utf8_bin NOT NULL,
                results varchar(1000) COLLATE utf8_bin NOT NULL,
                pathway_content varchar(1000) COLLATE utf8_bin NOT NULL,
                is_global tinyint(2) NOT NULL DEFAULT 0,
                initvStgId int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8889955799492cca2d96_initv_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

        console.log('create regions_by_work_packages table');
        await queryRunner.query(`
            CREATE TABLE regions_by_work_packages (
                id int(11) NOT NULL AUTO_INCREMENT,
                wrkPkgId int(11) NOT NULL,
                region_id int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_wrkPkgId (wrkPkgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8889955799492cca2d96_work_packages FOREIGN KEY (wrkPkgId) REFERENCES work_packages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

        console.log('create countries_by_work_packages table');
        await queryRunner.query(`
            CREATE TABLE countries_by_work_packages (
                id int(11) NOT NULL AUTO_INCREMENT,
                wrkPkgId int(11) NOT NULL,
                country_id int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_wrkPkgId (wrkPkgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_99668955799492cca2d96_work_packages FOREIGN KEY (wrkPkgId) REFERENCES work_packages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
        
        console.log('create projection_benefits table');
        await queryRunner.query(`
            CREATE TABLE projection_benefits (
                id int(11) NOT NULL AUTO_INCREMENT,
                wrkPkgId int(11) NOT NULL,
                impact_area_indicator_id int(11) NOT NULL,
                impact_area_id int(11) NOT NULL,
                impact_area_indicator_name varchar(500) COLLATE utf8_bin NOT NULL,
                impact_area_name varchar(500) COLLATE utf8_bin NOT NULL,
                notes varchar(1000) COLLATE utf8_bin NOT NULL,

                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_wrkPkgId (wrkPkgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_112258493799492cca2d96_work_packages FOREIGN KEY (wrkPkgId) REFERENCES work_packages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
        
        
        console.log('create impact_timeframes table');
        await queryRunner.query(`
            CREATE TABLE impact_timeframes (
                id int(11) NOT NULL AUTO_INCREMENT,
                year varchar(4) COLLATE utf8_bin NOT NULL,
                low_scenario int(2) NOT NULL,
                high_scenario int(2) NOT NULL,
                proBnftId int(11) NOT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                KEY IDX_1354654654564321_proBnftId (proBnftId),
                PRIMARY KEY (id),
                CONSTRAINT FK_112258493799492cca2d96_projection_benefits FOREIGN KEY (proBnftId) REFERENCES projection_benefits (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);



    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
