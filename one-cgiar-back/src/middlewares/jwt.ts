import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config';

const jwtSecret = process.env.jwtSecret;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    
    const token = <string>req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: `Not authorized: ${error.message}` });
    }
    const { userId, first_name, last_name } = jwtPayload;

    const newToken = jwt.sign({userId, first_name, last_name}, jwtSecret, {expiresIn: '7h'});
    res.setHeader('token', newToken);
    next();

}