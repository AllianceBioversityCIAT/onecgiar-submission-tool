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


        /***
         * 
         *  create permissions
         *  
         */

        const permission_create_user = new Permissions();
        const permission_create_role = new Permissions();
        const permission_create_permission = new Permissions();

        permission_create_user.action = 'create:any';
        permission_create_user.name = 'create.user.admin';
        permission_create_user.resource = 'users';
        permission_create_user.attributes = '*';
        permission_create_user.roles = [createdRole];

        permission_create_role.action = 'create:any';
        permission_create_role.name = 'create.roles.admin';
        permission_create_role.resource = 'roles';
        permission_create_role.attributes = '*';
        permission_create_role.roles = [createdRole];

        permission_create_permission.action = 'create:any';
        permission_create_permission.name = 'create.permission.admin';
        permission_create_permission.resource = 'permissions';
        permission_create_permission.attributes = '*';
        permission_create_permission.roles = [createdRole];

        let createdPrmssions = await permissionRepository.save([permission_create_permission, permission_create_role, permission_create_user]);
        console.log(createdPrmssions)

        /***
         * 
         *  create admin user
         *  
         */

        let user = new Users();
        user.first_name = "admin";
        user.last_name = "one";
        user.password = "admin";
        user.email = "admin_one@cgiar.org";
        user.is_cgiar = false;
        user.roles = [createdRole];
        user.hashPassword();
        const userRepository = getRepository(Users);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
