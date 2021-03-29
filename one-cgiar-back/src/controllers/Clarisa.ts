import { APIError } from "../handlers/BaseError";
import { HttpStatusCode } from "../handlers/Constants";

const got = require('got');
require('dotenv').config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}

const PAGE_SIZE = 20;


export const getClaActionAreas = async () => {
    try {
        const actionAreas = await got(clarisaHost + 'action-areas', { headers: clarisaHeader });
        return JSON.parse(actionAreas.body);
    } catch (error) {
        console.log(error)
        throw new APIError(
            'NOT FOUND',
            HttpStatusCode.NOT_FOUND,
            true,
            error.message
        );
    }

}

export const getClaCountries = async (page) => {
    try {
        const countries = await got(clarisaHost + 'countries', { headers: clarisaHeader });
        return sortAndPaginate(page, countries.body, 'name');
    } catch (error) {
        console.log(error)
        throw new APIError(
            'NOT FOUND',
            HttpStatusCode.NOT_FOUND,
            true,
            error.message
        );
    }

}
export const getClaRegions = async (page) => {
    try {
        const regions = await got(clarisaHost + 'un-regions', { headers: clarisaHeader });
        return sortAndPaginate(page, regions.body, 'name');
    } catch (error) {
        console.log(error)
        throw new APIError(
            'NOT FOUND',
            HttpStatusCode.NOT_FOUND,
            true,
            error.message
        );
    }

}

const sortAndPaginate = async (page = 1, stringResponse, property?) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE
    const parsedResponse = JSON.parse(stringResponse);

    let sorted = parsedResponse.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    return sorted.slice(startIndex, endIndex);
}