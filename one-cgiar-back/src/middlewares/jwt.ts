import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config';
import { utilLogin } from '../utils/auth-login';

const jwtSecret = process.env.jwtSecret;

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {

    // get credential if is application user
    const authBasic = req.headers.authorization;
    const credentials = authBasic ? authBasic.split('Basic ')[1] : null;
    let jwtPayload, token;

    try {

        if (credentials) {
            const email = credentials.split(':')[0];
            const password = credentials.split(':')[1];
            const { token, name, roles, id } = await utilLogin(email, password);
            // token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '7h' });
        } else {
            // get SBT authorization token
            token = <string>req.headers['auth'];
        }

        console.log(credentials)
        jwtPayload = <any>jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: `Not authorized: ${error.message}` });
    }
    const { userId, first_name, last_name } = jwtPayload;

    const newToken = jwt.sign({ userId, first_name, last_name }, jwtSecret, { expiresIn: '7h' });
    res.setHeader('token', newToken);
    next();

}