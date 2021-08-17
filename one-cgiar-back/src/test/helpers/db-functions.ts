import {getConnection, getRepository} from 'typeorm'
import { Users } from '../../entity/Users'
import { BaseError } from '../../handlers/BaseError';
import { HttpStatusCode } from '../../handlers/Constants';

class DbFunctionsTest {

    // delete user
    public async deleteUser(id) {

        const queryRunner = getConnection().createQueryRunner().connection;

        const userRepository = getRepository(Users);
        let user: Users;

        try {
            user = await userRepository.findOne(id);
            if (user == null) {
                throw new BaseError(
                    'NOT FOUND',
                    HttpStatusCode.NOT_FOUND,
                    'User not found.',
                    true,
                );
            }
            user = await userRepository.remove(user);
            return { user }
        } catch (error) {
            return error
        }
    };

}

const dbfunctionstest = new DbFunctionsTest();
export default dbfunctionstest;