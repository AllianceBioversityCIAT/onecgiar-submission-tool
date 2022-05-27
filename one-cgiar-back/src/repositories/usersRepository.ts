import {EntityRepository, getRepository, Repository} from 'typeorm';
import {Users} from '../entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    
  async findOneUserByRoleAndInitRole(initiativeId,userId) {

    const userRepo = getRepository(Users);

   let userInfo:any = await userRepo.findOne({
        where: {id: userId},
        relations: ['roles']
      });

    const userInitRoleQuery = `SELECT *
    FROM initiatives_by_users a
    where a.initiativeId = ${initiativeId}
      and a.userId = ${userId}
      and a.active = 1`;

    const userInitRole = await this.query(userInitRoleQuery);

    userInfo.map((userInfo) => {
        userInfo['userInitRole'] = userInitRole.filter((userInitRole) => {
            return userInfo.id === userInitRole.userId;
          });

    })

    return userInfo;
  }
}
