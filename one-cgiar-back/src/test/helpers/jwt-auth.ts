import jwt from 'jsonwebtoken';

require('dotenv').config();

const jwtSecret = process.env.jwtSecret;

export class jwtAuth {

  public async createToken(user:any): Promise<string> {

    const token = jwt.sign(
      {userId: user.id, email: user.email},
      jwtSecret,
      {
        expiresIn: '7h' 
      },
    );

    return token;
  }


}

const jwtauth = new jwtAuth();
export default jwtauth;
