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



  public get value(): string {
    return
  }


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
  async validationGI() {


    try {



      let validationGISQL = (
        `
   SELECT sec.id as sectionId,sec.description, 
     CASE
      WHEN (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) IS NULL 
		    OR (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) = ''
        OR (SELECT LENGTH(NAME) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(NAME,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM general_information WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 50
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
      END AS validation
    FROM initiatives_by_stages ini
    JOIN sections_meta sec
   WHERE ini.id = ${this.initvStgId_}
     AND sec.stageId= ini.stageId
     AND sec.description='general-information'`
      )

      var validationGI = await this.queryRunner.query(validationGISQL);

      validationGI[0].validation = parseInt(validationGI[0].validation);

      return validationGI[0]

    } catch (error) {

      throw new BaseError('Get validations GI', 400, error.message, false)

    }

  }


  async validationInnovationPackages() {


    try {



      let validationInnovationPackagesSQL = (
        `
     SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT key_principles FROM innovation_packages WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT key_principles FROM innovation_packages WHERE initvStgId = ini.id and active=1) = ''
        OR (SELECT LENGTH(key_principles) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(key_principles,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM innovation_packages WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='innovation-packages-and-srp';`
      )

      var innovationPackages = await this.queryRunner.query(validationInnovationPackagesSQL);

      innovationPackages[0].validation = parseInt(innovationPackages[0].validation);

      return innovationPackages[0]

    } catch (error) {

      throw new BaseError('Get validations innovations packages', 400, error.message, false)

    }

  }


  async validationMelia() {


    try {



      let validationMeliaSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT melia_plan FROM melia WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT melia_plan FROM melia WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT LENGTH(melia_plan) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(melia_plan,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM melia WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
        OR (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "result_framework"
                        AND active = 1 ) = ''
          OR (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "result_framework"
                        AND active = 1 ) IS NULL
        OR (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                         WHERE initvStgId = ini.id
                           AND active = 1)
                           AND section = "melia"
                           AND active = 1 ) = ''
        OR (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                         WHERE initvStgId = ini.id
                           AND active = 1)
                           AND section = "melia"
                           AND active = 1 ) IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='melia';`
      )

      var validationMelia = await this.queryRunner.query(validationMeliaSQL);

      validationMelia[0].validation = parseInt(validationMelia[0].validation);

      return validationMelia[0]

    } catch (error) {

      throw new BaseError('Get validations MELAI', 400, error.message, false)

    }

  }


  async validationManagementPlan() {


    try {

      let validationManagementPlanSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT LENGTH(management_plan) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(management_plan,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM manage_plan_risk WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
        OR (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "management_gantt"
                        AND active = 1 ) = ''
          OR (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "management_gantt"
                        AND active = 1 ) IS NULL
        OR (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                         WHERE initvStgId = ini.id
                           AND active = 1)
                           AND section = "risk_assessment"
                           AND active = 1 ) = ''
        OR (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                         WHERE initvStgId = ini.id
                           AND active = 1)
                           AND section = "risk_assessment"
                           AND active = 1 ) IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='mpara'`
      )

      var managementPlan = await this.queryRunner.query(validationManagementPlanSQL);

      managementPlan[0].validation = parseInt(managementPlan[0].validation);

      return managementPlan[0]

    } catch (error) {

      throw new BaseError('Get validations management plan', 400, error.message, false)

    }

  }


  async validationHumanResources() {

    try {

      let validationHumanResourcesSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT LENGTH(gender_diversity_inclusion) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(gender_diversity_inclusion,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM human_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
        OR (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT LENGTH(capacity_development) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(capacity_development,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM human_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
        OR (SELECT max(id) FROM files WHERE humanId in (SELECT id FROM human_resources
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "initiative_team"
                        AND active = 1 ) = ''
          OR (SELECT max(id) FROM files WHERE humanId in (SELECT id FROM human_resources
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "initiative_team"
                        AND active = 1 ) IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='human-resources'`
      )

      var humanResources = await this.queryRunner.query(validationHumanResourcesSQL);

      humanResources[0].validation = parseInt(humanResources[0].validation);

      return humanResources[0]

    } catch (error) {

      throw new BaseError('Get validations human resources', 400, error.message, false)

    }

  }


  async validationFinancialResources() {

    try {

      let validationFinancialResourcesSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT LENGTH(detailed_budget) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(detailed_budget,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM financial_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
        OR (SELECT max(id) FROM files WHERE financial_resources_id in (SELECT id FROM financial_resources
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "budget"
                        AND active = 1 ) = ''
          OR (SELECT max(id) FROM files WHERE financial_resources_id in (SELECT id FROM financial_resources
                      WHERE initvStgId = ini.id
                        AND active = 1)
                        AND section = "budget"
                        AND active = 1 ) IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='financial-resources'`
      )

      var financialResources = await this.queryRunner.query(validationFinancialResourcesSQL);

      financialResources[0].validation = parseInt(financialResources[0].validation);

      return financialResources[0]

    } catch (error) {

      throw new BaseError('Get validations financial resources', 400, error.message, false)

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