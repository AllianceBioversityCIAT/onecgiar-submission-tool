import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { User } from '../entity/User'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(User);
    let users;

    try {
        users = await userRepository.find();
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
        const user = await userRepository.findOneOrFail(id);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'No results' });
    }
};

export const createUsers = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    // validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const userRepository = getRepository(User);
    try {
        user.hashPassword();
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
    const { username, role } = req.body;

    const userRepository = getRepository(User);
    try {
        user = await userRepository.findOneOrFail(id);
        user.username = username;
        user.role = role;
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