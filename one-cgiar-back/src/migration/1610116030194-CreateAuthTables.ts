import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateAuthTables1610116030194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        console.log('corro?');
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "first_name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "last_name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "is_cgiar",
                    type: "tinyint",
                    isNullable: false,
                    default: 0
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }), true);
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "acronym",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isUnique: true,
                    length: '500',
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    length: '500',
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }), true);
        await queryRunner.createTable(new Table({
            name: 'permissions',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "resource",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "action",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "attributes",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP'
                },
            ]
        }), true);

        /**
         * 
         * Join tables
         * 
         */
        await queryRunner.createTable(new Table({
            name: 'roles_by_users',
            columns: [
                {
                    name: "role_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: false
                },
            ]
        }), true);

        await queryRunner.createPrimaryKey(
            'roles_by_users', ['role_id', 'user_id']
        );
        await queryRunner.createIndices(
            'roles_by_users', [
            new TableIndex({
                name: "IDX_1ac95dad03d3a20b495aa6f7a1",
                columnNames: ["role_id"]
            }),
            new TableIndex({
                name: "IDX_8b4c7595b7f033d7e492d6a2d9",
                columnNames: ["user_id"]
            }),
        ]
        );
        await queryRunner.createForeignKey("roles_by_users", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("roles_by_users", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));


        await queryRunner.createTable(new Table({
            name: 'permissions_by_roles',
            columns: [
                {
                    name: "role_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "permission_id",
                    type: "int",
                    isNullable: false
                },
            ]
        }), true);

        await queryRunner.createPrimaryKey(
            'permissions_by_roles', ['permission_id', 'role_id']
        );
        await queryRunner.createIndices(
            'permissions_by_roles', [
            new TableIndex({
                name: "IDX_c73c26f64f6477062784c991f0",
                columnNames: ["permission_id"]
            }),
            new TableIndex({
                name: "IDX_330665ea44e4a3dfc82e9d800f",
                columnNames: ["role_id"]
            }),
        ]
        );
        await queryRunner.createForeignKey("permissions_by_roles", new TableForeignKey({
            columnNames: ["permission_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissions",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("permissions_by_roles", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
