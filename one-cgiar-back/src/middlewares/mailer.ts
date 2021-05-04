import nodemailer from 'nodemailer';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
const hbs = require('nodemailer-express-handlebars');

require('dotenv').config();



// const transporter = nodemailer.createTransport({
//     host: process.env.emailHost,
//     port: process.env.emailPort,
//     logger: true,
//     debug: true,
//     secure: false,
//     auth: {
//         user: process.env.emailUser,
//         pass: process.env.emaiPassword
//     }
// })

export async function notifyByEmail(data: any) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "f.elvira@cgiar.org", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // const email = {
    //     from: 'Soporte Neox',
    //     to: 'f.elvira@cgiar.org',
    //     subject: '👀 Hola ' + data.name,
    //     text: 'BlaBlaBla',
    //     // context: { data. }
    // };
    // await transporter.sendMail(email).catch(error => {
    //     console.log(error)
    //     throw new APIError(
    //         'EMAIL ERROR',
    //         HttpStatusCode.BAD_REQUEST,
    //         true,
    //         error
    //     );
    // });
}