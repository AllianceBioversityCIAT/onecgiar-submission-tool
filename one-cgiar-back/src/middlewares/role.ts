import { Request, Response, NextFunction } from 'express'
import { getConnection, getRepository } from 'typeorm'
import { InitiativesByUsers } from '../entity/InititativesByUsers'
import { Users } from '../entity/Users'
import { accessCtrl } from './access-control'

export const checkRole = (entityName: string, permissionActions: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(Users);

        try {

            let user = await userRepository.findOne(userId, { relations: ['roles'] });
            let rolesAcronyms = user.roles.map(role => role.acronym);
            const permission = accessCtrl.can(rolesAcronyms)[permissionActions](entityName);
            
            if (permission.granted) {
                next();
            } else {
                res.status(400).json({ msg: 'No authorized' });
            }

        } catch (error) {
            console.log('check role permissions');
            console.log(error);
            return res.status(400).json({ msg: 'No authorized' });
        }
    }
}
