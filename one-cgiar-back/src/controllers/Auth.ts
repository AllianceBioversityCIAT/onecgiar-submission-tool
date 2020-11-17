import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import { validate } from 'class-validator'
import { User } from '../entity/User'
import config from '../config/config'

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Username or password failed' });
    }

    // check password
    if (!user.checkPassword(password)) {
        return res.status(400).json({ msg: 'username or password failed' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {expiresIn: '7h'});

    const name = user.username;
    const role = user.role;

    res.json({ msg: 'OK', token, name, role });

};

export const changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
        res.status(400).json({ msg: 'Old and new password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail(userId);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Something was wrong' });
    }

    if (!user.checkPassword(oldPassword)) {
        return res.status(401).json({ msg: 'Check your old password' });
    }

    user.password = newPassword;
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    // hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ msg: 'Password updated' });

}