import { Request, Response } from 'express'
import { getRepository, In, QueryFailedError } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Users } from '../entity/Users'
import { Roles } from '../entity/Roles';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
import { ResponseHandler } from '../handlers/Response';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { InitiativesByUsers } from '../entity/InititativesByUsers';

// get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(Users);
    let users;

    try {
        users = await userRepository.find({select:['first_name', 'last_login', 'last_name', 'email', 'is_active', 'id']});
        return res.json({ data: users, msg: 'Users list' });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Something went wrong', data: error });
    }


};

// get users by roles
export const getUsersByRoles = async (req: Request, res: Response): Promise<Response> => {
    const { roles } = req.query;
    const userRepository = getRepository(Users);
    let users;
    try {
        users = await userRepository.createQueryBuilder("users")
            .innerJoinAndSelect("users.roles", "roles")
            .where("roles.id In(:roles)", { roles })
            // .getSql()
            .getMany();

        // console.log(users)
        return res.json({ data: users, msg: 'Users by roles list' });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: 'Something went wrong', data: error });
    }

}


// get user by id
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
        const user = await userRepository.findOne(id);
        res.json({ data: user, msg: 'User data' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Something went wrong', data: error });
    }
};

// create new user
export const createUsers = async (req: Request, res: Response) => {
    const { first_name, last_name, password, roles, email, is_cgiar, initiativeId } = req.body;
    const userRepository = getRepository(Users);
    const rolesRepository = getRepository(Roles);
    const usrInitvRepository = getRepository(InitiativesByUsers);

    const user = new Users();
    user.first_name = first_name;
    user.last_name = last_name;
    user.password = password;
    user.email = email;
    user.is_cgiar = is_cgiar;
    user.is_active = true;
    try {


        // validate
        const errors = await validate(user);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        }
        const rolesDB = await rolesRepository.find({
            select: ['id'],
            where: { id: In(roles) },
            order: { created_at: "ASC" },
        });

        if (rolesDB && rolesDB.length > 0)
            user.roles = rolesDB;
        else {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Roles not found.'
            );
        }

        if (!is_cgiar) {
            user.hashPassword();
        }
        let userCreated = await userRepository.save(user);

        if (initiativeId) {
            const userByInitiative = new InitiativesByUsers();
            userByInitiative.initiative = initiativeId;
            userByInitiative.user = userCreated;
            userByInitiative.role = rolesDB[0];
            userByInitiative.active = true;

            let usrIntv = await usrInitvRepository.save(userByInitiative);

            console.log(usrIntv);
        }
        delete userCreated.password;

        res.json(new ResponseHandler('User logged.', { user: userCreated }));

    } catch (error) {
        if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
            error['httpCode'] = HttpStatusCode.INTERNAL_SERVER
        }
        return res.status(error.httpCode).json(error);
        // return res.status(409).json({ msg: 'User can not be created', data: error });
    }
};

// update new user
export const updateUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { firstname, lastname, email, password, roles, is_cgiar } = req.body;

    const userRepository = getRepository(Users);
    try {
        user = await userRepository.findOne(id);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        user.roles = roles;
        user.is_cgiar = is_cgiar;


        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        if (!is_cgiar) {
            user.hashPassword();
        }


        user = await userRepository.save(user);
        res.json(new ResponseHandler('User updated.', { user }));
    } catch (error) {
        console.log(error);
        return res.status(error.httpCode).json(error);
    }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
        user = await userRepository.findOne(id);
        if (user == null) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'User not found.'
            );
        }
        user.is_active = false;
        user = await userRepository.save(user);
        res.json(new ResponseHandler('User inactivated.', { user }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

    // remove user
    // userRepository.delete(id);
    // res.status(201).json({ msg: 'User deleted' });

};