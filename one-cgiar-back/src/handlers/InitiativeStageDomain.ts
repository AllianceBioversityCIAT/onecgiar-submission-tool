import {getConnection, getCustomRepository, getRepository} from 'typeorm';
import {Citations} from '../entity/Citatitions';
import {CountriesByInitiativeByStage} from '../entity/CountriesByInitiativeByStage';
import {Initiatives} from '../entity/Initiatives';
import {InitiativesByStages} from '../entity/InititativesByStages';
import * as entities from '../entity';
import {RegionsByInitiativeByStage} from '../entity/RegionsByInitiativeByStage';
import {Stages} from '../entity/Stages';
import {BaseError} from './BaseError';
import {BaseValidation} from './validation/BaseValidation';
import {Budget} from '../entity/Budget';
import {GeneralInformationRepository} from '../repositories/generalInformationRepository';
import {InitiativeHandler} from './InitiativesDomain';
import { CountriesByMeliaStudy } from '../entity/CountriesByMeliaStudy';

export class InitiativeStageHandler extends BaseValidation {
  public initvStgId_;
  private intvStage_;
  private stageId_;
  private initiativeId_;

  public queryRunner = getConnection().createQueryRunner().connection;
  public initvStgRepo = getRepository(InitiativesByStages);
  public initiativeRepo = getRepository(Initiatives);
  public stageRepo = getRepository(Stages);
  private regionsRepo = getRepository(RegionsByInitiativeByStage);
  private countriesRepo = getRepository(CountriesByInitiativeByStage);
  // private regionsMeliaStdRepo = getRepository();
  private countriesMeliaStdRepo = getRepository(CountriesByMeliaStudy);

  constructor(
    initvStgId?: string | number,
    stageId?: string | number,
    initiativeId?: string | number
  ) {
    super();
    this.initvStgId_ = initvStgId;
    this.stageId_ = stageId;
    this.initiativeId_ = initiativeId;
  }

  public get stageId() {
    try {
      let sql;
      if (this.stageId_ && this.initiativeId_) {
        sql = `SELECT id FROM stages WHERE id = ${this.stageId_}`;
      } else {
        sql = `SELECT stageId AS id FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`;
      }
      this.stageId_ = this.queryRunner.query(sql);
      return this.stageId_;
    } catch (error) {
      throw new BaseError('Get Stage id', 400, error.message, false);
    }
  }
  public get stage() {
    try {
      let sql;
      if (this.stageId_ && this.initiativeId_) {
        sql = `SELECT * FROM stages WHERE id = ${this.stageId_}`;
      } else {
        sql = `SELECT * FROM stages WHERE id = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_})`;
      }
      return this.queryRunner.query(sql);
    } catch (error) {
      throw new BaseError('Get Stage', 400, error.message, false);
    }
  }
  public get initvStage() {
    try {
      let sql;
      if (this.stageId_ && this.initiativeId_) {
        sql = `SELECT * FROM initiatives_by_stages WHERE stageId = ${this.stageId_} AND initiativeId = ${this.initiativeId_}`;
      } else {
        sql = `SELECT * FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`;
      }
      this.intvStage_ = this.queryRunner.query(sql);
      return this.intvStage_;
    } catch (error) {
      throw new BaseError(
        'Get initiative by stage object',
        400,
        error.message,
        false
      );
    }
  }

  /**
   *
   * @param initvStg
   * @returns summary
   */
  async getSummary(initvStg) {
    try {
      const generalInfoRepo = await getCustomRepository(
        GeneralInformationRepository
      );

      const summary = await generalInfoRepo.requestSummary(initvStg);

      return summary;
    } catch (error) {
      throw new BaseError('Request Summary : Error', 400, error.message, false);
    }
  }

  async upsertSummary(
    generalInformationId,
    name,
    action_area_id,
    action_area_description,
    acronym,
    budgetId,
    budget_value,
    regions,
    countries
  ) {
    try {
      // upsert geo scope, budget, general information
      const upsertedGeoScope = await this.upsertGeoScopes(regions, countries);
      const upsertedBudget = await this.addBudget(
        budget_value,
        'general_information',
        'budget',
        budgetId,
        true
      );
      const upsertedGeneralInformation = await this.upsertGeneralInformation(
        generalInformationId,
        name,
        action_area_id,
        action_area_description,
        acronym
      );

      return {upsertedGeoScope, upsertedBudget, upsertedGeneralInformation};
    } catch (error) {
      throw new BaseError('Upsert Summary: Error', 400, error.message, false);
    }
  }

  /**
   ** UPSERT GENERAL INFORMATION
   * @param generalInformationId?
   * @param name
   * @param action_area_id
   * @param action_area_description
   * @returns generalInformation
   */
  async upsertGeneralInformation(
    generalInformationId?,
    name?,
    action_area_id?,
    action_area_description?,
    acronym?
  ) {
    const gnralInfoRepo = getRepository(entities.GeneralInformation);

    //  create empty object
    let generalInformation: entities.GeneralInformation;
    try {
      // get current intiative by stage
      // const initvStg = await this.initvStage;
      const initvStg = await this.setInitvStage();

      // get clarisa action action areas
      const initiativeshandler = new InitiativeHandler();
      const actionAreas = await initiativeshandler.requestActionAreas();

      // get select action areas for initiative
      const selectedActionArea = actionAreas.find(
        (area) => area.id == action_area_id
      ) || {name: null};

      // if null, create object
      if (generalInformationId == null) {
        generalInformation = new entities.GeneralInformation();
        generalInformation.name = name;
        generalInformation.acronym = acronym;
        generalInformation.action_area_description =
          action_area_description || selectedActionArea.name;
        generalInformation.action_area_id = action_area_id;
        // assign initiative by stage
        generalInformation.initvStg = initvStg.id;
      } else {
        generalInformation = await gnralInfoRepo.findOne(generalInformationId);
        generalInformation.name = name ? name : generalInformation.name;
        generalInformation.acronym = acronym
          ? acronym
          : generalInformation.acronym;
        generalInformation.action_area_description = selectedActionArea.name;
        generalInformation.action_area_id = action_area_id
          ? action_area_id
          : generalInformation.action_area_id;
      }
      // upserted data
      let upsertedInfo = await gnralInfoRepo.save(generalInformation);

      //    update initiative name
      let initiative = await this.initiativeRepo.findOne(initvStg.initiativeId);
      initiative.name = upsertedInfo.name;
      initiative.acronym = upsertedInfo.acronym;
      initiative = await this.initiativeRepo.save(initiative);

      // retrieve general information
      const GIquery = ` 
            SELECT
            initvStgs.id AS initvStgId,
            general.id AS generalInformationId,
            IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
            IF(general.acronym IS NULL OR general.acronym = '' , (SELECT acronym FROM initiatives WHERE id = initvStgs.initiativeId ), general.acronym) AS acronym,
            (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS lead_id,
            (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS first_name,
            (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS email,
            
                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS co_lead_id,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_first_name,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS co_email,
                
                general.action_area_description AS action_area_description,
                general.action_area_id AS action_area_id
                
                FROM
                initiatives_by_stages initvStgs
            LEFT JOIN general_information general ON general.initvStgId = initvStgs.id
            
            WHERE initvStgs.id = ${initvStg.id};
            `;
      const generalInfo = await this.queryRunner.query(GIquery);

      return generalInfo[0];
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'General information : Full proposal',
        400,
        error.message,
        false
      );
    }
  }

  /**
   *
   * @param title
   * @param link
   * @param table_name
   * @param col_name
   * @param citationId?
   * @returns citation
   */
  async addLink(
    title: string,
    link: string,
    table_name: string,
    col_name: string,
    citationId?: string,
    active?: boolean
  ) {
    // get citations repo
    const citationsRepo = await getRepository(Citations);
    //  create empty object
    let citation: Citations;
    try {
      // if null, create object
      if (citationId == null || citationId == '') {
        citation = new Citations();
        // assign initiative by stage
        citation.initvStg = this.initvStgId_;
      } else {
        citation = await citationsRepo.findOne(citationId);
      }

      citation.title = title;
      citation.link = link;
      citation.table_name = table_name;
      citation.col_name = col_name;
      citation.active = active;

      // upsert citation
      const addedLink = await citationsRepo.save(citation);
      return addedLink;
    } catch (error) {
      throw new BaseError('Add link: Error', 400, error.message, false);
    }
  }

  /**
   *
   * @param table_name
   * @param col_name
   * @param active
   * @returns
   */

  async getLink(table_name: string, col_name: string, active?: boolean) {
    // get citations repo
    const citationsRepo = await getRepository(Citations);
    //  create empty object

    try {
      const initvStg = this.initvStgId_;

      // upsert getlinks
      const getlinks = await citationsRepo.find({
        where: {
          initvStg: initvStg,
          table_name: table_name,
          col_name: col_name,
          active: active
        }
      });

      return getlinks;
    } catch (error) {
      throw new BaseError('Add link: Error', 400, error.message, false);
    }
  }

  /**
   *
   * @param value
   * @param table_name
   * @param col_name
   * @param budgetId?
   * @returns citation
   */
  async addBudget(
    value: string,
    table_name: string,
    col_name: string,
    budgetId?: string,
    active?: boolean
  ) {
    // get budget repo
    const budgetRepo = await getRepository(Budget);
    //  create empty object
    let budget: Budget;
    try {
      // if null, create object
      if (budgetId == null || budgetId == '' || budgetId == undefined) {
        budget = new Budget();
        // assign initiative by stage
        budget.initvStg = this.initvStgId_;

        var validateBudget = await budgetRepo.find({
          where: {initvStg: budget.initvStg}
        });

        if (validateBudget == undefined || validateBudget.length > 0) {
          throw new BaseError(
            'Add budget: Error',
            400,
            'The budget was previously created',
            false
          );
        }
      } else {
        budget = await budgetRepo.findOne(budgetId);
      }

      budget.value = value;
      budget.table_name = table_name;
      budget.col_name = col_name;
      budget.active = active;

      // upsert budget
      const addedBudget = await budgetRepo.save(budget);
      return addedBudget;
    } catch (error) {
      throw new BaseError('Add budget: Error', 400, error.message, false);
    }
  }

  /**
   *
   * @param table_name
   * @param col_name
   * @param active
   * @returns
   */

  async getBudget(table_name: string, col_name: string, active?: boolean) {
    // get budget repo
    const budgetRepo = await getRepository(Budget);

    try {
      const initvStg = this.initvStgId_;

      // upsert getBudget
      var getBudget: Budget = await budgetRepo.findOne({
        where: {
          initvStg: initvStg,
          table_name: table_name,
          col_name: col_name,
          active: active
        }
      });

      if (getBudget) {
        getBudget.value;
      } else {
        getBudget = new Budget();
      }

      return getBudget;
    } catch (error) {
      throw new BaseError('Get budget: Error', 400, error.message, false);
    }
  }

  /**
   *
   * @param id
   */
  async removeBudget(id) {
    const budgetRepo = await getRepository(Budget);

    try {
      const budget = await budgetRepo.findOne(id);

      const removeBudget = await budgetRepo.delete(budget);

      return removeBudget;
    } catch (error) {
      throw new BaseError('remove budget: Error', 400, error.message, false);
    }
  }

  /**
   *
   * @returns { geoScope }
   */
  async getGeoScope() {
    // get initiative by stage id from initiative
    const initvStgId: string = this.initvStgId_;
    try {
      // get initiative regions data
      let regions = await this.queryRunner.query(`
            SELECT * 
            FROM (
            SELECT region_id,NULL AS wrkPkg
              FROM regions_by_initiative_by_stage 
             WHERE initvStgId =  ${initvStgId}
               AND active = 1 
            GROUP BY region_id
            UNION ALL
            SELECT a.region_id,
            CASE 
            WHEN wrkPkgId > 0
             THEN (
             SELECT c.id
               from work_packages c
              where c.initvStgId = (SELECT MAX(e.id)
              FROM initiatives_by_stages e
             where e.initiativeId = a.initvStgId)
                and c.name = b.name  
             )
             ELSE NULL 
             END AS newWrkPkgId  
              FROM regions_by_initiative_by_stage a
               JOIN work_packages b 
             WHERE a.wrkPkgId = b.id
               AND a.initvStgId =  ${initvStgId}
               AND a.active = 1) A
            GROUP BY A.region_id,A.wrkPkg;
            `);
      // get initiative countries data
      let countries = await this.queryRunner.query(`
            SELECT * 
              FROM (
            SELECT country_id, NULL AS wrkPkg 
              FROM countries_by_initiative_by_stage 
             WHERE initvStgId =  ${initvStgId}
               AND active = 1 
           GROUP BY country_id
           UNION ALL 
           SELECT a.country_id,
             CASE 
             WHEN wrkPkgId > 0
              THEN (
              SELECT c.id
                from work_packages c
               where c.initvStgId = (SELECT MAX(e.id)
               FROM initiatives_by_stages e
              where e.initiativeId = a.initvStgId)
                 and c.name = b.name  
              )
              ELSE NULL 
              END AS newWrkPkgId  
               FROM countries_by_initiative_by_stage a
                JOIN work_packages b 
              WHERE a.wrkPkgId = b.id
                AND a.initvStgId =  ${initvStgId}
                AND a.active = 1) A
                        GROUP BY A.country_id,A.wrkPkg
            `);

      return {regions, countries};
    } catch (error) {
      throw new BaseError(
        'Geographic scope : Initiative by stage - Read',
        400,
        error.message,
        false
      );
    }
  }

  /**
   *
   * @param region_id?
   * @param country_id?
   * @returns { regions , countries }
   */

  async upsertGeoScope(region_id?, country_id?) {
    try {
      // get current initiative by stage
      const initvStg = await this.initvStage;
      // get geo scope from initiative by stage
      let initvStgRegions = await this.regionsRepo.findOne({
        where: {initvStg: initvStg}
      });
      let initvStgCountries = await this.countriesRepo.findOne({
        where: {initvStg: initvStg}
      });

      // if not exists, create new element
      if (initvStgRegions == null) {
        initvStgRegions = new RegionsByInitiativeByStage();
      }
      if (initvStgCountries == null) {
        initvStgCountries = new CountriesByInitiativeByStage();
      }

      // assign regions and countries to initiatives
      initvStgRegions.region_id = region_id;
      initvStgCountries.country_id = country_id;

      // save geo scope
      initvStgRegions = await this.regionsRepo.save(initvStgRegions);
      initvStgCountries = await this.countriesRepo.save(initvStgCountries);

      return {regions: initvStgRegions, countries: initvStgCountries};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Geographic scope : Initiative by stage - Update',
        400,
        error.message,
        false
      );
    }
  }


  /**
   *
   * @param region?
   * @param countries?
   * @returns { regions , countries }
   */

  async upsertGeoScopes(regions?, countries?) {


    let initvStgRegions, initvStgCountries;

    try {
      // get current initiative by stage
      const initvStg = await this.initvStage;
      // get geo scope from initiative by stage
      initvStgRegions = await this.regionsRepo.find({
        where: {initvStg: initvStg[0]}
      });
      initvStgCountries = await this.countriesRepo.find({
        where: {initvStg: initvStg[0]}
      });

      if (regions) {
        const uniqueRegions = [].concat(
          regions.filter((obj1) =>
            initvStgRegions.every(
              (obj2) =>
                obj1.region_id !== obj2.region_id || obj1.active !== obj2.active
            )
          )
        );
        uniqueRegions.every((uA) => (uA['initvStg'] = initvStg[0].id));

        // save geo scope
        initvStgRegions = await this.regionsRepo.save(uniqueRegions);
      }
      if (countries) {
        const uniqueCountries = [].concat(
          countries.filter((obj1) =>
            initvStgCountries.every(
              (obj2) =>
                obj1.country_id !== obj2.country_id ||
                obj1.active !== obj2.active
            )
          )
        );
        uniqueCountries.every((uA) => (uA['initvStg'] = initvStg[0].id));

        // save geo scope
        initvStgCountries = await this.countriesRepo.save(uniqueCountries);
      }

      // const regions_ = await this.regionsRepo.find({ where: { initvStg: initvStg[0] } });
      // const countries_ = await this.countriesRepo.find({ where: { initvStg: initvStg[0] } });

      return {regions: initvStgRegions, countries: initvStgCountries};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Geographic scope : Initiative by stage - Update',
        400,
        error.message,
        false
      );
    }
  }

   /**
   *
   * @param region?
   * @param countries?
   * @returns { regions , countries }
   */

  async upsertGeoScopesMeliaStudies(regions?, countries?) {

    console.log('upsertGeoScopesMeliaStudies service...');

    let initvStgRegions, initvStgCountries;

    try {
      // get current initiative by stage
      const initvStg = await this.initvStage;
      // get geo scope from initiative by stage
      // initvStgRegions = await this.regionsRepo.find({
      //   where: {initvStg: initvStg[0]}
      // });
      initvStgCountries = await this.countriesMeliaStdRepo.find({
        where: {initvStg: initvStg[0]}
      });
      console.log({initvStg, initvStgCountries});
      
      // if (regions) {
      //   const uniqueRegions = [].concat(
      //     regions.filter((obj1) =>
      //       initvStgRegions.every(
      //         (obj2) =>
      //           obj1.region_id !== obj2.region_id || obj1.active !== obj2.active
      //       )
      //     )
      //   );
      //   uniqueRegions.every((uA) => (uA['initvStg'] = initvStg[0].id));

      //   // save geo scope
      //   initvStgRegions = await this.regionsRepo.save(uniqueRegions);
      // }


      if (countries) {
        const uniqueCountries = [].concat(
          countries.filter((obj1) =>
            initvStgCountries.every(
              (obj2) =>
                obj1.meliaStudyId !== obj2.meliaStudyId ||
                obj1.country_id !== obj2.country_id ||
                obj1.active !== obj2.active
            )
          )
        );
        uniqueCountries.every((uA) => (uA['initvStgId'] = initvStg[0].id));
        console.log({uniqueCountries, initvStg: initvStg[0].id});

        
        // save geo scope
        initvStgCountries = await this.countriesMeliaStdRepo.save(uniqueCountries);
      }

      // const regions_ = await this.regionsRepo.find({ where: { initvStg: initvStg[0] } });
      // const countries_ = await this.countriesRepo.find({ where: { initvStg: initvStg[0] } });

      return {regions: [], countries: initvStgCountries};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Geographic scope : Melia studies - Update',
        400,
        error.message,
        false
      );
    }
  }

  /******* REPLICATION STEPS *********/

  async forwardGeoScope(forwardStage: Stages | number) {
    // get initiative by stage id from initiative
    const initvStg = await this.initvStage;
    try {
      // get geo scope from initiative by stage
      const currentInitvStgGeoScope = await this.getGeoScope();

      // find initiative by stage object from stage and initiative
      let forwardInitvStg = await this.initvStgRepo.findOne({
        where: {stage: forwardStage, initiative: initvStg[0].initiativeId}
      });
      if (forwardInitvStg == null) {
        forwardInitvStg = new InitiativesByStages();
        forwardInitvStg.initiative = initvStg[0].initiativeId;
        forwardInitvStg.stage = forwardStage as Stages;
      }

      // get regions forwarded
      const forwardedRegions = await this.regionsRepo.find({
        where: {initvStg: forwardInitvStg},
        select: ['region_id', 'initvStg']
      });

      // get regions from current initiative
      const currentRegions: RegionsByInitiativeByStage[] = JSON.parse(
        JSON.stringify(currentInitvStgGeoScope.regions)
      );

      // unify arrays validating duplicated in forwarded regions
      const uniqueRegions = [].concat(
        forwardedRegions.filter((obj1) =>
          currentRegions.every((obj2) => obj1.region_id !== obj2.region_id)
        ),
        currentRegions.filter((obj2) =>
          forwardedRegions.every((obj1) => obj2.region_id !== obj1.region_id)
        )
      );
      uniqueRegions.every((uA) => (uA['initvStg'] = forwardInitvStg));

      // get countries forwarded
      const forwardedCountries = await this.countriesRepo.find({
        where: {initvStg: forwardInitvStg},
        select: ['country_id', 'initvStg']
      });

      // get countries from current initiative
      const currentCountries: CountriesByInitiativeByStage[] = JSON.parse(
        JSON.stringify(currentInitvStgGeoScope.countries)
      );

      // unify arrays validating duplicated in forwarded countries

      const uniqueCountries = [].concat(
        forwardedCountries.filter((obj1) =>
          currentCountries.every((obj2) => obj1.country_id !== obj2.country_id)
        ),
        currentCountries.filter((obj2) =>
          forwardedCountries.every(
            (obj1) => obj2.country_id !== obj1.country_id
          )
        )
      );
      uniqueCountries.every((uA) => (uA['initvStg'] = forwardInitvStg));

      // and save
      await this.regionsRepo.save(uniqueRegions);
      await this.countriesRepo.save(uniqueCountries);

      const geoScope = await this.getGeoScope();

      return {regions: geoScope.regions, countries: geoScope.countries};
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Geographic scope : Initiative by stage - Forward',
        400,
        error.message,
        false
      );
    }
  }

  async setInitvStage() {
    let oldInitiative;

    try {
      const existInitvStg = await this.initvStage;
      this.intvStage_ = existInitvStg[0]
        ? existInitvStg[0]
        : new InitiativesByStages();

     // this.intvStage_.active = true;
      this.intvStage_.initiative = this.initiativeId_;
      this.intvStage_.stage = this.stageId_;
      // save initiative by stage
      this.intvStage_ = await this.initvStgRepo.save(this.intvStage_);
      this.initvStgId_ = this.intvStage_.id;

      oldInitiative = await this.queryRunner.query(`
            SELECT a.id,a.initiativeId,MIN(a.stageId) AS stageId,a.active
            FROM initiatives_by_stages a
           where a.initiativeId = (SELECT initiativeId
            FROM initiatives_by_stages a
           where a.id = ${this.intvStage_.id})
           GROUP BY a.id,a.initiativeId,a.stageId,a.active
        `);

      if (
        this.intvStage_.stageId
          ? this.intvStage_.stageId
          : this.initvStgId_ > oldInitiative[0].stageId
      ) {
        oldInitiative[0].active = false;

        await this.initvStgRepo.save(oldInitiative[0]);
      }

      return this.intvStage_;
    } catch (error) {
      console.log(error);
      throw new BaseError(
        'Set initiative by stage object',
        400,
        error.message,
        false
      );
    }
  }
}
