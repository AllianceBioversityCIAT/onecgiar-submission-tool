import {EntityRepository, getRepository, Repository} from 'typeorm';
import {Users} from '../entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async findOneUserByRoleAndInitRole(initiativeId, userId) {
    const userRepo = getRepository(Users);

    try {
      let userInfo: any = await userRepo.findOne({
        where: {id: userId},
        relations: ['roles']
      });

      const userInitRoleQuery = `SELECT  a.id, a.active, a.initiativeId, a.userId, a.roleId,
      r.acronym, r.name, r.description
      FROM initiatives_by_users a
      join roles r 
        on a.roleId = r.id 
      where a.initiativeId = ${initiativeId}
        and a.userId = ${userId}
        and a.active = 1`;

      let userInitRole = await this.query(userInitRoleQuery);

      typeof userInitRole === 'undefined' ? [] : userInitRole;
      if (userInitRole.length > 0) {
        console.log(userInitRole);

        userInfo['userInitRole'] = userInitRole.filter((userInitRole) => {
          return userInfo.id === userInitRole.userId;
        });
      }

      return userInfo;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
