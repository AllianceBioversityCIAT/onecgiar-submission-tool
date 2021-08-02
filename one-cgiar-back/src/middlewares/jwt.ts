import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { BaseError } from '../handlers/BaseError';
import { utilLogin } from '../utils/auth-login';

const jwtSecret = process.env.jwtSecret;

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {

    // get credential if is application user
    const authBasic = req.headers.authorization;
    const credentials = authBasic ? authBasic.split('Basic ')[1] : null;

    let jwtPayload, token_;

    try {
        if (credentials) {
            // decode nase 64 string
            let cre = Buffer.from(credentials, 'base64').toString('utf-8')
            // basic auth token creation
            const email = cre.split(':')[0];
            const password = cre.split(':')[1];
            const { token } = await utilLogin(email, password);
            // get token
            token_ = token;
        } else {
            // get SBT authorization token
            token_ = <string>req.headers['auth'];
        }

        jwtPayload = <any>jwt.verify(token_, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        error = new BaseError(error.name, 400, error.message, false);
        return res.status(error.httpCode).json(error);
    }
    const { userId, first_name, last_name } = jwtPayload;

    const newToken = jwt.sign({ userId, first_name, last_name }, jwtSecret, { expiresIn: '7h' });
    res.setHeader('token', newToken);
    next();

}