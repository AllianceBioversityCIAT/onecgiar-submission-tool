import {BaseError} from './BaseError';
import {InitiativeStageHandler} from './InitiativeStageDomain';

export class MetaDataHandler extends InitiativeStageHandler {
  /**
   * RETURN METADATA
   * STAGES,SECTIONS,SUBSECTIONS AND STAGE_META
   */

  public get value(): string {
    return;
  }

  /**
   *
   * @param initiativeId
   * @returns stages
   */
  async getStages(initiativeId: string) {
    try {
      let stages = this.queryRunner
        .query(`SELECT b.id as stageId,b.description,a.active,
        b.start_date,b.end_date
        FROM initiatives_by_stages a
        JOIN stages b
        ON a.stageId = b.id
        WHERE initiativeId =  ${initiativeId}`);

      return stages;
    } catch (error) {
      throw new BaseError('Get stages', 400, error.message, false);
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

      return sections;
    } catch (error) {
      throw new BaseError('Get Sections', 400, error.message, false);
    }
  }

  /**
   *
   * @param initiativeId
   * @returns subsections
   */
  async getSubSectios(initiativeId: string) {
    try {
      let subsections = this.queryRunner
        .query(` SELECT subsections.id as subSectionId,subsections.description,
            subsections.display_name,subsections.single_section, subsections.sectionId,subsections.active,
            subsections.visible,subsections.order,subsections.block
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

      return subsections;
    } catch (error) {
      throw new BaseError('Get Subsections', 400, error.message, false);
    }
  }

  /**
   *
   * @param sectionName
   * @returns subsections by name
   */
  async getSubSectiosByName(sectionName: any) {
    try {
      let subsections = this.queryRunner
        .query(` SELECT subsections.id as subSectionId,subsections.description,
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

      return subsections;
    } catch (error) {
      throw new BaseError('Get Metadata', 400, error.message, false);
    }
  }

  /**
   *
   * @param sectionName
   * @returns fields
   */
  async getField(sectionName: any) {
    try {
      let fields = this.queryRunner
        .query(` SELECT stageMeta.display_name as field,stageMeta.order,stageMeta.subsectionId
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

      return fields;
    } catch (error) {
      throw new BaseError('Get Metadata', 400, error.message, false);
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
      /* eslint-disable */
      let validationGISQL = `
   SELECT sec.id as sectionId,sec.description, 
     CASE
      WHEN (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) IS NULL 
		    OR (SELECT NAME FROM general_information WHERE initvStgId = ini.id ) = ''
        OR (SELECT char_length(REGEXP_REPLACE(REGEXP_REPLACE(NAME,'<(\/?p)>',' '),'<([^>]+)>','')) 
        - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(NAME,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM general_information WHERE initvStgId = ini.id) > 50
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
     AND sec.description='general-information'`;

      var validationGI = await this.queryRunner.query(validationGISQL);

      validationGI[0].validation = parseInt(validationGI[0].validation);

      return validationGI[0];
    } catch (error) {
      throw new BaseError('Get validations GI', 400, error.message, false);
    }
  }

  async validationInnovationPackages() {
    try {
      let validationInnovationPackagesSQL = `
     SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT key_principles FROM innovation_packages WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT key_principles FROM innovation_packages WHERE initvStgId = ini.id and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(key_principles,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(key_principles,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
        FROM innovation_packages WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='innovation-packages-and-srp';`;

      var innovationPackages = await this.queryRunner.query(
        validationInnovationPackagesSQL
      );

      innovationPackages[0].validation = parseInt(
        innovationPackages[0].validation
      );

      return innovationPackages[0];
    } catch (error) {
      throw new BaseError(
        'Get validations innovations packages',
        400,
        error.message,
        false
      );
    }
  }

  async validationMelia() {
    try {
      // Validate Sections
      let validationMeliaSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT melia_plan FROM melia WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT melia_plan FROM melia WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(melia_plan,'<(\/?p)>',' '),'<([^>]+)>','')))
         - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(melia_plan,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
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
        AND sec.description='melia';`;

      var validationMelia = await this.queryRunner.query(validationMeliaSQL);

      validationMelia[0].validation = parseInt(validationMelia[0].validation);

      // Validate subSections

      let validateResultFrmwkSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN(SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                    WHERE initvStgId = ini.id
                      AND active = 1)
                      AND section = "result_framework"
                      AND active = 1 ) = ''
        OR (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
                    WHERE initvStgId = ini.id
                      AND active = 1)
                      AND section = "result_framework"
                      AND active = 1 ) IS NULL
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
  AND sec.id = subsec.sectionId
      AND sec.description='melia'
    AND subsec.description = 'result-framework';`,
        validateMeliaPlanSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN (SELECT melia_plan FROM melia WHERE initvStgId = ini.id and active=1) IS NULL 
      OR (SELECT melia_plan FROM melia WHERE initvStgId = ini.id  and active=1) = ''
      OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(melia_plan,'<(\/?p)>',' '),'<([^>]+)>',''))) 
      - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(melia_plan,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
      FROM melia WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
  AND sec.id = subsec.sectionId
      AND sec.description='melia'
    AND subsec.description = 'melia-plan';`,
        validateStudiesSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN (SELECT max(id) FROM files WHERE meliaId in (SELECT id FROM melia
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
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
  AND sec.id = subsec.sectionId
      AND sec.description='melia'
    AND subsec.description = 'melia-studies-and-activities';`;

      var validationResultFramework = await this.queryRunner.query(
        validateResultFrmwkSQL
      );
      var validationMeliaPlan = await this.queryRunner.query(
        validateMeliaPlanSQL
      );
      var validationStudies = await this.queryRunner.query(validateStudiesSQL);

      validationResultFramework[0].validation = parseInt(
        validationResultFramework[0].validation
      );
      validationMeliaPlan[0].validation = parseInt(
        validationMeliaPlan[0].validation
      );
      validationStudies[0].validation = parseInt(
        validationStudies[0].validation
      );

      validationMelia.map((me) => {
        me['subSections'] = [
          validationResultFramework.find((rf) => {
            return (rf.sectionId = me.sectionId);
          }),

          validationMeliaPlan.find((mep) => {
            return (mep.sectionId = me.sectionId);
          }),

          validationStudies.find((st) => {
            return (st.sectionId = me.sectionId);
          })
        ];
      });

      return validationMelia[0];
    } catch (error) {
      throw new BaseError('Get validations MELIA', 400, error.message, false);
    }
  }

  async validationManagementPlan() {
    try {
      //Validate Sections
      let validationManagementPlanSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(management_plan,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(management_plan,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
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
        AND sec.description='mpara'`;

      var managementPlan = await this.queryRunner.query(
        validationManagementPlanSQL
      );

      managementPlan[0].validation = parseInt(managementPlan[0].validation);

      //Validate subSections

      let validationManagePlanSQL = ` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
      CASE
    WHEN (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id and active=1) IS NULL 
      OR (SELECT management_plan FROM manage_plan_risk WHERE initvStgId = ini.id  and active=1) = ''
      OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(management_plan,'<(\/?p)>',' '),'<([^>]+)>','')))
       - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(management_plan,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
      FROM manage_plan_risk WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
     JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
  AND sec.id = subsec.sectionId
      AND sec.description='mpara'
      AND subsec.description = 'management-plan';`,
        validationRiskAssessmentSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
          CASE
        WHEN (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
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
         JOIN subsections_meta subsec
        WHERE ini.id = ${this.initvStgId_}
          AND sec.stageId= ini.stageId
      AND sec.id = subsec.sectionId
          AND sec.description='mpara'
          AND subsec.description = 'risk-assessment';`,
        validationGantt = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
          CASE
        WHEN (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                        WHERE initvStgId = ini.id
                          AND active = 1)
                          AND section = "management_gantt"
                          AND active = 1 ) = ''
            OR (SELECT max(id) FROM files WHERE manage_plan_risk_id in (SELECT id FROM manage_plan_risk
                        WHERE initvStgId = ini.id
                          AND active = 1)
                          AND section = "management_gantt"
                          AND active = 1 ) IS NULL
         THEN FALSE
           ELSE TRUE
           END AS validation
         FROM initiatives_by_stages ini
         JOIN sections_meta sec
         JOIN subsections_meta subsec
        WHERE ini.id = ${this.initvStgId_}
          AND sec.stageId= ini.stageId
      AND sec.id = subsec.sectionId
          AND sec.description='mpara'
          AND subsec.description = 'smpg-table';`;

      var managePlan = await this.queryRunner.query(validationManagePlanSQL);
      var riskAssessment = await this.queryRunner.query(
        validationRiskAssessmentSQL
      );
      var gantt = await this.queryRunner.query(validationGantt);

      managePlan[0].validation = parseInt(managePlan[0].validation);
      riskAssessment[0].validation = parseInt(riskAssessment[0].validation);
      gantt[0].validation = parseInt(gantt[0].validation);

      managementPlan.map((mp) => {
        mp['subSections'] = [
          managePlan.find((mpn) => {
            return (mpn.sectionId = mp.sectionId);
          }),

          riskAssessment.find((ris) => {
            return (ris.sectionId = mp.sectionId);
          }),

          gantt.find((ga) => {
            return (ga.sectionId = mp.sectionId);
          })
        ];
      });

      return managementPlan[0];
    } catch (error) {
      throw new BaseError(
        'Get validations management plan',
        400,
        error.message,
        false
      );
    }
  }

  async validationHumanResources() {
    try {
      // Validate sections

      let validationHumanResourcesSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(gender_diversity_inclusion,'<(\/?p)>',' '),'<([^>]+)>','')))
         - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(gender_diversity_inclusion,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
        FROM human_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
        OR (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(capacity_development,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(capacity_development,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
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
        AND sec.description='human-resources'`;

      var humanResources = await this.queryRunner.query(
        validationHumanResourcesSQL
      );

      humanResources[0].validation = parseInt(humanResources[0].validation);

      // Validate subSections

      let validationInitiativeSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
      CASE
    WHEN  (SELECT max(id) FROM files WHERE humanId in (SELECT id FROM human_resources
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
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
    AND sec.id = subsec.sectionId
      AND sec.description='human-resources'
      AND subsec.description = 'initiative-team'`,
        genderSQL = `
      SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
      CASE
    WHEN (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
      OR (SELECT gender_diversity_inclusion FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
      OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(gender_diversity_inclusion,'<(\/?p)>',' '),'<([^>]+)>',''))) 
      - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(gender_diversity_inclusion,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
      FROM human_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
    AND sec.id = subsec.sectionId
      AND sec.description='human-resources'
      AND subsec.description = 'gender-diw';
      `,
        capacitySQL = `
      SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,  
      CASE
    WHEN (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id and active=1) IS NULL 
      OR (SELECT capacity_development FROM human_resources WHERE initvStgId = ini.id  and active=1) = ''
      OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(capacity_development,'<(\/?p)>',' '),'<([^>]+)>','')))
       - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(capacity_development,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
      FROM human_resources WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 500
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
    AND sec.id = subsec.sectionId
      AND sec.description='human-resources'
      AND subsec.description = 'capacity-development';       
      `;

      var initiativeTeam = await this.queryRunner.query(
        validationInitiativeSQL
      );
      var gender = await this.queryRunner.query(genderSQL);
      var capacity = await this.queryRunner.query(capacitySQL);

      initiativeTeam[0].validation = parseInt(initiativeTeam[0].validation);
      gender[0].validation = parseInt(gender[0].validation);
      capacity[0].validation = parseInt(capacity[0].validation);

      humanResources.map((hr) => {
        hr['subSections'] = [
          initiativeTeam.find((ini) => {
            return (ini.sectionId = hr.sectionId);
          }),

          gender.find((gen) => {
            return (gen.sectionId = hr.sectionId);
          }),

          capacity.find((cap) => {
            return (cap.sectionId = hr.sectionId);
          })
        ];
      });

      return humanResources[0];
    } catch (error) {
      throw new BaseError(
        'Get validations human resources',
        400,
        error.message,
        false
      );
    }
  }

  async validationFinancialResources() {
    try {
      //Validations Sections

      let validationFinancialResourcesSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(detailed_budget,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(detailed_budget,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
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
        AND sec.description='financial-resources'`;

      var financialResources = await this.queryRunner.query(
        validationFinancialResourcesSQL
      );

      financialResources[0].validation = parseInt(
        financialResources[0].validation
      );

      //Validations subSections

      let validationBudgetSQL = `
        
        SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id and active=1) IS NULL 
        OR (SELECT detailed_budget FROM financial_resources WHERE initvStgId = ini.id  and active=1) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(detailed_budget,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(detailed_budget,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
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
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='financial-resources'
        AND subsec.description = 'budget'
        `;

      var budget = await this.queryRunner.query(validationBudgetSQL);

      budget[0].validation = parseInt(budget[0].validation);

      financialResources.map((fin) => {
        fin['subSections'] = [
          budget.find((bu) => {
            return (bu.sectionId = fin.sectionId);
          })
        ];
      });

      return financialResources[0];
    } catch (error) {
      throw new BaseError(
        'Get validations financial resources',
        400,
        error.message,
        false
      );
    }
  }

  async validationPolicyCompliance() {
    try {
      //Validations for sections
      let validationPolicyComplianceSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
          OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
          OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
          OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
          OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(open_fair_data_details,'<(\/?p)>',' '),'<([^>]+)>',''))) 
          - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(open_fair_data_details,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
          FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='policy-compliance-and-oversight';`;

      var policyCompliance = await this.queryRunner.query(
        validationPolicyComplianceSQL
      );

      policyCompliance[0].validation = parseInt(policyCompliance[0].validation);

      //Validations for subSections

      let validationResearchGovSQL = ` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
      OR (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
     JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
      AND sec.id = subsec.sectionId
      AND sec.description='policy-compliance-and-oversight'
      AND subsec.description = 'research-governance';`,
        validationOpenFairSQL = ` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN    (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(open_fair_data_details,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(open_fair_data_details,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
        FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
     JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
      AND sec.id = subsec.sectionId
      AND sec.description='policy-compliance-and-oversight'
      AND subsec.description = 'open-and-fair-data-assets'; `;

      var researchGov = await this.queryRunner.query(validationResearchGovSQL);
      var openFair = await this.queryRunner.query(validationOpenFairSQL);

      researchGov[0].validation = parseInt(researchGov[0].validation);
      openFair[0].validation = parseInt(openFair[0].validation);

      policyCompliance.map((pol) => {
        pol['subSections'] = [
          researchGov.find((re) => {
            return (re.sectionId = pol.sectionId);
          }),
          openFair.find((op) => {
            return (op.sectionId = pol.sectionId);
          })
        ];
      });

      return policyCompliance[0];
    } catch (error) {
      throw new BaseError(
        'Get validations policy compliance',
        400,
        error.message,
        false
      );
    }
  }

  async validationImpactStrategies() {
    try {
      // 5 impact strategies
      for (let index = 1; index < 6; index++) {
        var multi = 1;

        // Validate Sections
        let validationImpactStrategiesSQL = `
          SELECT sec.id as sectionId,sec.description, 
          CASE
        WHEN (SELECT challenge_priorization FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
          OR (SELECT challenge_priorization FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(challenge_priorization,'<(\/?p)>',' '),'<([^>]+)>',''))) 
            - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(challenge_priorization,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
            OR (SELECT research_questions FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT research_questions FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) = ''
            OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(research_questions,'<(\/?p)>',' '),'<([^>]+)>','')))
            - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(research_questions,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
          OR (SELECT component_work_package FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT component_work_package FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(component_work_package,'<(\/?p)>',' '),'<([^>]+)>',''))) 
            - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(component_work_package,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
          OR (SELECT performance_results FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT performance_results FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(performance_results,'<(\/?p)>',' '),'<([^>]+)>',''))) 
            - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(performance_results,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index} ) > 150
          OR (SELECT human_capacity FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT human_capacity FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index} ) = ''
            OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(human_capacity,'<(\/?p)>',' '),'<([^>]+)>',''))) 
            - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(human_capacity,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
            OR (SELECT max(p.type_id) FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id =${index})  IS NULL
            OR (SELECT max(p.type_id) FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id = ${index})   = ''
         THEN FALSE
           ELSE TRUE
           END AS validation
         FROM initiatives_by_stages ini
         JOIN sections_meta sec
        WHERE ini.id = ${this.initvStgId_}
          AND sec.stageId= ini.stageId
          AND sec.description='impact-statements';
          `;

        var impactStrategies = await this.queryRunner.query(
          validationImpactStrategiesSQL
        );

        impactStrategies[0].validation = parseInt(
          impactStrategies[0].validation
        );

        multi = multi * impactStrategies[0].validation;

        impactStrategies[0].validation = multi;
      }

      //Validate SubSections
      let validateImpactSubsectionSQL = `
      SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton,${impactStrategies[0].validation} as validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
     JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
      AND sec.id = subsec.sectionId
      AND sec.description='impact-statements'
      AND subsec.description = 'impact-areas';`,
        validateDinamicListSQL = `SELECT sec.id as sectionId,imp.impact_area_id,subsec.id as subSectionId,subsec.description as subseDescripton,
      CASE
     WHEN (imp.challenge_priorization) IS NULL
      OR (challenge_priorization) = ''
  OR (char_length(REGEXP_REPLACE(REGEXP_REPLACE(challenge_priorization,'<(\/?p)>',' '),'<([^>]+)>','')) 
  - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(challenge_priorization,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) > 150
  OR (research_questions) IS NULL
  OR (research_questions) = ''
  OR (char_length(REGEXP_REPLACE(REGEXP_REPLACE(research_questions,'<(\/?p)>',' '),'<([^>]+)>','')) 
  - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(research_questions,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) > 150
  OR (component_work_package) IS NULL
  OR (component_work_package) = ''
  OR (char_length(REGEXP_REPLACE(REGEXP_REPLACE(component_work_package,'<(\/?p)>',' '),'<([^>]+)>','')) 
  - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(component_work_package,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 ) > 150
  OR (performance_results) IS NULL
  OR (performance_results) = ''
  OR (char_length(REGEXP_REPLACE(REGEXP_REPLACE(performance_results,'<(\/?p)>',' '),'<([^>]+)>','')) 
  - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(performance_results,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 ) > 150
  OR (human_capacity) IS NULL
  OR (human_capacity) = ''
  OR (char_length(REGEXP_REPLACE(REGEXP_REPLACE(human_capacity,'<(\/?p)>',' '),'<([^>]+)>','')) 
  - char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(human_capacity,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 ) > 150
  OR (SELECT max(p.type_id) FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id =imp.impact_area_id)  IS NULL
  OR (SELECT max(p.type_id) FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id =imp.impact_area_id )   = ''
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
     JOIN impact_strategies imp
	JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
      AND ini.id = imp.initvStgId
	  AND sec.id = subsec.sectionId
      AND sec.description='impact-statements'
      AND subsec.description = 'impact-areas'`;

      var validateImpactSubsections = await this.queryRunner.query(
        validateImpactSubsectionSQL
      );
      var valiDinamicList = await this.queryRunner.query(
        validateDinamicListSQL
      );

      validateImpactSubsections[0].validation = parseInt(
        validateImpactSubsections[0].validation
      );
      valiDinamicList.map((imp) => {
        imp.validation = parseInt(imp.validation);
      });

      validateImpactSubsections.map((sub) => {
        sub['dinamicList'] = valiDinamicList.filter((di) => {
          return (di.subSectionId = sub.subSectionId);
        });
      });

      impactStrategies.map((imps) => {
        imps['subSections'] = [
          validateImpactSubsections.find((imp) => {
            return (imp.sectionId = imp.sectionId);
          })
        ];
      });

      return impactStrategies[0];
    } catch (error) {
      throw new BaseError(
        'Get validations impact strategies',
        400,
        error.message,
        false
      );
    }
  }

  async validationWorkPackages() {
    try {
      let getAllWpSQL = `
      SELECT id FROM work_packages where initvStgId= ${this.initvStgId_} AND ACTIVE = 1
      `;

      var allWorkPackages = await this.queryRunner.query(getAllWpSQL);

      if (allWorkPackages.length > 0) {
        // Get Work packages per initiative
        for (let index = 0; index < allWorkPackages.length; index++) {
          const wpId = allWorkPackages[index].id;

          var multi = 1;

          let validationWPSQL = `
          SELECT sec.id as sectionId,sec.description, 
          CASE
        WHEN (SELECT acronym FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL 
          OR (SELECT acronym FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
          OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>',''))) 
          - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(acronym,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
        FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id =${wpId}) > 3
        OR (SELECT name FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL
        OR (SELECT name FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(name,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) > 30
		    OR (SELECT pathway_content FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL
        OR (SELECT pathway_content FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
        OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>',''))) 
        - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(pathway_content,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) > 100
	    	OR (SELECT COUNT(id) FROM countries_by_initiative_by_stage WHERE initvStgId = ini.id and wrkPkgId = ${wpId} AND ACTIVE = 1 ) = 0
		    OR (SELECT COUNT(id) FROM regions_by_initiative_by_stage WHERE initvStgId = ini.id and wrkPkgId = ${wpId} AND ACTIVE = 1) = 0
         THEN FALSE
           ELSE TRUE
           END AS validation
         FROM initiatives_by_stages ini
         JOIN sections_meta sec
        WHERE ini.id = ${this.initvStgId_}
          AND sec.stageId= ini.stageId
          AND sec.description='work-package-research-plans-and-tocs';
          `;

          var workPackage = await this.queryRunner.query(validationWPSQL);

          workPackage[0].validation = parseInt(workPackage[0].validation);

          multi = multi * workPackage[0].validation;

          workPackage[0].validation = multi;
        }
      } else {
        workPackage = [];
      }

      return workPackage[0];
    } catch (error) {
      throw new BaseError(
        'Get validations Work packages',
        400,
        error.message,
        false
      );
    }
  }

  async validationContext() {
    var generalValidations;

    try {
      // Validate Sections
      let validationContextPSQL = `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(challenge_statement,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(challenge_statement,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
		OR (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(smart_objectives,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(smart_objectives,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
		OR (SELECT key_learnings FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT key_learnings FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(key_learnings,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(key_learnings,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
		OR (SELECT priority_setting FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT priority_setting FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(priority_setting,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(priority_setting,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
	    OR (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(comparative_advantage,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(comparative_advantage,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
	    OR (SELECT participatory_design FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT participatory_design FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(participatory_design,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(participatory_design,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
    OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'participatory_design') IS NULL
    OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'comparative_advantage') IS NULL
    OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'priority_setting') IS NULL
    OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'key_learnings') IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='context';
        `;

      var validationContext = await this.queryRunner.query(
        validationContextPSQL
      );

      validationContext[0].validation = parseInt(
        validationContext[0].validation
      );

      generalValidations = validationContext[0].validation;

      // Validate Citations

      // let getAllCitationsSQL = (`
      //  SELECT title,link,col_name
      //    FROM citations
      //   WHERE table_name = 'context'
      //     AND initvStgId = ${this.initvStgId_}
      //     AND active = 1
      //  ORDER BY col_name;
      //   `)

      // var allCitations = await this.queryRunner.query(getAllCitationsSQL);

      // var multi = generalValidations;

      // for (let index = 0; index < allCitations.length; index++) {

      //   const col_name = allCitations[index].col_name;
      //   const title = allCitations[index].title;
      //   const link = allCitations[index].link;
      //   var validCitation;

      //   if (col_name == 'key_learnings') {

      //     if (title !== '' && link !== '') {
      //       validCitation = 1;
      //     } else {
      //       validCitation = 0;
      //     }

      //   } else if (col_name == 'priority_setting') {

      //     if (title !== '' && link !== '') {
      //       validCitation = 1;
      //     } else {
      //       validCitation = 0;
      //     }

      //   } else if (col_name == 'participatory_design') {

      //     if (title !== '' && link !== '') {
      //       validCitation = 1;
      //     } else {
      //       validCitation = 0;
      //     }

      //   } else if (col_name == 'comparative_advantage') {

      //     if (title !== '' && link !== '') {
      //       validCitation = 1;
      //     } else {
      //       validCitation = 0;
      //     }

      //   } else {

      //     validCitation = 0;

      //   }

      //   multi = multi * validCitation;

      //   validationContext[0].validation = multi;

      // }

      // var validateProjectionBenefits = await this.validationsProjectionBenefits();

      // validationContext[0].validation = validateProjectionBenefits.validation * validationContext[0].validation;

      // var { challengeStatement, measurableObjectives, learning, prioritySetting, comparativeAdvantage, participatory } = await this.validationSubsectionContext(allCitations);

      var {
        challengeStatement,
        measurableObjectives,
        learning,
        prioritySetting,
        comparativeAdvantage,
        participatory
      } = await this.validationSubsectionContext();

      validationContext.map((con) => {
        con['subSections'] = [
          challengeStatement.find((cha) => {
            return (cha.sectionId = con.sectionId);
          }),
          measurableObjectives.find((me) => {
            return (me.sectionId = con.sectionId);
          }),
          learning.find((le) => {
            return (le.sectionId = con.sectionId);
          }),
          prioritySetting.find((pr) => {
            return (pr.sectionId = con.sectionId);
          }),
          comparativeAdvantage.find((com) => {
            return (com.sectionId = con.sectionId);
          }),
          participatory.find((par) => {
            return (par.sectionId = con.sectionId);
          })
        ];
      });

      return validationContext[0];
    } catch (error) {
      throw new BaseError('Get validations Context', 400, error.message, false);
    }
  }

  async validationsProjectionBenefits() {
    try {
      // 5 impact strategies
      for (let index = 1; index < 6; index++) {
        var multi = 1;

        // Validate Sections
        let validationProjectionBenefitsSQL = `
                SELECT sec.id as sectionId,sec.description, 
                CASE
				 WHEN (SELECT impact_area_active FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) = 1
                 THEN 
                TRUE  
              WHEN (SELECT impact_area_active FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) = 0
              AND (SELECT impact_area_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
               OR (SELECT impact_area_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) = ''
			   OR (SELECT impact_area_indicator_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
			   OR (SELECT impact_area_indicator_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
			   OR (SELECT notes FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
			   OR (SELECT notes FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
			   OR (SELECT char_length(notes) - char_length(REPLACE(REPLACE(REPLACE(REPLACE(notes,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
                  FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 200
			   OR (SELECT depth_scale_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
			   OR (SELECT depth_scale_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
			   OR (SELECT probability_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
			   OR (SELECT probability_id FROM projection_benefits WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
               THEN FALSE
                 ELSE TRUE
                 END AS validation
               FROM initiatives_by_stages ini
               JOIN sections_meta sec
              WHERE ini.id = ${this.initvStgId_}
                AND sec.stageId= ini.stageId
                AND sec.description='context'
                `;

        var validationProjectionBenefits = await this.queryRunner.query(
          validationProjectionBenefitsSQL
        );

        validationProjectionBenefits[0].validation = parseInt(
          validationProjectionBenefits[0].validation
        );

        multi = multi * validationProjectionBenefits[0].validation;

        validationProjectionBenefits[0].validation = multi;
      }

      return validationProjectionBenefits[0];
    } catch (error) {
      throw new BaseError(
        'Get validations projection benefits sections',
        400,
        error.message,
        false
      );
    }
  }

  /**
   * VALIDATIONS (GREEN CHECKS)
   * SUBSECTIONS:
   * Context : challenge statement, Measurable three-year outcomes,
   * Learning from prior evaluations and Impact Assessments (IA),Priority setting,
   * Comparative Advantage,Participatory design process,Projection of benefits
   */

  async validationSubsectionContext(allCitations?) {
    var generalChallengeStatement;

    try {
      let challengeStatementSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) IS NULL 
      OR (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) = ''
  OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(challenge_statement,'<(\/?p)>',' '),'<([^>]+)>',''))) 
  - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(challenge_statement,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
            FROM context WHERE initvStgId = ini.id ) > 500
     THEN FALSE
       ELSE TRUE
       END AS validation
     FROM initiatives_by_stages ini
     JOIN sections_meta sec
   JOIN subsections_meta subsec
    WHERE ini.id = ${this.initvStgId_}
      AND sec.stageId= ini.stageId
  AND sec.id = subsec.sectionId
      AND sec.description='context'
    AND subsec.description = 'challenge-statement';`,
        measurableObjectivesSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(smart_objectives,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(smart_objectives,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 ) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
		AND sec.id = subsec.sectionId
        AND sec.description='context'
	    AND subsec.description = 'measurable-objectives';`,
        learningSQL = ` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT key_learnings FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT key_learnings FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(key_learnings,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(key_learnings,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
	   OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'key_learnings') IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
		AND sec.id = subsec.sectionId
        AND sec.description='context'
	    AND subsec.description = 'learning-fpe-and-ia'`,
        prioritySettingSQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT priority_setting FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT priority_setting FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(priority_setting,'<(\/?p)>',' '),'<([^>]+)>','')))
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(priority_setting,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
	   OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'priority_setting') IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
		AND sec.id = subsec.sectionId
        AND sec.description='context'
	    AND subsec.description = 'priority-setting'`,
        comparativeAdvantageSQL = ` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(comparative_advantage,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(comparative_advantage,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
	   OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'comparative_advantage') IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
		AND sec.id = subsec.sectionId
        AND sec.description='context'
	    AND subsec.description = 'comparative-advantage'`,
        participatorySQL = `SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
        CASE
      WHEN (SELECT participatory_design FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT participatory_design FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT (char_length(REGEXP_REPLACE(REGEXP_REPLACE(participatory_design,'<(\/?p)>',' '),'<([^>]+)>',''))) 
    - (char_length(REPLACE(REPLACE(REPLACE(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(participatory_design,'<(\/?p)>',' '),'<([^>]+)>',''),'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1) AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
	   OR (SELECT max(id) as id FROM citations WHERE table_name = 'context' AND initvStgId = ini.id AND active = 1 AND col_name = 'participatory_design') IS NULL
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
		AND sec.id = subsec.sectionId
        AND sec.description='context'
	    AND subsec.description = 'participatory-design-process';  `,
        projectionBenefitsSQL = ``;

      var challengeStatement = await this.queryRunner.query(
        challengeStatementSQL
      );
      var measurableObjectives = await this.queryRunner.query(
        measurableObjectivesSQL
      );
      var learning = await this.queryRunner.query(learningSQL);
      var prioritySetting = await this.queryRunner.query(prioritySettingSQL);
      var comparativeAdvantage = await this.queryRunner.query(
        comparativeAdvantageSQL
      );
      var participatory = await this.queryRunner.query(participatorySQL);

      challengeStatement[0].validation = parseInt(
        challengeStatement[0].validation
      );
      measurableObjectives[0].validation = parseInt(
        measurableObjectives[0].validation
      );
      learning[0].validation = parseInt(learning[0].validation);
      prioritySetting[0].validation = parseInt(prioritySetting[0].validation);
      comparativeAdvantage[0].validation = parseInt(
        comparativeAdvantage[0].validation
      );
      participatory[0].validation = parseInt(participatory[0].validation);

      // if (learning[0].validation > 0) {

      //   allCitations.map(cit => {

      //     if (cit.col_name == 'key_learnings') {

      //       if (cit.title !== '' && cit.link !== '') {
      //         learning[0].validation = 1;
      //       } else {
      //         learning[0].validation = 0;
      //       }
      //     }

      //   })

      // } else if (prioritySetting[0].validation > 0) {

      //   allCitations.map(cit => {

      //     if (cit.col_name == 'priority_setting') {

      //       if (cit.title !== '' && cit.link !== '') {
      //         prioritySetting[0].validation = 1;
      //       } else {
      //         prioritySetting[0].validation = 0;
      //       }
      //     }

      //   })

      // } else if (comparativeAdvantage[0].validation > 0) {

      //   allCitations.map(cit => {

      //     if (cit.col_name == 'comparative_advantage') {

      //       if (cit.title !== '' && cit.link !== '') {
      //         comparativeAdvantage[0].validation = 1;
      //       } else {
      //         comparativeAdvantage[0].validation = 0;
      //       }
      //     }

      //   })

      // } else if (participatory[0].validation > 0) {

      //   allCitations.map(cit => {

      //     if (cit.col_name == 'comparative_advantage') {

      //       if (cit.title !== '' && cit.link !== '') {
      //         participatory[0].validation = 1;
      //       } else {
      //         participatory[0].validation = 0;
      //       }
      //     }

      //   })

      // }

      return {
        challengeStatement,
        measurableObjectives,
        learning,
        prioritySetting,
        comparativeAdvantage,
        participatory
      };
    } catch (error) {
      throw new BaseError(
        'Get validations Subsections Context',
        400,
        error.message,
        false
      );
    }
  }
}
