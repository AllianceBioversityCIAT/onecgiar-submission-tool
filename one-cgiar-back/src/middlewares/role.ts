import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { Users } from '../entity/Users'

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(Users);
        let user: Users;

        try {
            user = await userRepository.findOneOrFail(userId, { relations: ['roles'] });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: 'No authorized' });
        }

        // check
        const checked = false;
        // roles.some(role => {
        //     // return user.roles.some(userRole => userRole.acronym === role)
        // })
        if (checked) {
            next();
        } else {
            res.status(401).json({ msg: 'No authorized' });
        }
    }
}
