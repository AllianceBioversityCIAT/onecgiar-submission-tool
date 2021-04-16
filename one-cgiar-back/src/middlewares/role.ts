import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { InitiativesByUsers } from '../entity/InititativesByUsers'
import { Users } from '../entity/Users'
import { accessCtrl } from './access-control'

export const checkRole = (entityName: string, permissionActions: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(Users);
        const initvUserRepo = getRepository(InitiativesByUsers);

        try {

            //let usrRoleInitv = await initvUserRepo.find({ where: { user: userId }, relations: ['role'] })

            // let rolesAcronyms = usrRoleInitv.map(usrRole => usrRole.role.acronym);

            let user = await userRepository.findOne(userId, { relations: ['roles'] });
            let rolesAcronyms = user.roles.map(role => role.acronym);
            // console.log(rolesAcronyms)
            const permission = accessCtrl.can(rolesAcronyms)[permissionActions](entityName);
            if (permission.granted) {
                next();
            } else {
                res.status(401).json({ msg: 'No authorized' });
            }

        } catch (error) {
            console.log('check role permissions');
            console.log(error);
            return res.status(401).json({ msg: 'No authorized' });
        }
    }
}

// const validateMultipleAction = (rolesAcronyms: string[], permissionActions: string, entityName: string) => {
//     const actions = permissionActions.split(',');
//     if (actions.length === 1) {
//         return accessCtrl.can(rolesAcronyms)[permissionActions](entityName);
//     } else {

//         actions.forEach(action => {
//             console.log(accessCtrl.can(rolesAcronyms)[action](entityName).granted)
//         });

//     }
// }