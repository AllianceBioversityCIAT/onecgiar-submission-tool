import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Roles } from '../entity/Roles'

export const getAllRoles = async (req: Request, res: Response) => {
    const rolesRepository = getRepository(Roles);
    let roles;

    try {
        roles = await rolesRepository.find();
        res.status(200).json(roles);

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not access to roles." });
    }

}

export const createRole = async (req: Request, res: Response) => {

    const { description, acronym } = req.body
    const role = new Roles();
    role.description = description;
    role.acronym = acronym;

    // validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(role, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const rolesRepository = getRepository(Roles);
    try {
        await rolesRepository.save(role);
    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Role already exist' });
    }
    res.send('Role created');

}

export const editRole = async (req: Request, res: Response) => {
    let role: Roles;
    const { id } = req.params;
    const { acronym, description } = req.body;

    const rolesRepository = getRepository(Roles);
    
    try {
        role = await rolesRepository.findOneOrFail(id);
        role.acronym = acronym;
        role.description = description;
        await rolesRepository.save(role);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Role not found' });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(role, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        await rolesRepository.save(role);

    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Role already in use' });
    }
    res.status(201).json({ msg: 'Role update' });
};

export const deleteRole = async (req: Request, res: Response) => {
    //Get the ID from the url
    const { id } = req.params;
    const rolesRepository = getRepository(Roles);
    let role: Roles;
    try {
        role = await rolesRepository.findOneOrFail(id);
    } catch (error) {
        res.status(400).json({ msg: 'Role not found.' });
    }
    rolesRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(200).json({ msg: "Role deleted" });
};