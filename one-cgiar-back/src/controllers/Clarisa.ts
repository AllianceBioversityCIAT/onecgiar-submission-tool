import { APIError } from "../handlers/BaseError";
import { HttpStatusCode } from "../handlers/Constants";
import { getConnection, getRepository, Like, QueryFailedError } from "typeorm";
import { ClarisaInstitutions } from "../entity/ClarisaIntitutions";
import { ResponseHandler } from "../handlers/Response";
import { Request, Response } from 'express'
import axios from 'axios';
import { config } from 'dotenv';
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

config();


const clarisaHost = process.env.clarisa || 'https://clarisa.cgiar.org/api/';
// const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
// console.log(oa)
// const clarisaHeader = {
//     Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
// }

// const PAGE_SIZE = 20;


/**
 * 
 * @returns clarisa action areas
 */
export const getClaActionAreas = async () => {
    try {
        const actionAreas = await axios.get(clarisaHost + 'action-areas', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        // res.json(new ResponseHandler('CLARISA action areas.', { actionAreas: actionAreas.data }));
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


/**
 * 
 * @returns clarisa countries
 */
export const getClaCountries = async (req: Request, res: Response) => {
    try {
        const countries = await axios.get(clarisaHost + 'countries', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        res.json(new ResponseHandler('CLARISA countries.', { countries: countries.data }));
    } catch (error) {
        console.log(error)
        return res.status(error.response.status).json(error.toJSON().message);
    }
}



/**
 * 
 * @returns clarisa regions
 */
export const getClaRegions = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const regions = await axios.get(clarisaHost + 'un-regions', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        res.json(new ResponseHandler('CLARISA regions.', { regions: regions.data }));
    } catch (error) {
        console.log(error)
        return res.status(error.response.status).json(error.toJSON().message);
    }
}



/**
 * 
 * @returns clarisa institutions
 */
export const getClaInstitutions = async (req: Request, res: Response) => {
    try {
        const institutions = await axios.get(clarisaHost + 'institutions', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        res.json(new ResponseHandler('CLARISA institutions.', { institutions: institutions.data }));
    } catch (error) {
        console.log(error)
        return res.status(error.response.status).json(error.toJSON().message);
    }
}



/**
 * 
 * @returns clarisa institutions types
 */
export const getClaInstitutionsTypes = async (req: Request, res: Response) => {
    try {
        const institutionsTypes = await axios.get(clarisaHost + 'institution-types', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        res.json(new ResponseHandler('CLARISA institutionsTypes.', { institutionsTypes: institutionsTypes.data }));
    } catch (error) {
        console.log(error)
        return res.status(error.response.status).json(error.toJSON().message);
    }
}



/**
 * 
 * @returns clarisa crps
 */
export const getClaCRPs = async (req: Request, res: Response) => {
    try {
        const crps = await axios.get(clarisaHost + 'cgiar-entities', {
            auth: {
                username: process.env['clarisa_user'],
                password: process.env['clarisa_password']
            }
        });
        res.json(new ResponseHandler('CLARISA crps.', { crps: crps.data }));
    } catch (error) {
        console.log(error)
        return res.status(error.response.status).json(error.toJSON().message);
    }
}

/**
 * @returns institution requested to clarisa
 * @param {name, acronym, websiteLink, institutionTypeCode, hqCountryIso, externalUserMail, externalUserName, externalUserComments}
 */
export const requestClaInstitution = async (req: Request, res: Response) => {
    try {
        const queryRunner = getConnection().createQueryBuilder();
        // institution request body
        const { name, acronym, websiteLink, institutionTypeCode, hqCountryIso, externalUserMail, externalUserName, externalUserComments } = req.body;
        // get global unit from config table
        const config = await queryRunner.connection.query(`
        SELECT value FROM sbt_config WHERE name = 'global_unit' AND type = 'clarisa' AND active = 1;
        `);
        console.log(config[0].value)
        // global unit assigned to SBT **should come from DB config table
        const cgiarEntity = config.value;
        // axios request body params
        const params = {
            name, acronym, websiteLink, institutionTypeCode, hqCountryIso, externalUserMail, externalUserName, externalUserComments
        }

        // axios header
        const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(oa).toString('base64')}`
        }

        const requestedInst = await axios.post(clarisaHost + `${cgiarEntity}/institutions/institution-requests`, params, { headers });
        res.json(new ResponseHandler('CLARISA requested institutions.', { requestedInstitution: requestedInst.data }));
        // return requestedInst.data;
    } catch (error) {
        console.log(error.toJSON())
        return res.status(error.response.status).json(error.toJSON().message);
    }
}













// export const getClaCountries = async (req: Request, res: Response) => {
//     const queryRunner = getConnection().createQueryBuilder();
//     const { filter } = req.query;
//     const sqlQuery = `
//     SELECT
//         countries.created_at AS created_at,
//         countries.updated_at AS updated_at,
//         countries.id AS id,
//         countries.code AS code,
//         countries.name AS name,
//         countries.isoAlpha2 AS isoAlpha2,
//         countries.data AS data
//     FROM
//         clarisa_countries countries
//     WHERE countries.name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     OR countries.isoAlpha2 COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     ORDER BY countries.code
//      `;
//     try {
//         const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
//             sqlQuery,
//             {},
//             {}
//         );
//         const filteredData = await queryRunner.connection.query(query, parameters);
//         res.json(new ResponseHandler('Countries.', { countries: filteredData }));
//     } catch (error) {
//         console.log(error);
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }
// export const getClaRegions = async (req: Request, res: Response) => {
//     const queryRunner = getConnection().createQueryBuilder();
//     const { filter } = req.query;
//     const sqlQuery = `
//     SELECT
//         regions.created_at AS created_at,
//         regions.updated_at AS updated_at,
//         regions.id AS id,
//         regions.code AS code,
//         regions.name AS name,
//         regions.parentRegionName AS parentRegionName,
//         regions.parentRegionCode AS parentRegionCode,
//         regions.data AS data
//     FROM
//         clarisa_regions regions
//     WHERE regions.name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     OR regions.parentRegionName COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     ORDER BY regions.code
//      `;

//     try {
//         const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
//             sqlQuery,
//             {},
//             {}
//         );
//         const filteredData = await queryRunner.connection.query(query, parameters);

//         res.json(new ResponseHandler('Regions.', { regions: filteredData }));
//     } catch (error) {
//         console.log(error);
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// export const getClaInstitutions = async (req: Request, res: Response) => {
//     // const clarisaRepo = getRepository(ClarisaInstitutions);
//     const queryRunner = getConnection().createQueryBuilder();
//     const { filter } = req.query;
//     const sqlQuery = `
//     SELECT
//         institutions.created_at AS created_at,
//         institutions.updated_at AS updated_at,
//         institutions.id AS id,
//         institutions.code AS code,
//         institutions.name AS name,
//         institutions.acronym AS acronym,
//         institutions.country_name AS country_name,
//         institutions.data AS data
//     FROM
//         clarisa_institutions institutions
//     WHERE institutions.name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     OR institutions.acronym COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     OR institutions.country_name COLLATE UTF8_GENERAL_CI LIKE '%${filter}%'
//     ORDER BY institutions.code
//      `;

//     try {
//         const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
//             sqlQuery,
//             {},
//             {}
//         );
//         const filteredData = await queryRunner.connection.query(query, parameters);


//         res.json(new ResponseHandler('Institutions.', { institutions: filteredData }));
//     } catch (error) {
//         console.log(error);
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }
