import {getRepository, getCustomRepository} from 'typeorm';
import {ClarisaInstitutions} from '../entity/ClarisaIntitutions';
import * as clarisa from '../controllers/Clarisa';
import {ClarisaImpactAreas} from '../entity/ClarisaImpactAreas';
import {ClarisaActionAreas} from '../entity/ClarisaActionAreas';
import {ClarisaInstitutionsTypes} from '../entity/ClarisaInstitutionsTypes';
import {ClarisaCountries} from '../entity/ClarisaCountries';
import {ClarisaRegions} from '../entity/ClarisaRegions';
import {ClarisaImpactAreasIndicators} from '../entity/ClarisaImpactAreasIndicators';
import {ClarisaProjectedBenefits} from '../entity/ClarisaProjectedBenefits';
import {ClarisaRegionsCgiar} from '../entity/ClarisaRegionsCgiar';
import {ClarisaSdgTargets} from '../entity/ClarisaSdgTargets';
import {ClarisaGlobalTargets} from '../entity/ClarisaGlobalTargets';
import {ClarisaActionAreasOutcomesIndicators} from '../entity/ClarisaActionAreasOutcomesIndicators';
import {ClarisaMeliaStudyTypes} from '../entity';
import {ProjectedProbabilitiesRepository} from '../repositories/ProjectedProbabilitiesRepository';

/**MAIN FUNCTION*/

export async function Main() {
  await createImpactAreas();
  await createActionAreas();
  await createInstitutions();
  await createInstitutionsTypes();
  await createCountries();
  await createRegions();
  await createImpactAreasIndicators();
  await createProjectedBenefits();
  await createRegionsCgiar();
  await createSdgTargets();
  await createGlobalTargets();
  await createActionAreasOutIndicators();
  await createMeliaStudyTypes();
  await createProjectProbabilities();
}

/**CLARISA IMPACT AREAS*/

export async function deleteImpactAreas() {
  try {
    const clarisaImpactAreasRepo = getRepository(ClarisaImpactAreas);
    const clarisaImpactAreas = new ClarisaImpactAreas();
    await clarisaImpactAreasRepo.delete(clarisaImpactAreas);
    console.log('2.delete clarisa impact areas');
  } catch (error) {
    console.log('deleteImpactAreas', error);
  }
}

export async function createImpactAreas() {
  console.log('1.start create impact areas');

  try {
    const clarisaImpactAreasRepo = getRepository(ClarisaImpactAreas);
    const impactAreas = await clarisa.getImpactAreas();

    if (impactAreas.length > 0) {
      await deleteImpactAreas();

      let impactAreasArray: ClarisaImpactAreas[] = [];
      let idTable = 0;

      for (let index = 0; index < impactAreas.length; index++) {
        const element = impactAreas[index];
        idTable = idTable + 1;
        let cla = clarisaImpactAreasRepo.create({
          id: idTable,
          name: element.name,
          description: element.name
        });
        impactAreasArray.push(cla);
      }

      await clarisaImpactAreasRepo.save(impactAreasArray);

      console.log('3.end create impact areas');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createImpactAreas', error);
  }
}

/**CLARISA ACTION AREAS*/

export async function deleteActionAreas() {
  try {
    const clarisaActionAreasRepo = getRepository(ClarisaActionAreas);
    const clarisaActiontAreas = new ClarisaImpactAreas();
    await clarisaActionAreasRepo.delete(clarisaActiontAreas);
    console.log('5.delete clarisa action areas');
  } catch (error) {
    console.log('deleteActionAreas', error);
  }
}

export async function createActionAreas() {
  console.log('4.start create action areas');

  try {
    const clarisaActionAreasRepo = getRepository(ClarisaActionAreas);
    const actionAreas = await clarisa.getClaActionAreas();

    if (actionAreas.length > 0) {
      await deleteActionAreas();

      let actionAreasArray: ClarisaActionAreas[] = [];
      let idTable = 0;

      for (let index = 0; index < actionAreas.length; index++) {
        const element = actionAreas[index];
        idTable = idTable + 1;
        let cla = clarisaActionAreasRepo.create({
          id: idTable,
          name: element.name,
          description: element.name
        });
        actionAreasArray.push(cla);
      }

      await clarisaActionAreasRepo.save(actionAreasArray);

      console.log('6.end create action areas');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createActionAreas', error);
  }
}

/**CLARISA INSTITUTIONS*/

export async function deleteInstitutions() {
  try {
    const clarisaRepo = getRepository(ClarisaInstitutions);
    const clarisaInstitutions = new ClarisaInstitutions();
    await clarisaRepo.delete(clarisaInstitutions);
    console.log('8.delete institutions');
  } catch (error) {
    console.log('deleteInstitutions', error);
  }
}

export async function createInstitutions() {
  console.log('7.start create institutions');

  try {
    const clarisaRepo = getRepository(ClarisaInstitutions);
    const institutions = await clarisa.getClaInstitutions();

    if (institutions.length > 0) {
      await deleteInstitutions();

      let institutionsArray: ClarisaInstitutions[] = [];
      let idTable = 0;

      for (let index = 0; index < institutions.length; index++) {
        const element = institutions[index];
        idTable = idTable + 1;
        let cla = clarisaRepo.create({
          id: idTable,
          acronym: element.acronym,
          code: element.code,
          country_name: '',
          name: element.name,
          data: element,
          institutionType: element.institutionType,
          institutionTypeId: element.institutionTypeId
        });
        console.log(cla);
        institutionsArray.push(cla);
      }

      await clarisaRepo.save(institutionsArray);

      console.log('9.end create institutions');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createInstitutions', error);
  }
}

/**CLARISA INSTITUTIONS TYPES*/

export async function deleteInstitutionsTypes() {
  try {
    const clarisaRepo = getRepository(ClarisaInstitutionsTypes);
    const clarisaInstitutionsTypes = new ClarisaInstitutionsTypes();
    await clarisaRepo.delete(clarisaInstitutionsTypes);
    console.log('11.delete institutions types');
  } catch (error) {
    console.log('deleteInstitutionsTypes', error);
  }
}

export async function createInstitutionsTypes() {
  console.log('10.start create institutions types');

  try {
    const clarisaRepo = getRepository(ClarisaInstitutionsTypes);
    const institutionsTypes = await clarisa.getClaInstitutionsTypes();

    if (institutionsTypes.length > 0) {
      await deleteInstitutionsTypes();

      let institutionsArray: ClarisaInstitutionsTypes[] = [];
      let idTable = 0;

      for (let index = 0; index < institutionsTypes.length; index++) {
        const element = institutionsTypes[index];
        idTable = idTable + 1;
        let cla = clarisaRepo.create({
          id: element.code,
          name: element.name
        });
        institutionsArray.push(cla);
      }

      await clarisaRepo.save(institutionsArray);

      console.log('12.end create institutions types');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createInstitutionsTypes', error);
  }
}

/**CLARISA COUNTRIES*/

export async function deleteCountries() {
  try {
    const clarisaRepo = getRepository(ClarisaCountries);
    const clarisaCountires = new ClarisaCountries();
    await clarisaRepo.delete(clarisaCountires);
    console.log('14.delete countries');
  } catch (error) {
    console.log('deleteCountries', error);
  }
}

export async function createCountries() {
  console.log('13.start create countries');

  try {
    const clarisaRepo = getRepository(ClarisaCountries);
    const countries = await clarisa.getClaCountries();

    if (countries.length > 0) {
      await deleteCountries();

      let countriesArray: ClarisaCountries[] = [];
      let idTable = 0;

      for (let index = 0; index < countries.length; index++) {
        const element = countries[index];
        idTable = idTable + 1;
        let cla = clarisaRepo.create({
          id: idTable,
          code: element.code,
          isoAlpha2: element.isoAlpha2,
          name: element.name,
          regionDTO: element.regionDTO
        });
        countriesArray.push(cla);
      }

      await clarisaRepo.save(countriesArray);

      console.log('15.end create countries');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createCountries', error);
  }
}

/**CLARISA REGIONS*/

export async function deleteRegions() {
  try {
    const clarisaRepo = getRepository(ClarisaRegions);
    const clarisaRegions = new ClarisaRegions();
    await clarisaRepo.delete(clarisaRegions);
    console.log('17.delete Regions');
  } catch (error) {
    console.log('deleteRegions', error);
  }
}

export async function createRegions() {
  console.log('16.start create regions');

  try {
    const clarisaRepo = getRepository(ClarisaRegions);
    const regions = await clarisa.getClaRegions();

    if (regions.length > 0) {
      await deleteRegions();

      let regionsArray: ClarisaRegions[] = [];
      let idTable = 0;

      for (let index = 0; index < regions.length; index++) {
        const element = regions[index];
        idTable = idTable + 1;
        let cla = clarisaRepo.create({
          id: idTable,
          name: element.name,
          parentRegion: element.parentRegion,
          um49Code: element.um49Code
        });
        regionsArray.push(cla);
      }

      await clarisaRepo.save(regionsArray);

      console.log('18.end create regions');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createRegions', error);
  }
}

/**CLARISA IMPACT AREAS INDICATORS*/

export async function deleteImpactAreasIndicators() {
  try {
    const clarisaImpactAreasIndicatorsRepo = getRepository(
      ClarisaImpactAreasIndicators
    );
    const clarisaImpactAreasIndicators = new ClarisaImpactAreasIndicators();
    await clarisaImpactAreasIndicatorsRepo.delete(clarisaImpactAreasIndicators);
    console.log('20.delete clarisa impact areas Indicators');
  } catch (error) {
    console.log('deleteImpactAreasIndicators', error);
  }
}

export async function createImpactAreasIndicators() {
  console.log('19.start create impact areas Indicators');

  try {
    const clarisaImpactAreasIndicatorsRepo = getRepository(
      ClarisaImpactAreasIndicators
    );
    const impactAreasIndicators = await clarisa.getImpactAreasIndicators();

    if (impactAreasIndicators.length > 0) {
      await deleteImpactAreasIndicators();

      let impactAreasArray: ClarisaImpactAreasIndicators[] = [];

      for (let index = 0; index < impactAreasIndicators.length; index++) {
        const element = impactAreasIndicators[index];
        let cla = clarisaImpactAreasIndicatorsRepo.create({
          id: element.indicatorId,
          indicatorStatement: element.indicatorStatement,
          impactAreaId: element.impactAreaId,
          impactAreaName: element.impactAreaName,
          targetYear: element.targetYear,
          targetUnit: element.targetUnit,
          value: element.value,
          isAplicableProjectedBenefits: element.isAplicableProjectedBenefits
        });
        impactAreasArray.push(cla);
      }

      await clarisaImpactAreasIndicatorsRepo.save(impactAreasArray);

      console.log('21.end create impact areas Indicators');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createImpactAreasIndicators', error);
  }
}

/**CLARISA PROJECTED BENEFITS*/

export async function deleteProjectedBenfits() {
  try {
    const clarisaProjectedBenefitsRepo = getRepository(
      ClarisaProjectedBenefits
    );
    const clarisaProjectedBenefits = new ClarisaProjectedBenefits();
    await clarisaProjectedBenefitsRepo.delete(clarisaProjectedBenefits);
    console.log('23.delete clarisa projected benefits');
  } catch (error) {
    console.log('deleteProjectedBenfits', error);
  }
}

export async function createProjectedBenefits() {
  console.log('22.start create clarisa projected benefits');

  try {
    const clarisaProjectedBenefitsRepo = getRepository(
      ClarisaProjectedBenefits
    );
    const projectedBenefits = await clarisa.requestProjectedBenefits();

    if (projectedBenefits.length > 0) {
      await deleteProjectedBenfits();

      let impactAreasArray: ClarisaProjectedBenefits[] = [];

      for (let index = 0; index < projectedBenefits.length; index++) {
        const element = projectedBenefits[index];
        let cla = clarisaProjectedBenefitsRepo.create({
          id: element.impactAreaId,
          impactAreaName: element.impactAreaName,
          impactAreaIndicator: element.impactAreaIndicator,
          impactAreaIndicatorName: element.impactAreaIndicatorName,
          isApplicableProjectedBenefits: element.isApplicableProjectedBenefits,
          targetYear: element.targetYear,
          targetUnit: element.targetUnit,
          value: element.value,
          depthScales: element.depthScales,
          weightingValues: element.weightingValues
        });
        impactAreasArray.push(cla);
      }

      await clarisaProjectedBenefitsRepo.save(impactAreasArray);

      console.log('24.end create clarisa projected benefits');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createProjectedBenefits', error);
  }
}

/**CLARISA REGIONS CGIAR*/

export async function deleteRegionsCgiar() {
  try {
    const clarisaRepo = getRepository(ClarisaRegionsCgiar);
    const clarisaRegionsCgiar = new ClarisaRegionsCgiar();
    await clarisaRepo.delete(clarisaRegionsCgiar);
    console.log('26.delete Regions Cgiar');
  } catch (error) {
    console.log('deleteRegionsCgiar', error);
  }
}

export async function createRegionsCgiar() {
  console.log('25.start create regions Cgiar');

  try {
    const clarisaRepo = getRepository(ClarisaRegionsCgiar);
    const regions = await clarisa.getClaRegionsCgiar();

    if (regions.length > 0) {
      await deleteRegionsCgiar();

      let regionsArray: ClarisaRegionsCgiar[] = [];

      for (let index = 0; index < regions.length; index++) {
        const element = regions[index];
        let cla = clarisaRepo.create({
          id: element.id,
          name: element.name,
          acronym: element.acronym,
          countries: element.countries
        });
        regionsArray.push(cla);
      }

      await clarisaRepo.save(regionsArray);

      console.log('27.end create regions Cgiar');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createRegionsCgiar', error);
  }
}

/**CLARISA SDG TARGETS*/

export async function deleteSdgTargets() {
  try {
    const clarisaRepo = getRepository(ClarisaSdgTargets);
    const clarisaSdgTargets = new ClarisaSdgTargets();
    await clarisaRepo.delete(clarisaSdgTargets);
    console.log('29.delete sdg targets');
  } catch (error) {
    console.log('deleteSdgTargets', error);
  }
}

export async function createSdgTargets() {
  console.log('28.start create SDG Targest');

  try {
    const clarisaRepo = getRepository(ClarisaSdgTargets);
    const sdgTargets = await clarisa.getClaSdgTargets();

    if (sdgTargets.length > 0) {
      await deleteSdgTargets();

      let sdgTargestsArray: ClarisaSdgTargets[] = [];

      for (let index = 0; index < sdgTargets.length; index++) {
        const element = sdgTargets[index];
        let cla = clarisaRepo.create({
          id: element.id,
          sdg_target_code: element.sdgTargetCode,
          sdg_target: element.sdgTarget,
          sdg: element.sdg
        });
        sdgTargestsArray.push(cla);
      }

      await clarisaRepo.save(sdgTargestsArray);

      console.log('30.end SDG Targets');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createSdgTargets', error);
  }
}

/**CLARISA GLOBAL TARGETS*/

export async function deleteGlobalTargets() {
  try {
    const clarisaRepo = getRepository(ClarisaGlobalTargets);
    const clarisaGlobalTargets = new ClarisaGlobalTargets();
    await clarisaRepo.delete(clarisaGlobalTargets);
    console.log('32.delete Global Targets');
  } catch (error) {
    console.log('deleteGlobalTargets', error);
  }
}

export async function createGlobalTargets() {
  console.log('31.start create Global Targets');

  try {
    const clarisaRepo = getRepository(ClarisaGlobalTargets);
    const globalTargets = await clarisa.getClaGlobalTargets();

    if (globalTargets.length > 0) {
      await deleteGlobalTargets();

      let globalTargetsArray: ClarisaGlobalTargets[] = [];

      for (let index = 0; index < globalTargets.length; index++) {
        const element = globalTargets[index];
        let cla = clarisaRepo.create({
          id: element.targetId,
          impact_area_id: element.impactAreaId,
          impact_area_name: element.impactAreaName,
          target: element.target
        });
        globalTargetsArray.push(cla);
      }

      await clarisaRepo.save(globalTargetsArray);

      console.log('33.end Global Targets');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createSdgTargets', error);
  }
}

/**CLARISA ACTION AREAS OUTCOMES INDICATORS*/

export async function deleteActionAreasOutIndicators() {
  try {
    const clarisaRepo = getRepository(ClarisaActionAreasOutcomesIndicators);
    const clarisaActionAreasOutIndicators =
      new ClarisaActionAreasOutcomesIndicators();
    await clarisaRepo.delete(clarisaActionAreasOutIndicators);
    console.log('35.delete Action Areas Outcomes Indicators');
  } catch (error) {
    console.log('deleteActionAreasOutIndicators', error);
  }
}

export async function createActionAreasOutIndicators() {
  console.log('34.start create Action Areas Outcomes Indicators');

  try {
    const clarisaRepo = getRepository(ClarisaActionAreasOutcomesIndicators);
    const actionAreasOutIndicators =
      await clarisa.getActionAreasOutcomesIndicators();

    if (actionAreasOutIndicators.length > 0) {
      await deleteActionAreasOutIndicators();

      let actionAreasOutIndicatorsArray: ClarisaActionAreasOutcomesIndicators[] =
        [];
      let idTable = 0;

      for (let index = 0; index < actionAreasOutIndicators.length; index++) {
        const element = actionAreasOutIndicators[index];
        idTable = idTable + 1;
        let cla = clarisaRepo.create({
          id: idTable,
          action_area_id: element.actionAreaId,
          action_area_name: element.actionAreaName,
          outcome_id: element.outcomeId,
          outcome_smo_code: element.outcomeSMOcode,
          outcome_statement: element.outcomeStatement,
          outcome_indicator_id: element.outcomeIndicatorId,
          outcome_indicator_smo_code: element.outcomeIndicatorSMOcode,
          outcome_indicator_statement: element.outcomeIndicatorStatement
        });
        actionAreasOutIndicatorsArray.push(cla);
      }

      await clarisaRepo.save(actionAreasOutIndicatorsArray);

      console.log('36.end Action Areas Outcomes Indicators');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createActionAreasOutcomes', error);
  }
}

/**CLARISA MELIA STUDY TYPES*/

export async function deleteMeliaStudyTypes() {
  try {
    const clarisaRepo = getRepository(ClarisaMeliaStudyTypes);
    const clarisaMeliaStudyTypes = new ClarisaMeliaStudyTypes();
    await clarisaRepo.delete(clarisaMeliaStudyTypes);
    console.log('38.delete MELIA Study Types');
  } catch (error) {
    console.log('deleteMeliaStudyTypes', error);
  }
}

export async function createMeliaStudyTypes() {
  console.log('37.start create MELIA Study Types');

  try {
    const clarisaRepo = getRepository(ClarisaMeliaStudyTypes);
    const clarisaMeliaStudyTypes = await clarisa.getClaMeliaStudyTypes();

    if (clarisaMeliaStudyTypes.length > 0) {
      await deleteMeliaStudyTypes();

      let meliaStudyTypesArray: ClarisaMeliaStudyTypes[] = [];

      for (let index = 0; index < clarisaMeliaStudyTypes.length; index++) {
        const element = clarisaMeliaStudyTypes[index];
        let cla = clarisaRepo.create({
          id: element.id,
          name: element.name
        });
        meliaStudyTypesArray.push(cla);
      }

      await clarisaRepo.save(meliaStudyTypesArray);

      console.log('39.end MELIA Study Types');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createMeliaStudyTypes', error);
  }
}

export const deleteProjectedProbabilities = async () => {
  console.log('41.start delete Projected Probabilities');

  try {
    const repositoryProjectedProbabilities = getCustomRepository(
      ProjectedProbabilitiesRepository
    );
    await repositoryProjectedProbabilities.deleteAll();
  } catch (error) {
    console.log('create Projected Probabilities', error);
  }
};

export const createProjectProbabilities = async () => {
  console.log('40.start create Projected Probabilities');
  try {
    await deleteProjectedProbabilities();
    let insertData: any[] = [];
    let projectedProbabilities = await clarisa.requestProjectedProbabilities();
    if (projectedProbabilities.length > 0) {
      projectedProbabilities.forEach((el) => {
        insertData.push({
          id: el.probabilityID,
          name: el.probabilityName,
          description: el.probabilityDescription,
          active: 1
        });
      });
      const repositoryProjectedProbabilities = getCustomRepository(
        ProjectedProbabilitiesRepository
      );
      await repositoryProjectedProbabilities.save(insertData);
      console.log('42.end Projected Probabilities');
    } else {
      console.log('Issues with Clarisa');
    }
  } catch (error) {
    console.log('createMeliaStudyTypes', error);
  }
};
