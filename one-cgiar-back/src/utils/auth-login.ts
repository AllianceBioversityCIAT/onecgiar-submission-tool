import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { APIError } from "../handlers/BaseError";
import { HttpStatusCode } from "../handlers/Constants";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

const ActiveDirectory = require('activedirectory');
const ad = new ActiveDirectory(config.active_directory);
const jwtSecret = process.env.jwtSecret;


export const utilLogin = async (email: string, password: string) => {
    const userRepository = getRepository(Users);
    let user: Users;
    // console.log(email,password)

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

    return { token, name, roles, id }

}

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