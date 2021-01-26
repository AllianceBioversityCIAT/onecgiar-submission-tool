import { Request, Response } from 'express'
import { getRepository, In } from 'typeorm'
import { validate } from 'class-validator'
import { Users } from '../entity/Users'
import { Roles } from '../entity/Roles';
import { accessCtrl } from '../middlewares/access-control';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(Users);
    let users;

    try {
        users = await userRepository.find();
        return res.json({ data: users, msg: 'Users list' });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Something went wrong', data: error });
    }


};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
        const user = await userRepository.findOneOrFail(id);
        res.json({ data: user, msg: 'User data' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Something went wrong', data: error });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    const { first_name, last_name, password, roles, email, is_cgiar } = req.body;
    const user = new Users();
    const userRepository = getRepository(Users);
    const rolesRepository = getRepository(Roles);

    user.first_name = first_name;
    user.last_name = last_name;
    user.password = password;
    user.email = email;
    user.is_cgiar = is_cgiar;
    try {

        // validate
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const rolesDB = await rolesRepository.find({
            select: ['id'],
            where: { id: In(roles) },
            order: { created_at: "ASC" },
        });

        if (rolesDB && rolesDB.length > 0)
            user.roles = rolesDB;
        else
            return res.status(400).json({ data: rolesDB, msg: 'None role found' });

        if (!is_cgiar) {
            user.hashPassword();
        }
        let userCreated = await userRepository.save(user);
        res.status(201).json({ msg: 'User created', data: userCreated });


    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'User can not be created', data: error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { firstname, lastname, username, email, password, roles, is_cgiar } = req.body;

    const userRepository = getRepository(Users);
    try {
        user = await userRepository.findOneOrFail(id);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        user.roles = roles;
        user.is_cgiar = is_cgiar;
        if (!is_cgiar) {
            user.hashPassword();
        }
        await userRepository.save(user);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'User not found' });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        await userRepository.save(user);

    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Username already in use' });
    }
    res.status(201).json({ msg: 'User update' });
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
        user = await userRepository.findOneOrFail(id);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'User not found' });
    }

    // remove user
    userRepository.delete(id);
    res.status(201).json({ msg: 'User deleted' });

};