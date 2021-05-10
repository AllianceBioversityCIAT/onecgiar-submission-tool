import {MigrationInterface, QueryRunner} from "typeorm";
// 1620664266932

export class AlterUsersByInitiativeTable1620653808976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter initiatives_by_users')
        await queryRunner.query(`ALTER TABLE initiatives_by_users MODIFY initiativeId int(11) DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE initiatives_by_users MODIFY userId int(11) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
