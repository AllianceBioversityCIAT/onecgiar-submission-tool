import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { User } from '../entity/User'
import { Roles } from '../entity/Roles';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(User);
    let users;

    try {
        users = await userRepository.find({ relations: ['roles'] });
        return res.json(users)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Something went wrong' });
    }

    if (users.length > 0) {
        return res.json(users);
    } else {
        return res.status(404).json({ msg: 'No Results' });
    }

};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOneOrFail(id, { relations: ['roles'] });
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'No results' });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    const { firstname, lastname, username, password, roles, email, is_cgiar } = req.body;
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = password;
    user.roles = roles;
    user.email = email;
    user.is_cgiar = is_cgiar;

    // validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const userRepository = getRepository(User);
    try {
        if (!is_cgiar) {
            user.hashPassword();
        }
        await userRepository.save(user);
    } catch (error) {
        console.log(error);
        return res.status(409).json({ msg: 'Username already exist' });
    }
    res.send('User created');
};

export const updateUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { firstname, lastname, username, email, password, roles, is_cgiar } = req.body;

    const userRepository = getRepository(User);
    try {
        user = await userRepository.findOneOrFail(id);
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
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
    const userRepository = getRepository(User);
    let user: User;

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