import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Roles } from "../entity/Roles";
import { Permissions } from "../entity/Permissions";

export class CreateRolesandPermission1611951531957 implements MigrationInterface {
    name = 'CreateRolesandPermission1611951531957'

    public async up(queryRunner: QueryRunner): Promise<void> {

        // roles array
        let roles = [
            {
                acronym : 'SGD',
                description:'Initiative Owner',
                name:'Initiative Owner'
            },
            {
                acronym : 'PI',
                description:'Initiative Coordoinator',
                name:'Initiative Coordoinator'
            }
        ];


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
        console.log(createdPrmssions);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
