import {getRepository} from 'typeorm';
import {Users} from '../entity/Users';
import {BaseError} from '../handlers/BaseError';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import ActiveDirectory from 'activedirectory';

const ad = new ActiveDirectory(config.active_directory);
const jwtSecret = process.env.jwtSecret;
const jwtTocSecret = process.env.jwtTocSecret;

export const utilLogin = async (email: string, password: string) => {
  const userRepository = getRepository(Users);
  let user: Users;
  // console.log(email,password)

  if (!(email && password)) {
    // throw new BaseError(
    //     'INVALID',
    //     HttpStatusCode.BAD_REQUEST,
    //     'Missing required fields: email or password.',
    //     true
    // );
    throw new BaseError(
      'Util Login',
      400,
      'Missing required fields: email or password.',
      false
    );
  }
  email = email.trim().toLowerCase();
  let cgiar_user = await userRepository.findOne({
    where: {email, is_cgiar: 1, is_active: true},
    relations: ['roles']
  });
  if (cgiar_user) {
    let is_cgiar = await validateAD(cgiar_user, password);
    if (is_cgiar) {
      user = cgiar_user;
    }
  } else {
    user = await userRepository.findOne({
      where: {email, is_active: true},
      relations: ['roles']
    });
    if (!user) {
      // throw new BaseError(
      //     'NOT_FOUND',
      //     HttpStatusCode.NOT_FOUND,
      //     'User not found.',
      //     true
      // );
      throw new BaseError('Util Login', 400, 'User not found.', false);
    }
  }

  // check password
  if (!cgiar_user && !user.checkPassword(password)) {
    // throw new BaseError(
    //     'NOT FOUND',
    //     HttpStatusCode.NOT_FOUND,
    //     'User password incorrect.',
    //     true
    // );

    throw new BaseError(
      'Util Login',
      400,
      'The user or password is incorrect.',
      false
    );
  }
  user.last_login = new Date();
  user = await userRepository.save(user);

  const token = jwt.sign({userId: user.id, email: user.email}, jwtSecret, {
    expiresIn: '7h'
  });
  const name = user.first_name + ' ' + user.last_name;
  const roles = user.roles;
  const id = user.id;

  return {token, name, roles, id};
};

const validateAD = async (one_user, password) => {
  // ad = new ActiveDirectory(config.active_directory);
  let ad_user = one_user.email;
  // console.log(ad_user);

  return new Promise((resolve, reject) => {
    // var userPrincipalName = 'j.cadavid@cgiar.org';
    // var username = 'CN=Juan,OU=Users,DC=CGIARAD,DC=ORG';

    ad.authenticate(ad_user, password, (err, auth) => {
      if (auth) {
        console.log('Authenticated AD!', JSON.stringify(auth));
        return resolve(auth);
      }
      if (err) {
        console.log('ERROR AUTH: ' + JSON.stringify(err));
        let notFound = {
          name: 'SERVER_NOT_FOUND',
          description: `There was an internal server error: ${err.lde_message}`,
          httpCode: 400
        };
        if (err.errno == 'ENOTFOUND') {
          notFound.name = 'SERVER_NOT_FOUND';
          notFound.description = 'Server not found';
        }
        // console.log(err)
        // console.log(typeof err)

        return reject(notFound);
      } else {
        console.log('Authentication failed!');
        let err = {
          name: 'INVALID_CREDENTIALS',
          description: 'The supplied credential is invalid',
          httpCode: 400
        };

        console.log('ERROR: ' + JSON.stringify(err));
        return reject(err);
      }
    });
  });
};

export async function generateToCtoken(userId) {
  const userRepo = getRepository(Users);

  try {
    const user = await userRepo.findOne({id: userId});

    if (!user) {
      throw new BaseError('Read Context: Error', 400, `User not found`, false);
    }

    const token = jwt.sign({email: user.email}, jwtTocSecret, {
      expiresIn: '5m'
    });

    return token;
  } catch (error) {
    throw new BaseError(
      'Error generating ToC Token - Utils',
      400,
      error.message,
      false
    );
  }
}

export async function validateToCtoken(Toctoken) {
  const userRepo = getRepository(Users);

  try {
    const decodeToken: any = await jwt.decode(Toctoken);

    const email = decodeToken.email;

    const userInfo = await userRepo.findOne({
      select: ['first_name', 'last_name', 'email'],
      where: {email: email}
    });

    if (!userInfo) {
      throw new BaseError('Read Context: Error', 400, `User not found`, false);
    }

    return userInfo;
  } catch (error) {
    throw new BaseError(
      'Error validating ToC Token - Utils',
      400,
      error.message,
      false
    );
  }
}
