import { getConnection, getRepository, In } from "typeorm";
import { Citations } from "../entity/Citatitions";
import { CountriesByInitiativeByStage } from "../entity/CountriesByInitiativeByStage";
import { Initiatives } from "../entity/Initiatives";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { RegionsByInitiativeByStage } from "../entity/RegionsByInitiativeByStage";
import { Stages } from "../entity/Stages";
import { BaseError } from "./BaseError";
import { BaseValidation } from "./validation/BaseValidation";

import _ from "lodash";



export class InitiativeStageHandler extends BaseValidation {
    public initvStgId_;
    private intvStage_;
    private stageId_;
    private initiativeId_;


    public queryRunner = getConnection().createQueryRunner().connection;
    public initvStgRepo = getRepository(InitiativesByStages);
    public initiativeRepo = getRepository(Initiatives);
    private regionsRepo = getRepository(RegionsByInitiativeByStage);
    private countriesRepo = getRepository(CountriesByInitiativeByStage);

    constructor(initvStgId?: string, stageId?: string, initiativeId?: string) {
        super();
        this.initvStgId_ = initvStgId;
        this.stageId_ = stageId;
        this.initiativeId_ = initiativeId;
    }

    public get stageId() {
        try {
            let sql;
            if (this.stageId_ && this.initiativeId_) {
                sql = `SELECT id FROM stages WHERE id = ${this.stageId_}`
            } else {
                sql = `SELECT stageId AS id FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`
            }
            this.stageId_ = this.queryRunner.query(sql);
            return this.stageId_;
        } catch (error) {
            throw new BaseError('Get Stage id', 400, error.message, false)
        }
    }
    public get initvStage() {
        try {
            let sql;
            if (this.stageId_ && this.initiativeId_) {
                sql = `SELECT * FROM initiatives_by_stages WHERE stageId = ${this.stageId_} AND initiativeId = ${this.initiativeId_}`
            } else {
                sql = `SELECT * FROM initiatives_by_stages WHERE id = ${this.initvStgId_}`
            }
            this.intvStage_ = this.queryRunner.query(sql);
            return this.intvStage_;
        } catch (error) {
            throw new BaseError('Get intitative by stage object', 400, error.message, false)
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
    async addLink(title: string, link: string, table_name: string, col_name: string, citationId?: string, active?: boolean) {
        // get citations repo
        const citationsRepo = await getRepository(Citations);
        //  create empty object 
        let citation: Citations;
        try {
            // if null, create object
            if (citationId == null) {
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
            return citation;
        } catch (error) {
            throw new BaseError('Add link: Error', 400, error.message, false)
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
            const getlinks = await citationsRepo.find({ where: { initvStg: initvStg, table_name: table_name, col_name: col_name, active: active } });

            return getlinks;

        } catch (error) {
            throw new BaseError('Add link: Error', 400, error.message, false)
        }

    }



    /**
    * 
    * @returns { geoScope }
    */
    async getGeoScope() {

        // get initiative by stage id from intitiative
        const initvStgId: string = this.initvStgId_;
        try {
            // get initiative regions data
            let regions = await this.queryRunner.query(`SELECT region_id FROM regions_by_initiative_by_stage WHERE initvStgId =  ${initvStgId} AND active = 1`);
            // get initiative countries data
            let countries = await this.queryRunner.query(`SELECT country_id FROM countries_by_initiative_by_stage WHERE initvStgId =  ${initvStgId} AND active = 1`);

            return { regions, countries };
        } catch (error) {
            throw new BaseError('Geographic scope : Initiative by stage - Read', 400, error.message, false)
        }
    }

    /**
    * 
    * @param region_id? 
    * @param country_id? 
    * @returns { regions , countries }
    */

    async upsertGeoScope(region_id, country_id) {



        try {
            // get current intiative by stage
            const initvStg = await this.initvStage;
            // get geo scope from initiative by stage
            let initvStgRegions = await this.regionsRepo.findOne({ where: { initvStg: initvStg } });
            let initvStgCountries = await this.countriesRepo.findOne({ where: { initvStg: initvStg } });

            // if not exists, createe new element 
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

            return { regions: initvStgRegions, countries: initvStgCountries }

        } catch (error) {
            console.log(error)
            throw new BaseError('Geographic scope : Initiative by stage - Update', 400, error.message, false)
        }
    }

    /******* REPLICATION STEPS *********/



    async forwardGeoScope(stage: Stages | number, regions?, countries?) {
        // get initiative by stage id from intitiative
        const initvStg = await this.initvStage;
        try {
            // console.log(initvStg);
            // get geo scope from initiative by stage
            const initvStgGeoScope = await this.getGeoScope();


            // find intitiative by stage object from stage and initiative
            let forwardInitvStg = await this.initvStgRepo.findOne({ where: { stage: stage, initiative: initvStg[0].initiativeId } });
            if (forwardInitvStg == null) {
                forwardInitvStg = new InitiativesByStages();
                forwardInitvStg.initiative = initvStg[0].initiativeId;
                forwardInitvStg.stage = stage as Stages;
            }


            // let rRegions, rCountries;
            // const prevRegionsId = regions.map(region => region.region_id);
            // const prevCountriesId = countries.map(country => country.country_id);

            // rRegions = await this.regionsRepo.find({ where: { region_id: In(prevRegionsId), initvStg: forwardInitvStg } });
            // rCountries = await this.countriesRepo.find({ where: { country_id: In(prevCountriesId), initvStg: forwardInitvStg } });


            // const comparedRegions = rRegions == null ? regions : rRegions;
            // const comparedCountries =

            // // console.log(regions[0])
            // console.log(regions[1])
            // console.log(initvStgGeoScope.regions[0])
            // console.log(initvStgGeoScope.regions[1])

            // if (_.differenceBy(initvStgGeoScope.regions, regions, _.isEqual).length > 0) {
            //     comparedRegions = _.differenceBy(initvStgGeoScope.regions, regions, _.isEqual);
            // } else {
            //     comparedRegions = initvStgGeoScope.regions;

            // }

            // if (_.differenceBy(initvStgGeoScope.countries, countries, _.isEqual).length > 0) {
            //     comparedCountries = _.differenceBy(initvStgGeoScope.countries, countries, _.isEqual);
            // } else {
            //     comparedCountries = initvStgGeoScope.countries;

            // }

            // for each region add initiative by stage
            let pushedRegions = [];
            regions.forEach(async comparedRegion => {
                const rExists =  await this.regionsRepo.findOne({ where: { initvStg: forwardInitvStg, region_id: comparedRegion.region_id } })
                pushedRegions.push(rExists)
                const region = rExists ? rExists : new RegionsByInitiativeByStage();
                region.initvStg = forwardInitvStg;
                region.region_id = comparedRegion.region_id;
                pushedRegions.push(region)
            });
            // // for each country add initiative by stage
            // let pushedCountries = []
            // countries.forEach(comparedCountry => {
            //     const country = new CountriesByInitiativeByStage();
            //     country.initvStg = forwardInitvStg;
            //     country.country_id = comparedCountry;
            //     pushedCountries.push(country)
            // });

            console.log(pushedRegions)

            // and save
            const nRegions = await this.regionsRepo.save(pushedRegions);
            // const nCountries = await this.countriesRepo.save(pushedCountries);
            // return { regions: nRegions, countries: nCountries }
            return null

        } catch (error) {
            console.log(error)
            throw new BaseError('Geographic scope : Initiative by stage - Forward', 400, error.message, false)
        }

    }


    async setInitvStage() {
        try {
            const existInitvStg = await this.initvStage;
            this.intvStage_ = existInitvStg[0] ? existInitvStg[0] : new InitiativesByStages();

            this.intvStage_.active = true;
            this.intvStage_.initiative = this.initiativeId_;
            this.intvStage_.stage = this.stageId_;
            // save intiative by stage
            this.intvStage_ = await this.initvStgRepo.save(this.intvStage_);
            this.initvStgId_ = this.intvStage_.id;
            return this.intvStage_;

        } catch (error) {
            console.log(error)
            throw new BaseError('Set intitative by stage object', 400, error.message, false)

        }
    }

}