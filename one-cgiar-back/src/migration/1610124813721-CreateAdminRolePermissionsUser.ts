import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Roles } from "../entity/Roles";
import { Permissions } from "../entity/Permissions";
import { Users } from "../entity/Users";

export class CreateAdminRolePermissionsUser1610124813721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        /***
       * 
       *  create role
       *  
       */

        let role = new Roles();
        role.acronym = 'ADM';
        role.description = 'Admin Role';
        role.name = 'admin';

        const rolesRepository = getRepository(Roles);
        const permissionRepository = getRepository(Permissions);

        let createdRole = await rolesRepository.save(role);
        console.log(createdRole)
        console.log(role)


        /***
         * 
         *  create permissions
         *  
         */


        let newPermissions = permissionRepository.create([
            {
                resource: 'users',
                action: 'create:Any',
                name: 'create.user.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'users',
                action: 'read:Any',
                name: 'read.user.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'users',
                action: 'update:Any',
                name: 'update.user.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'users',
                action: 'delete:Any',
                name: 'delete.user.admin',
                attributes: '*',
                roles: [role]
            },




            {
                resource: 'roles',
                action: 'create:Any',
                name: 'create.role.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'roles',
                action: 'read:Any',
                name: 'read.role.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'roles',
                action: 'update:Any',
                name: 'update.role.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'roles',
                action: 'delete:Any',
                name: 'delete.role.admin',
                attributes: '*',
                roles: [role]
            },




            {
                resource: 'permissions',
                action: 'create:Any',
                name: 'create.permission.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'permissions',
                action: 'read:Any',
                name: 'read.permission.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'permissions',
                action: 'update:Any',
                name: 'update.permission.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'permissions',
                action: 'delete:Any',
                name: 'delete.permission.admin',
                attributes: '*',
                roles: [role]
            },





            {
                resource: 'initiatives',
                action: 'create:Any',
                name: 'create.initiative.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'initiatives',
                action: 'read:Any',
                name: 'read.initiative.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'initiatives',
                action: 'update:Any',
                name: 'update.initiative.admin',
                attributes: '*',
                roles: [role]
            },
            {
                resource: 'initiatives',
                action: 'delete:Any',
                name: 'delete.initiative.admin',
                attributes: '*',
                roles: [role]
            },
        ]);
        // console.log(newPermissions);
        // console.log(newPermissions[0]);

        let createdPrmssions = await permissionRepository.save(newPermissions);
        // console.log(createdPrmssions);

        /***
         * 
         *  create admins user
         *  
         */
        const userRepository = getRepository(Users);

        // let user = new Users();
        // user.first_name = "Felipe";
        // user.last_name = "Elvira";
        // user.password = null;
        // user.email = "f.elvira@cgiar.org";
        // user.is_cgiar = true;
        // user.roles = [createdRole];
        // user.hashPassword();

        // let user2 = new Users();
        // user2.first_name = "Yeckzin";
        // user2.last_name = "Zuñiga";
        // user2.password = null;
        // user2.email = "y.zuniga@cgiar.org";
        // user2.is_cgiar = true;
        // user2.roles = [createdRole];
        // // user2.hashPassword();

        // let user3 = new Users();
        // user3.first_name = "Hector";
        // user3.last_name = "Tobón";
        // user3.password = null;
        // user3.email = "h.f.tobon@cgiar.org";
        // user3.is_cgiar = true;
        // user3.roles = [createdRole];
        // // user3.hashPassword();


        let f = await queryRunner.query(`
            INSERT INTO users(created_at, updated_at, id, first_name, last_name, email, password, is_cgiar) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'Felipe', 'Elvira', 'f.elvira@cgiar.org', NULL, 1)
        `);
        // console.log(f)
        await queryRunner.query(`
            INSERT INTO roles_by_users(user_id, role_id) 
            VALUES (${f.insertId}, ${createdRole.id})
        `);


        let y = await queryRunner.query(`
            INSERT INTO users(created_at, updated_at, id, first_name, last_name, email, password, is_cgiar) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'Yeckzin', 'Zuñiga', 'y.zuniga@cgiar.org', NULL, 1)
        `);
        await queryRunner.query(`
            INSERT INTO roles_by_users(user_id, role_id) 
            VALUES (${y.insertId}, ${createdRole.id})
        `);


        let h = await queryRunner.query(`
            INSERT INTO users(created_at, updated_at, id, first_name, last_name, email, password, is_cgiar) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'Hector', 'Tobon', 'h.f.tobo@cgiar.org', NULL, 1)
        `);
        await queryRunner.query(`
            INSERT INTO roles_by_users(user_id, role_id) 
            VALUES (${h.insertId}, ${createdRole.id})
        `);
        // await userRepository.save([user, user2, user3]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
