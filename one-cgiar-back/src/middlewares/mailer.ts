import nodemailer from 'nodemailer';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
const hbs = require('nodemailer-express-handlebars');

require('dotenv').config();



const transporter = nodemailer.createTransport({
    host: process.env.emailHost,
    port: process.env.emailPort,
    logger: true,
    debug: true,
    secure: false,
    auth: {
        user: process.env.emailUser,
        pass: process.env.emaiPassword
    }
})

export async function notifyByEmail(data: any) {
    const email = {
        from: 'Soporte Neox',
        to: 'f.elvira@cgiar.org',
        subject: '👀 Hola ' + data.name,
        text: 'BlaBlaBla',
        // context: { data. }
    };
    await transporter.sendMail(email).catch(error => {
        console.log(error)
        throw new APIError(
            'EMAIL ERROR',
            HttpStatusCode.BAD_REQUEST,
            true,
            error
        );
    });
}