import { Connection } from "typeorm";
import { Database } from "../database/db";

import { TocSdgResultsSdgIndicators } from "../entities/tocSdgResultsSdgIndicators";
import { TocSdgResultsSdgTargets } from "../entities/tocSdgResultsSdgTargets";
import { TocImpactAreaResultsGlobalTargets } from "../entities/tocImpactAreaResultsGlobalTargets";
import { TocImpactAreaResultsImpactAreaIndicators } from "../entities/tocImpactAreaResultsImpactAreaIndicators";
import { TocImpactAreaResultsSdgResults } from "../entities/tocImpactAreaResultsSdgResults";
import { TocActionAreaResultsOutcomesIndicators } from "../entities/tocActionAreaResultsOutcomesIndicators";
import { TocActionAreaResultsImpactAreaResults } from "../entities/tocActionAreaResultsImpactAreaResults";
import { TocResultsIndicators } from "../entities/tocResultsIndicators";
import { TocResultsActionAreaResults } from "../entities/tocResultsActionAreaResults";
import { TocResultsImpactAreaResults } from "../entities/tocResultsImpactAreaResults";
import { TocResultsSdgResults } from "../entities/tocResultsSdgResults";
import { TocResultsRegions } from "../entities/tocResultsRegions";
import { TocResultsCountries } from "../entities/tocResultsCountries";

export class ValidatorTypes {
  async validatorIsObject(value: any) {
    return value instanceof Object;
  }

  validatorIsArray(value: any): Boolean {
    return Array.isArray(value);
  }

  existPropertyInObject(value: any, nameProperty: string) {
    return value.hasOwnProperty(nameProperty);
  }

  existPropertyInObjectMul(object: any, namesProperty: any) {
    
    if (this.validatorIsArray(namesProperty)) {
      namesProperty.forEach((element) => {
        if (this.existPropertyInObject(object, element) == false) {
          return false;
        }
      });
    } else {
      return "Expect array";
    }
    return true;
  }

  validExistNull(object: any) {
    for (const x in object) {
      if (object[x] == null) {
        return false;
      }
    }
    return true;
  }

  validExistId(object: any, id: string) {
    let estado = false;
    object.forEach((element) => {
      if (id.localeCompare(element.sdg_results.toc_result_id) == 0) {
        estado = true;
      }
    });
    return estado;
  }

  validExistIdImpact(object: any, id: string) {
    let estado = false;
    object.forEach((element) => {
      if (id.localeCompare(element.impact_area.toc_result_id) == 0) {
        estado = true;
      }
    });
    return estado;
  }

  validExistIdAction(object: any, id: string) {
    let estado = false;
    object.forEach((element) => {
      if (id.localeCompare(element.action_area.toc_result_id) == 0) {
        estado = true;
      }
    });
    return estado;
  }

  async validRepetInformation(listValidate: any, data: any) {
    let estado = true;

    listValidate.forEach((element) => {
      if (
        element.sdg_toc_result_id.localeCompare(data.sdg_toc_result_id) == 0
      ) {
        estado = false;
        console.log("entre");
      }
    });

    return estado;
  }

  async deleteRepets(array: any) {
    let arrayReturn = [];
    let hash = {};
    array.forEach(function (current) {
      let exists;
      if (!hash[current.toc_result_id] == true) {
        hash[current.toc_result_id] = true;
        arrayReturn.push(current);
      }
    });

    return arrayReturn;
  }

  async filterListRegister(array: any, id: string, identificator: string) {
    let estado = false;
    array.filter((resp) => {
      if (resp[identificator] == id) {
        estado = true;
      }
    });

    return estado;
  }

  async deletebyAllRelationSdgs(toc_result_id: string) {
    const database = new Database();
    const dbConn: Connection = await database.getConnection();

    let sdgTarget = dbConn.getRepository(TocSdgResultsSdgTargets);
    let sdgIndicator = dbConn.getRepository(TocSdgResultsSdgIndicators);

    await sdgTarget.delete(toc_result_id);
    await sdgIndicator.delete(toc_result_id);
    return true;
  }

  async deletebyAllRelationImpactAre(toc_result_id: string) {
    const database = new Database();
    const dbConn: Connection = await database.getConnection();

    let globalTarget = dbConn.getRepository(TocImpactAreaResultsGlobalTargets);
    let impactAreaIndicator = dbConn.getRepository(
      TocImpactAreaResultsImpactAreaIndicators
    );
    let impactAreaSdg = dbConn.getRepository(TocImpactAreaResultsSdgResults);

    await globalTarget.delete(toc_result_id);
    await impactAreaIndicator.delete(toc_result_id);
    await impactAreaSdg.delete(toc_result_id);
    return true;
  }

  async deletebyAllRelationActionArea(toc_result_id: string) {
    const database = new Database();
    const dbConn: Connection = await database.getConnection();

    let outcomeIndicators = dbConn.getRepository(
      TocActionAreaResultsOutcomesIndicators
    );
    let impactAreas = dbConn.getRepository(
      TocActionAreaResultsImpactAreaResults
    );

    await outcomeIndicators.delete(toc_result_id);
    await impactAreas.delete(toc_result_id);
    return true;
  }

  async deletebyAllRelationOutcome(toc_result_id: string) {
    const database = new Database();
    const dbConn: Connection = await database.getConnection();

    let indicators = dbConn.getRepository(TocResultsIndicators);
    let tocActionArea = dbConn.getRepository(TocResultsActionAreaResults);
    let tocImpactArea = dbConn.getRepository(TocResultsImpactAreaResults);
    let tocSdg = dbConn.getRepository(TocResultsSdgResults);
    let tocRegions = dbConn.getRepository(TocResultsRegions);
    let tocCountries = dbConn.getRepository(TocResultsCountries);

    await indicators.delete(toc_result_id);
    await tocActionArea.delete(toc_result_id);
    await tocImpactArea.delete(toc_result_id);
    await tocSdg.delete(toc_result_id);
    await tocRegions.delete(toc_result_id);
    await tocCountries.delete(toc_result_id);
    return true;
  }
}
