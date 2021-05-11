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


const ActiveDirectory = require('activedirectory');
const ad = new ActiveDirectory(config.active_directory);

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
                { email, is_cgiar: 1, is_active: true },
            relations: ['roles']
        });
        if (cgiar_user) {
            let is_cgiar = await validateAD(cgiar_user, password);
            if (is_cgiar) {
                user = cgiar_user;
            }

        } else {
            user = await userRepository.findOne({
                where: { email, is_active: true },
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
        user.last_login = new Date();
        user = await userRepository.save(user)

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
    // const { userId } = res.locals.jwtPayload;
    const { email, oldPassword, newPassword } = req.body;


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
        user = await userRepository.findOne({ where: { email } });
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

        res.json(new ResponseHandler('User updated.', { user }));
        // res.json({ msg: 'Password updated' });
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}

export const validateCGUser = async (req: Request, res: Response) => {
    const { email } = req.query;

    try {
        let validUser = await searchByEmail(email + '');
        // console.log(validUser);
        res.json(new ResponseHandler('Validate user.', { user: validUser }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * Active directory functions 
 * 
 */

const validateAD = (one_user, password) => {
    // ad = new ActiveDirectory(config.active_directory);
    let ad_user = one_user.email;
    return new Promise((resolve, reject) => {
        ad.authenticate(ad_user, password, (err, auth) => {
            if (err) {
                let notFound = {
                    'name': 'SERVER_NOT_FOUND',
                    'description': `There was an internal server error: ${err.lde_message}`,
                    'httpCode': 500
                };
                if (err.errno == "ENOTFOUND") {
                    notFound.name = 'SERVER_NOT_FOUND';
                    notFound.description = 'Domain Controller Server not found'
                }
                // console.log(notFound)
                return reject(new APIError(notFound));
            }

            if (auth) {
                console.log('Authenticated AD!');
                return resolve(auth);
            }

            else {
                console.log('Authentication failed!');
                let err = {
                    'name': 'INVALID_CREDENTIALS',
                    'description': 'The supplied credential is invalid',
                    'httpCode': 503
                };
                return reject(new APIError(err));
            }

        })
    });
}

const searchByEmail = (email) => {
    // let ad = new ActiveDirectory(config.active_directory);
    return new Promise((resolve, reject) => {
        ad.findUser(email, (err, user) => {
            if (err) {
                if (err.errno == "ENOTFOUND") {
                    let notFound = {
                        'name': 'SERVER_NOT_FOUND',
                        'description': 'Domain Controller Server not found',
                        'httpCode': 500
                    };
                    return reject(new APIError(notFound));
                } else {
                    let e = {
                        name: 'SERVER_NOT_FOUND',
                        description: err.lde_message,
                        httpcode: 500
                    }
                    return reject(new APIError(e));
                }
            }
            if (!user) {
                return reject(new APIError({
                    name: 'USER_NOT_FOUND',
                    description: `User: ${email} not found`,
                    'httpCode': 404
                }));
            }
            else {
                return resolve(JSON.stringify(user))
            }
        })
    })
}

