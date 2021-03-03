import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { Users } from '../entity/Users';
import config from '../config/config';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
import { ResponseHandler } from '../handlers/Response';


require('dotenv').config();


let ActiveDirectory = require('activedirectory');

const jwtSecret = process.env.jwtSecret;

export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    const userRepository = getRepository(Users);
    let user: Users;

    try {
        if (!(email && password)) {
            throw new APIError(
                'INVALID',
                HttpStatusCode.BAD_REQUEST,
                true,
                'Missing required fields: email or password.'
            );
        }
        email = email.trim().toLowerCase();
        let cgiar_user = await userRepository.findOne({
            where:
                { email, is_cgiar: 1 },
            relations: ['roles']
        });
        if (cgiar_user) {
            let is_cgiar = await validateAD(cgiar_user, password);
            if (is_cgiar) {
                user = cgiar_user;
            }

        } else {
            user = await userRepository.findOne({
                where: { email },
                relations: ['roles']
            });
            if (!user) {
                throw new APIError(
                    'NOT_FOUND',
                    HttpStatusCode.NOT_FOUND,
                    true,
                    'User not found.'
                );
            }
        }

        // check password
        if (!cgiar_user && !user.checkPassword(password)) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'User password incorrect.'
            );
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '7h' });
        const name = user.first_name + ' ' + user.last_name;
        const roles = user.roles;
        const id = user.id;

        res.json(new ResponseHandler('User logged.', { token, name, email: user.email, id, roles }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

};

export const changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;


    const userRepository = getRepository(Users);
    let user: Users;

    try {
        if (!(oldPassword && newPassword)) {
            throw new APIError(
                'BAD_REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                'Old and new passwords are required.'
            );
        }
        user = await userRepository.findOneOrFail(userId);
        if (!user.checkPassword(oldPassword)) {
            throw new APIError(
                'UNAUTHORIZED',
                HttpStatusCode.UNAUTHORIZED,
                true,
                'Check your old password.'
            );
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
    } catch (error) {
        // console.log(e)
        // let error = new ParseError(e)
        // res.status(400).json({ msg: 'Something was wrong' });
        return res.status(error.httpCode).json({ msg: error.name, data: error.stack });
    }


}

const validateAD = (one_user, password) => {
    let ad = new ActiveDirectory(config.active_directory);

    let ad_user = one_user.email;
    return new Promise((resolve, reject) => {
        ad.authenticate(ad_user, password, (err, auth) => {
            if (err) {
                if (err.errno == "ENOTFOUND") {
                    let notFound = {
                        'name': 'SERVER_NOT_FOUND',
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
                    'name': 'INVALID_CREDENTIALS',
                    'description': 'The supplied credential is invalid'
                };
                return reject(err);
            }

        })
    });
}