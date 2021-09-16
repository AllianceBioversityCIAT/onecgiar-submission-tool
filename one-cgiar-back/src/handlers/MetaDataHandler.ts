import { getRepository } from 'typeorm';
import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";
import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';



export class MetaDataHandler extends InitiativeStageHandler {

  /**
   * RETURN METADATA
   * STAGES,SECTIONS,SUBSECTIONS AND STAGE_META
   */


  /**
   * 
   * @param initiativeId 
   * @returns stages
   */
  async getStages(initiativeId: string) {

    try {

      let stages = this.queryRunner.query(`SELECT b.id as stageId,b.description,a.active,
        b.start_date,b.end_date
        FROM initiatives_by_stages a
        JOIN stages b
        ON a.stageId = b.id
        WHERE initiativeId =  ${initiativeId}`);

      return stages

    } catch (error) {


      throw new BaseError('Get stages', 400, error.message, false)

    }

  }


  /**
   * 
   * @param initiativeId 
   * @returns sections
   */
  async getSections(initiativeId: string) {

    try {

      let sections = this.queryRunner.query(` SELECT sections.id as sectionId,
            stages.description as stage,sections.description,sections.display_name,sections.active, 
            sections.visible,sections.orderSection,
            sections.stageId
            FROM stages stages
            JOIN sections_meta sections
              ON stages.id = sections.stageId
            LEFT JOIN subsections_meta subsections
              ON sections.id = subsections.sectionId
            LEFT JOIN stages_meta stageMeta
              ON stageMeta.subsectionId = subsections.id
           WHERE sections.stageId in (SELECT stageId FROM initiatives_by_stages WHERE initiativeId = ${initiativeId})
           GROUP BY sections.id,stages.description ,sections.description
           ORDER BY sections.orderSection`);

      return sections

    } catch (error) {

      throw new BaseError('Get Sections', 400, error.message, false)

    }

  }

  /**
   * 
   * @param initiativeId 
   * @returns subsections
   */
  async getSubSectios(initiativeId: string) {

    try {

      let subsections = this.queryRunner.query(` SELECT subsections.id as subSectionId,subsections.description,
            subsections.display_name,subsections.single_section, subsections.sectionId,subsections.active,
            subsections.visible,subsections.order
            FROM stages stages
            JOIN sections_meta sections
              ON stages.id = sections.stageId
            LEFT JOIN subsections_meta subsections
              ON sections.id = subsections.sectionId
            LEFT JOIN stages_meta stageMeta
              ON stageMeta.subsectionId = subsections.id
           WHERE sections.stageId in (SELECT stageId FROM initiatives_by_stages WHERE initiativeId = ${initiativeId})
             AND subsections.single_section > 0
           GROUP BY  subsections.id,  subsections.description, subsections.single_section,subsections.display_name
           ORDER BY subsections.order`);

      return subsections


    } catch (error) {


      throw new BaseError('Get Subsections', 400, error.message, false)

    }

  }

  /**
   * 
   * @param sectionName 
   * @returns subsections by name
   */
  async getSubSectiosByName(sectionName: any) {

    try {

      let subsections = this.queryRunner.query(` SELECT subsections.id as subSectionId,subsections.description,
            subsections.display_name as display,subsections.single_section
            FROM stages stages
            JOIN sections_meta sections
              ON stages.id = sections.stageId
            LEFT JOIN subsections_meta subsections
              ON sections.id = subsections.sectionId
            LEFT JOIN stages_meta stageMeta
              ON stageMeta.subsectionId = subsections.id
           WHERE sections.description = "${sectionName}"
             and sections.stageId = (SELECT stageId FROM initiatives_by_stages WHERE initiativeId = ${this.initvStgId_})
             GROUP BY  subsections.id,  subsections.description, subsections.single_section,subsections.display_name
           ORDER BY subsections.order`);

      return subsections


    } catch (error) {


      throw new BaseError('Get Metadata', 400, error.message, false)

    }

  }

  /**
   * 
   * @param sectionName 
   * @returns fields
   */
  async getField(sectionName: any) {

    try {

      let fields = this.queryRunner.query(` SELECT stageMeta.display_name as field,stageMeta.order,stageMeta.subsectionId
            FROM stages stages
            JOIN sections_meta sections
              ON stages.id = sections.stageId
            LEFT JOIN subsections_meta subsections
              ON sections.id = subsections.sectionId
            LEFT JOIN stages_meta stageMeta
              ON stageMeta.subsectionId = subsections.id
           WHERE sections.description = "${sectionName}"
             and sections.stageId = (SELECT stageId FROM initiatives_by_stages WHERE initiativeId = ${this.initvStgId_})
           ORDER BY subsections.order
          `);

      return fields

    } catch (error) {

      throw new BaseError('Get Metadata', 400, error.message, false)

    }

  }


  /**
   * VALIDATIONS (GREEN CHECKS)
   * SECTIONS: 
   * 1. General Information.
   * 2. Context.
   * 3. Work Package. - validation Level WP
   * 4. Innovation Packages.
   * 5. Impact strategies.
   * 6. MELIAS.
   * 7. Management plan and Risk assessment.
   * 8. Policy compliance.
   * 9. Human Resurces.
   * 10. Financial Resources. 
   */


  /**
   * Validation General Information (Summary Table)
   * @returns validationGI (True or False)
   */
  async validationGI(initiativeId, stageId) {

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

      // get stage
      const stage = await stageRepo.findOne({ where: { id: stageId } });

      // get intiative by stage
      const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
      // if not intitiative by stage, throw error
      if (initvStg == null || initvStg == undefined) {
        throw new BaseError('Validations: Error', 400, `Validations not found in stage: ${stage.description}`, false);
      }


      let validationGISQL = (
        `
   SELECT sec.id as sectionId,sec.description, 
     CASE
      WHEN (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) IS NULL 
		    OR (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) = ''
	      OR (SELECT action_area_description FROM general_information WHERE initvStgId = ini.id ) IS NULL
        OR (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') OR active = TRUE OR initiativeId = ini.id LIMIT 1)) IS NULL
        OR (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') OR active = TRUE OR initiativeId = ini.id LIMIT 1) ) IS NULL
        OR (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') OR active = TRUE OR initiativeId = ini.id LIMIT 1) ) IS NULL
        OR (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') OR active = TRUE OR initiativeId = ini.id LIMIT 1)) IS NULL
        OR (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') OR active = TRUE OR initiativeId = ini.id LIMIT 1) ) IS NULL
        OR (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') OR active = TRUE OR initiativeId = ini.id LIMIT 1) ) IS NULL
        OR (SELECT value FROM budget WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT value FROM budget WHERE initvStgId = ini.id)  < 1
		    OR (SELECT COUNT(id) FROM countries_by_initiative_by_stage WHERE initvStgId = ini.id OR wrkPkgId IS NULL) = 0
	      OR (SELECT COUNT(id) FROM regions_by_initiative_by_stage WHERE initvStgId = ini.id OR wrkPkgId IS NULL) = 0
    THEN FALSE
      ELSE TRUE
      END AS ValidateGI
    FROM initiatives_by_stages ini
    JOIN sections_meta sec
   WHERE ini.id = ${initvStg.id}
     AND sec.stageId= ini.stageId
     AND sec.description='general-information'`
      )

      var validationGI = this.queryRunner.query(validationGISQL);

      return validationGI

    } catch (error) {

      throw new BaseError('Get validations GI', 400, error.message, false)

    }

  }


  /**
  * VALIDATIONS (GREEN CHECKS)
  * SUBSECTIONS:
  * Context : challenge statement, Measurable three-year outcomes,
  * Learning from prior evaluations and Impact Assessments (IA),Priority setting,
  * Comparative Advantage,Participatory design process,Projection of benefits
  */


}