import { APIError } from "../handlers/BaseError";
import { HttpStatusCode } from "../handlers/Constants";
import axios from 'axios';
import { getConnection, getRepository, Like } from "typeorm";
import { ClarisaInstitutions } from "../entity/ClarisaIntitutions";
import { ResponseHandler } from "../handlers/Response";
import { Request, Response } from 'express'

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
        const actionAreas = await axios.get(clarisaHost + 'action-areas', { headers: clarisaHeader });
        return actionAreas.data;
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
        return JSON.parse(countries.body);
        // return sortAndPaginate(page, countries.body, 'name');
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
        return JSON.parse(regions.body);
        // return sortAndPaginate(page, regions.body, 'name');
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

export const getClaInstitutions = async (req: Request, res: Response) => {
    // const clarisaRepo = getRepository(ClarisaInstitutions);
    const queryRunner = getConnection().createQueryBuilder();
    const { filter } = req.query;
    const sqlQuery = `
    SELECT
        institutions.created_at AS created_at,
        institutions.updated_at AS updated_at,
        institutions.id AS id,
        institutions.code AS code,
        institutions.name AS name,
        institutions.acronym AS acronym,
        institutions.country_name AS country_name,
        institutions.data AS data
    FROM
        clarisa_institutions institutions
    WHERE institutions.name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
    OR institutions.acronym COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
    OR institutions.country_name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
    ORDER BY institutions.code
    LIMIT 10
    `;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            sqlQuery,
            {},
            {}
        );
        const filteredData = await queryRunner.connection.query(query, parameters);


        res.json(new ResponseHandler('Institutions.', { institutions: filteredData }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}

const sortAndPaginate = async (page = 1, stringResponse, property?) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE
    const parsedResponse = JSON.parse(stringResponse);

    let sorted = parsedResponse.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    return sorted.slice(startIndex, endIndex);
}