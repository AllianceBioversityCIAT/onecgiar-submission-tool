import {getConnection, getRepository} from 'typeorm';
import {Roles} from '../entity/Roles';
import {AccessControl} from 'accesscontrol';

export const accessCtrl = new AccessControl();

const getPermissions = async () => {
  const rolesRepository = getRepository(Roles);
  const queryRunner = getConnection().createQueryBuilder();

  let roles = await rolesRepository.find({select: ['id', 'name']});
  let rolesIds = roles.map((role) => role.id);
  let permissionSQL = ` 
            SELECT
            role.id as role_id,
            role.acronym as role,
            perm.resource as resource,
            perm.action as action,
            perm.attributes as attributes,
            perm.id as permission_id
        FROM
            permissions_by_roles per_rol
        LEFT JOIN roles role ON role.id = per_rol.role_id
        LEFT JOIN permissions perm ON perm.id = per_rol.permission_id
        WHERE
            per_rol.role_id IN (${rolesIds});
    `;
  if (rolesIds.length > 0) {
    const [query, parameters] =
      await queryRunner.connection.driver.escapeQueryWithParameters(
        permissionSQL,
        {},
        {}
      );
    let permissions = await queryRunner.connection.query(query, parameters);
    return permissions;
  } else {
    return [];
  }
};

export const startAccsCtrl = async () => {
  let grantsObject = await getPermissions();

  accessCtrl.setGrants(grantsObject);
  accessCtrl.grant('CO').extend(['PI']);
  accessCtrl.grant('ADM').extend(['SGD', 'PI']);
  // console.log(JSON.stringify(accessCtrl.getGrants()));
  return accessCtrl;
};
