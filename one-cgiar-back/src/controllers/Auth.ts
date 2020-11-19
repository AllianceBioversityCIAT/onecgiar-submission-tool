import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import { validate } from 'class-validator'
import { User } from '../entity/User'
import config from '../config/config'
let ActiveDirectory = require('activedirectory')

export const login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    if (!(username && password)) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
        username = username.trim().toLowerCase();
        let cgiar_user = await userRepository.findOne({
            where: [
                { email: username, is_cgiar: 1 },
                { username, is_cgiar: 1 },
            ]
        });
        if (cgiar_user) {
            let is_cgiar = await validateAD(cgiar_user, password);
            if (is_cgiar) {
                user = cgiar_user;
            }

        } else if (!(username && password)) {
            res.status(404).json({ msg: 'Missing required email and password fields.' })
        } else {
            user = await userRepository.findOneOrFail({
                where: [
                    { username },
                    { email: username }
                ]

            });
        }

        // check password
        if (!cgiar_user && !user.checkPassword(password)) {
            return res.status(400).json({ msg: 'username or password failed' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '7h' });

        const name = user.username;
        const role = user.role;

        res.json({ msg: 'OK', token, name, role });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Username or password failed' });
    }

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

const validateAD = (one_user, password) => {
    let ad = new ActiveDirectory(config.active_directory);

    let ad_user = one_user.username + "@" + config.active_directory.domain;
    return new Promise((resolve, reject) => {
        ad.authenticate(ad_user, password, (err, auth) => {
            if (err) {
                if (err.errno == "ENOTFOUND") {
                    let notFound = {
                        'errno': 'SERVER_NOT_FOUND',
                        'description': 'Domain Controller Server not found'
                    };
                    return reject(notFound);
                }
            }

            if (auth) {
                console.log('Authenticated AD!');
                return resolve(auth);
            }

            else {
                console.log('Authentication failed!');
                let err = {
                    'errno': 'INVALID_CREDENTIALS',
                    'description': 'The supplied credential is invalid'
                };
                return reject(err);
            }

        })
    });
}