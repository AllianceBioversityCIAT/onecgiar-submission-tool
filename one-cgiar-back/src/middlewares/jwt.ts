import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config';
import { utilLogin } from '../utils/auth-login';

const jwtSecret = process.env.jwtSecret;

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {

    // get credential if is application user
    const authBasic = req.headers.authorization;
    const credentials = authBasic ? authBasic.split('Basic ')[1] : null;
    console.log(credentials, authBasic)
    let jwtPayload, token_;

    try {

        if (credentials) {
            // decode nase 64 string
            let cre = Buffer.from(credentials, 'base64').toString('utf-8')
            // // basic auth token creation
            const email = cre.split(':')[0];
            const password = cre.split(':')[1];
            const { token } = await utilLogin(email, password);
            token_ = token;
        } else {
            // get SBT authorization token
            token_ = <string>req.headers['auth'];
        }
        
        console.log(token_)
        jwtPayload = <any>jwt.verify(token_, jwtSecret);
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