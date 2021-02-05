const got = require('got');
require('dotenv').config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}


export const getClaActionAreas = async () => {
    try {
        const actionAreas = await got(clarisaHost + 'action-areas', { headers: clarisaHeader });
        return JSON.parse(actionAreas.body);
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}