import { Request, Response } from 'express'
import { getRepository, In } from 'typeorm'
import { validate } from 'class-validator'
import { Roles } from '../entity/Roles'
import { Permissions } from '../entity/Permissions'
import { User } from '../entity/Users'
import { accessCtrl } from '../middlewares/access-control'

export const getAllRoles = async (req: Request, res: Response) => {
    const rolesRepository = getRepository(Roles);
    let roles;

    try {
        roles = await rolesRepository.find();
        res.status(200).json({ data: roles, msg: 'All Roles' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not access to roles." });
    }

}

export const createRole = async (req: Request, res: Response) => {

    const { description, acronym, name } = req.body
    const role = new Roles();
    const rolesRepository = getRepository(Roles);
    const userRepository = getRepository(User);
    const userId = res.locals.jwtPayload.userId;
    const validationOpt = { validationError: { target: false, value: false } };

    role.description = description;
    role.acronym = acronym;
    role.name = name;


    try {

        let user = await userRepository.findOne(userId, { relations: ['roles'] });
        let rolesAcronyms = user.roles.map(role => role.acronym);
        const per = accessCtrl.can(rolesAcronyms).createAny('permission');

        if (per.granted) {
            // validate
            const errors = await validate(role, validationOpt);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            let createdRole = await rolesRepository.save(role);
            res.json({ msg: 'Role created', data: createdRole });
        } else {
            // resource is forbidden for this user/role
            res.status(403).end();
        }




    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Role creation error', data: error });
    }

}

export const editRole = async (req: Request, res: Response) => {
    let role: Roles;
    const { id } = req.params;
    const { acronym, description, name } = req.body;

    const rolesRepository = getRepository(Roles);

    try {
        role = await rolesRepository.findOneOrFail(id);

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(role, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        role.acronym = acronym;
        role.description = description;
        role.name = name;
        let updatedRole = await rolesRepository.save(role);
        res.status(201).json({ msg: 'Role update', data: updatedRole });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Role not found' });
    }

};

export const deleteRole = async (req: Request, res: Response) => {
    //Get the ID from the url
    const { id } = req.params;
    const rolesRepository = getRepository(Roles);
    let role: Roles;
    try {
        role = await rolesRepository.findOneOrFail(id);
        rolesRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(200).json({ msg: "Role deleted" });
    } catch (error) {
        res.status(400).json({ msg: 'Role not found.' });
    }
};

/**
 * Permissions
 * 
 */

export const createPermission = async (req: Request, res: Response) => {

    const { resource, action, attributes, name, roles } = req.body
    const permission = new Permissions();
    const permissionRepository = getRepository(Permissions);
    const rolesRepository = getRepository(Roles);
    const userRepository = getRepository(User);
    const userId = res.locals.jwtPayload.userId;
    const validationOpt = { validationError: { target: false, value: false } };

    permission.action = action;
    permission.name = name;
    permission.resource = resource;
    permission.attributes = attributes;

    try {

        let user = await userRepository.findOne(userId, { relations: ['roles'] });
        let rolesAcronyms = user.roles.map(role => role.acronym);
        const per = accessCtrl.can(rolesAcronyms).createAny('permissions');
        console.log(per)
        if (per.granted) {
            // validate
            const errors = await validate(permission, validationOpt);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }


            const rolesDB = await rolesRepository.find({
                select: ['id'],
                where: { id: In(roles) },
                order: { created_at: "ASC" },
            });

            if (rolesDB && rolesDB.length > 0)
                permission.roles = rolesDB;
            else
                return res.status(400).json({ data: rolesDB, msg: 'None role found' });


            let createdPermission = await permissionRepository.save(permission);
            res.json({ msg: 'Role permission', data: createdPermission });
        }
        else {
            // resource is forbidden for this user/role
            res.status(403).end();
        }

    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Role creation error', data: error });
    }

}

export const getAllPermissions = async (req: Request, res: Response) => {
    const permissionRepository = getRepository(Permissions);
    let permissions;

    try {
        permissions = await permissionRepository.find();
        res.status(200).json({ data: permissions, msg: 'All permissions' });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not access to roles." });
    }

}