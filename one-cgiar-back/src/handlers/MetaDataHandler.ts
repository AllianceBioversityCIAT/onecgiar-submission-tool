import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";

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

      //Validations Sections

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

        //Validations subSections

        let validationBudgetSQL = (`
        
        SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
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
	   JOIN subsections_meta subsec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='financial-resources'
        AND subsec.description = 'budget'
        `)


        var budget = await this.queryRunner.query(validationBudgetSQL);

        budget[0].validation = parseInt(budget[0].validation);

        financialResources.map(pol => {
          pol['subSections'] = [
            budget.find(bu => {
  
              return (bu.sectionId = pol.sectionId)
  
            })
          ]
      
        }
        )


      return financialResources[0]

    } catch (error) {

      throw new BaseError('Get validations financial resources', 400, error.message, false)

    }

  }


  async validationPolicyCompliance() {

    try {

      //Validations for sections
      let validationPolicyComplianceSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT research_governance_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
          OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
          OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
          OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
          OR (SELECT LENGTH(open_fair_data_details) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(open_fair_data_details,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
          FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) > 250
       THEN FALSE
         ELSE TRUE
         END AS validation
       FROM initiatives_by_stages ini
       JOIN sections_meta sec
      WHERE ini.id = ${this.initvStgId_}
        AND sec.stageId= ini.stageId
        AND sec.description='policy-compliance-and-oversight';`
      )

      var policyCompliance = await this.queryRunner.query(validationPolicyComplianceSQL);

      policyCompliance[0].validation = parseInt(policyCompliance[0].validation);

      //Validations for subSections

      let validationResearchGovSQL = (` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
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
      AND subsec.description = 'research-governance';`),
        validationOpenFairSQL = (` SELECT sec.id as sectionId,sec.description,subsec.id as subSectionId,subsec.description as subseDescripton, 
      CASE
    WHEN    (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT open_fair_data_policy FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1) IS NULL 
        OR (SELECT open_fair_data_details FROM policy_compliance_oversight WHERE initvStgId = ini.id AND ACTIVE = 1 ) = ''
        OR (SELECT LENGTH(open_fair_data_details) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(open_fair_data_details,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
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
      AND subsec.description = 'open-and-fair-data-assets'; `)

      var researchGov = await this.queryRunner.query(validationResearchGovSQL);
      var openFair = await this.queryRunner.query(validationOpenFairSQL);

      researchGov[0].validation = parseInt(researchGov[0].validation);
      openFair[0].validation = parseInt(openFair[0].validation);

      policyCompliance.map(pol => {
        pol['subSections'] = [
          researchGov.find(re => {

            return (re.sectionId = pol.sectionId)

          }),
          openFair.find(op => {

            return (op.sectionId = pol.sectionId)

          })

        ]
    
      }
      )

      return policyCompliance[0]

    } catch (error) {

      throw new BaseError('Get validations policy compliance', 400, error.message, false)

    }

  }


  async validationImpactStrategies() {

    try {

      // 5 impact strategies
      for (let index = 1; index < 6; index++) {

        var multi = 1;

        let validationImpactStrategiesSQL = (
          `
          SELECT sec.id as sectionId,sec.description, 
          CASE
        WHEN (SELECT challenge_priorization FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL 
          OR (SELECT challenge_priorization FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT LENGTH(challenge_priorization) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(challenge_priorization,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
            OR (SELECT research_questions FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT research_questions FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) = ''
            OR (SELECT LENGTH(research_questions) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(research_questions,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
          OR (SELECT component_work_package FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT component_work_package FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT LENGTH(component_work_package) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(component_work_package,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
          OR (SELECT performance_results FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT performance_results FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1  AND impact_area_id = ${index}) = ''
            OR (SELECT LENGTH(performance_results) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(performance_results,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index} ) > 150
          OR (SELECT human_capacity FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) IS NULL
            OR (SELECT human_capacity FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index} ) = ''
            OR (SELECT LENGTH(human_capacity) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(human_capacity,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
            FROM impact_strategies WHERE initvStgId = ini.id AND ACTIVE = 1 AND impact_area_id = ${index}) > 150
            OR (SELECT p.type_id FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id =${index})  IS NULL
            OR (SELECT p.type_id FROM impact_strategies i JOIN partners p WHERE i.id = p.impact_strategies_id AND i.initvStgId = ini.id AND p.active = 1 AND i.impact_area_id = ${index})   = ''
         THEN FALSE
           ELSE TRUE
           END AS validation
         FROM initiatives_by_stages ini
         JOIN sections_meta sec
        WHERE ini.id = ${this.initvStgId_}
          AND sec.stageId= ini.stageId
          AND sec.description='impact-statements';
          `
        )

        var impactStrategies = await this.queryRunner.query(validationImpactStrategiesSQL);

        impactStrategies[0].validation = parseInt(impactStrategies[0].validation)

        multi = multi * impactStrategies[0].validation;

        impactStrategies[0].validation = multi;

      }

      return impactStrategies[0]

    } catch (error) {

      throw new BaseError('Get validations impact strategies', 400, error.message, false)

    }

  }


  async validationWorkPackages() {

    try {

      let getAllWpSQL = (`
      SELECT id FROM work_packages where initvStgId= ${this.initvStgId_} AND ACTIVE = 1
      `)

      var allWorkPackages = await this.queryRunner.query(getAllWpSQL);

      // Get Work packages per initiative
      for (let index = 0; index < allWorkPackages.length; index++) {

        const wpId = allWorkPackages[index].id;

        var multi = 1;

        let validationWPSQL = (
          `
          SELECT sec.id as sectionId,sec.description, 
          CASE
        WHEN (SELECT acronym FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL 
          OR (SELECT acronym FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
          OR (SELECT LENGTH(acronym) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(acronym,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
        FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id =${wpId}) > 3
        OR (SELECT name FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL
        OR (SELECT name FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
        OR (SELECT LENGTH(name) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(name,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) > 30
		    OR (SELECT pathway_content FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1 AND id = ${wpId}) IS NULL
        OR (SELECT pathway_content FROM work_packages WHERE initvStgId = ini.id AND ACTIVE = 1  AND id = ${wpId}) = ''
        OR (SELECT LENGTH(pathway_content) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(pathway_content,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
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
          `
        )

        var workPackage = await this.queryRunner.query(validationWPSQL);

        workPackage[0].validation = parseInt(workPackage[0].validation)

        multi = multi * workPackage[0].validation;

        workPackage[0].validation = multi;

      }

      return workPackage[0]

    } catch (error) {

      throw new BaseError('Get validations Work packages', 400, error.message, false)

    }

  }


  async validationContext() {

    var generalValidations;

    try {

      let validationContextPSQL = (
        `
        SELECT sec.id as sectionId,sec.description, 
        CASE
      WHEN (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) IS NULL 
        OR (SELECT challenge_statement FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(challenge_statement) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(challenge_statement,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
		OR (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT smart_objectives FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(smart_objectives) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(smart_objectives,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
		OR (SELECT key_learnings FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT key_learnings FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(key_learnings) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(key_learnings,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
		OR (SELECT priority_setting FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT priority_setting FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(priority_setting) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(priority_setting,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 250
	    OR (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT comparative_advantage FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(comparative_advantage) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(comparative_advantage,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
              FROM context WHERE initvStgId = ini.id ) > 500
	    OR (SELECT participatory_design FROM context WHERE initvStgId = ini.id) IS NULL 
		OR (SELECT participatory_design FROM context WHERE initvStgId = ini.id) = ''
		OR (SELECT LENGTH(participatory_design) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(participatory_design,'\r', '' ),'\n', ''),'\t', '' ), ' ', '')) + 1 AS wordcount 
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
        `
      )

      var validationContext = await this.queryRunner.query(validationContextPSQL);

      validationContext[0].validation = parseInt(validationContext[0].validation)

      generalValidations = validationContext[0].validation;

      let getAllCitationsSQL = (`
     SELECT title,link,col_name
       FROM citations
      WHERE table_name = 'context'
        AND initvStgId = ${this.initvStgId_}
        AND active = 1
     ORDER BY col_name;
      `)

      var allCitations = await this.queryRunner.query(getAllCitationsSQL);

      var multi = generalValidations;

      for (let index = 0; index < allCitations.length; index++) {

        const col_name = allCitations[index].col_name;
        const title = allCitations[index].title;
        const link = allCitations[index].link;
        var validCitation;

        if (col_name == 'key_learnings') {

          if (title !== '' && link !== '') {
            validCitation = 1;
          } else {
            validCitation = 0;
          }

        } else if (col_name == 'priority_setting') {

          if (title !== '' && link !== '') {
            validCitation = 1;
          } else {
            validCitation = 0;
          }

        } else if (col_name == 'participatory_design') {

          if (title !== '' && link !== '') {
            validCitation = 1;
          } else {
            validCitation = 0;
          }

        } else if (col_name == 'comparative_advantage') {

          if (title !== '' && link !== '') {
            validCitation = 1;
          } else {
            validCitation = 0;
          }

        } else {

          validCitation = 0;

        }

        multi = multi * validCitation;

        validationContext[0].validation = multi;

      }

      return validationContext[0]

    } catch (error) {

      throw new BaseError('Get validations Context', 400, error.message, false)

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