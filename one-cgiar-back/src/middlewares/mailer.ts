import nodemailer from 'nodemailer';
import {APIError} from '../handlers/BaseError';
import {HttpStatusCode} from '../interfaces/Constants';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.emailHost,
  port: process.env.emailPort,
  logger: true,
  debug: true,
  secure: false,
  ignoreTLS: true,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.emailUser,
    pass: process.env.emaiPassword
  }
});

export async function notifyByEmail() {
  const email = {
    from: 'Soporte Neox',
    to: 'f.elvira@cgiar.org',
    subject: '👀 Hola ',
    text: 'BlaBlaBla'
    // context: { data. }
  };
  await transporter.sendMail(email).catch((error) => {
    console.log(error);
    throw new APIError('EMAIL ERROR', HttpStatusCode.BAD_REQUEST, true, error);
  });
}
