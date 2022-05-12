import {APIError, BaseError} from '../handlers/BaseError';
import {HttpStatusCode} from '../interfaces/Constants';
import {getConnection} from 'typeorm';
import axios from 'axios';
import {config} from 'dotenv';
import {Request, Response} from 'express';

config();

const clarisaHost = process.env.clarisa || 'https://clarisa.cgiar.org/api/';

/**
 * GET CLARISA ACTION AREAS
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
    return actionAreas.data;
  } catch (error) {
    console.log(error);
    throw new BaseError('CLARISA : Action Areas', 400, error.message, true);
  }
};

/**
 * GET CLARISA COUNTRIES
 * @returns clarisa countries
 */
export const getClaCountries = async () => {
  // export const getClaCountries = async (req: Request, res: Response) => {
  try {
    const countries = await axios.get(clarisaHost + 'countries', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return countries.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA REGIONS
 * @returns clarisa regions
 */
// export const getClaRegions = async (req: Request, res: Response) => {
export const getClaRegions = async () => {
  try {
    const regions = await axios.get(clarisaHost + 'un-regions', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return regions.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA REGIONS ONE CGIAR
 * @returns clarisa regions CGIAR
 */
export const getClaRegionsCgiar = async () => {
  try {
    const regions = await axios.get(clarisaHost + 'OneCGIARRegions', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return regions.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA INSTITUTIONS
 * @returns clarisa institutions
 */
// export const getClaInstitutions = async (req: Request, res: Response) => {
export const getClaInstitutions = async () => {
  try {
    const institutions = await axios.get(clarisaHost + 'institutionsSimple', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return institutions.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA INSTITUTIONS TYPES
 * @returns clarisa institutions types
 */
// export const getClaInstitutionsTypes = async (req: Request, res: Response) => {
export const getClaInstitutionsTypes = async () => {
  try {
    const institutionsTypes = await axios.get(
      clarisaHost + 'institution-types',
      {
        auth: {
          username: process.env['clarisa_user'],
          password: process.env['clarisa_password']
        }
      }
    );
    return institutionsTypes.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA CRPS
 * @returns clarisa crps
 */
// export const getClaCRPs = async (req: Request, res: Response) => {
export const getClaCRPs = async () => {
  try {
    const crps = await axios.get(clarisaHost + 'cgiar-entities', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return crps.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * REQUEST CLARISA INSTITUTIONS
 * @returns institution requested to clarisa
 * @param {name, acronym, websiteLink, institutionTypeCode, hqCountryIso, externalUserMail, externalUserName, externalUserComments}
 */
// export const requestClaInstitution = async (req: Request, res: Response) => {
export async function requestClaInstitution(req: Request, res: Response) {
  try {
    const queryRunner = getConnection().createQueryBuilder();
    // institution request body
    const {
      name,
      acronym,
      websiteLink,
      institutionTypeCode,
      hqCountryIso,
      externalUserMail,
      externalUserName,
      externalUserComments
    } = req.body;
    // get global unit from config table
    const config = await queryRunner.connection.query(`
        SELECT value FROM sbt_config WHERE name = 'global_unit' AND type = 'clarisa' AND active = 1;
        `);
    console.log(config[0].value);
    // global unit assigned to SBT **should come from DB config table
    const cgiarEntity = config[0].value;
    // axios request body params
    const params = {
      name,
      acronym,
      websiteLink,
      institutionTypeCode,
      hqCountryIso,
      externalUserMail,
      externalUserName,
      externalUserComments
    };

    // axios header
    const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
    };

    const requestedInst = await axios.post(
      clarisaHost + `${cgiarEntity}/institutions/institution-requests`,
      params,
      {headers}
    );

    res.json({message: requestedInst.data});
    // return response;
  } catch (error) {
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 * GET CLARISA IMPACT AREAS
 * @returns impactAreas
 */
export async function getImpactAreas() {
  try {
    const impactAreas = await axios.get(clarisaHost + 'impact-areas', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return impactAreas.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 * GET CLARISA IMPACT AREAS INDICATORS
 * @returns impactAreasIndicators
 */
export async function getImpactAreasIndicators() {
  try {
    const impactAreasIndicators = await axios.get(
      clarisaHost + 'impact-areas-indicators',
      {
        auth: {
          username: process.env['clarisa_user'],
          password: process.env['clarisa_password']
        }
      }
    );
    return impactAreasIndicators.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 *  GET CLARISA PROJECTED BENEFITS
 * @returns projectedBenefits
 */
export async function requestProjectedBenefits() {
  try {
    const projectedBenefits = await axios.get(
      clarisaHost + 'projectedBenefits',
      {
        auth: {
          username: process.env['clarisa_user'],
          password: process.env['clarisa_password']
        }
      }
    );
    return projectedBenefits.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 * GET CLARISA PROJECTED PROBABILITIES
 * @returns projectedProbabilities
 */
export async function requestProjectedProbabilities() {
  try {
    const projectedProbabilities = await axios.get(
      clarisaHost + 'projectedBenefitsProbabilities',
      {
        auth: {
          username: process.env['clarisa_user'],
          password: process.env['clarisa_password']
        }
      }
    );
    return projectedProbabilities.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 * GET CLARISA ACTION AREAS OUTCOMES INDICATORS
 * @returns actionAreasOutcomesIndicators
 */
export async function getActionAreasOutcomesIndicators() {
  try {
    const actionAreasOutcomesIndicators = await axios.get(
      clarisaHost + 'actionAreaOutcomeIndicators',
      {
        auth: {
          username: process.env['clarisa_user'],
          password: process.env['clarisa_password']
        }
      }
    );
    return actionAreasOutcomesIndicators.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
}

/**
 * GET CLARISA SDG TARGETS
 * @returns clarisa SDG TARGETS
 */
export const getClaSdgTargets = async () => {
  try {
    const sdgTargets = await axios.get(clarisaHost + 'allSDGTargets', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return sdgTargets.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};

/**
 * GET CLARISA GLOBAL TARGETS
 * @returns clarisa GLOBAL TARGETS
 */
export const getClaGlobalTargest = async () => {
  try {
    const globalTargets = await axios.get(clarisaHost + 'globalTargets', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return globalTargets.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};


/**
 * GET CLARISA STUDY TYPES
 * @returns clarisa SDG TARGETS
 */
 export const getClaMeliaStudyTypes = async () => {
  try {
    const sdgTargets = await axios.get(clarisaHost + 'MELIA/study-types', {
      auth: {
        username: process.env['clarisa_user'],
        password: process.env['clarisa_password']
      }
    });
    return sdgTargets.data;
  } catch (error) {
    console.log(error);
    throw new APIError(
      'NOT FOUND',
      HttpStatusCode.NOT_FOUND,
      true,
      error.message
    );
  }
};
