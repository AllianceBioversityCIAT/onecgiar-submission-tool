import _ from "lodash";
import { InitiativesByStages } from "../../entity/InititativesByStages";
import { ConceptSections } from "../../interfaces/ConceptSectionsInterface";
import { BaseError } from "../BaseError";
import { InitiativeStageHandler } from "../InitiativeStageController";

export class ConceptValidation extends InitiativeStageHandler {

    /**
   * @param initvStgId
   * @returns validatedConceptInfo && validatedLead && validatedCoLead
   */
    public async isGIComplete() {

        try {
            // get general information data 
            const generalInformation = await this.queryRunner.query(`
            SELECT
                (SELECT name FROM concept_info WHERE initvStgId = initvStgs.id) AS name,
                (SELECT action_area_id FROM concept_info WHERE initvStgId = initvStgs.id) AS action_area_id,
                (SELECT userId FROM initiatives_by_users WHERE initiativeId = initvStgs.initiativeId AND roleId = (SELECT id FROM roles WHERE acronym = 'SGD')) AS lead_user,
                (SELECT userId FROM initiatives_by_users WHERE initiativeId = initvStgs.initiativeId AND roleId = (SELECT id FROM roles WHERE acronym = 'PI') ) AS co_lead_user

            FROM initiatives_by_stages initvStgs 
            WHERE id = ${this.initvStgId_}
            `);

            // check if general information has empty or null values
            const giArray = _.values(generalInformation[0])
            // return all validated sub sections
            return this.checkEmptyArray(giArray);

        } catch (error) {
            throw new BaseError('Validate general information', error.status || 406, error.message, false);
        }
    }

    /**
   * @param initvStgId
   * @returns validatedNarratives
   */
    public async isNarrtvComplete() {
        try {
            // get narratives data
            const narrativesData = await this.queryRunner.query(`SELECT challenge, objectives, results, highlights FROM concept_info WHERE initvStgId = ${this.initvStgId_}`);
            const narrtvArray = _.values(narrativesData[0])

            // return all validated sub sections
            return this.checkEmptyArray(narrtvArray);

        } catch (error) {
            throw new BaseError('Validate narratives', error.status || 406, error.message, false);
        }
    }

    /**
    * @param initvStgId
    * @returns validatedTocs
    */
    public async isTOCComplete() {
        try {
            // get tocs data
            const tocs = await this.queryRunner.query(`SELECT id FROM tocs WHERE initvStgId = ${this.initvStgId_}`);
            // get tocs files data
            const files = await this.queryRunner.query(`SELECT id FROM files WHERE tocsId =(SELECT id FROM tocs WHERE initvStgId = ${this.initvStgId_})`);
            const tocsArr = _.values(tocs[0]);
            const filesArr = _.values(files[0]);

            tocsArr.concat(filesArr);

            // return all validated sub sections
            return this.checkEmptyArray(tocsArr);

        } catch (error) {
            throw new BaseError('Validate narratives', error.status || 406, error.message, false);
        }
    }

    /**
     * @param initvStgId
     * @returns validatedWorkPackages
     */
    public async isWPComplete() {
        try {
            // get tocs data
            // get work packages data
            const workPackages = await this.queryRunner.query(`SELECT name, results, pathway_content, acronym FROM work_packages WHERE initvStgId = ${this.initvStgId_} AND active = 1`);
            // get work packages regions data
            const regions = await this.queryRunner.query(`SELECT region_id FROM regions_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${this.initvStgId_} AND active = 1 LIMIT 1)`);
            // get work packages countries data
            const countries = await this.queryRunner.query(`SELECT country_id FROM countries_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${this.initvStgId_} AND active = 1 LIMIT 1)`);

            // validate if any field is empty or null
            const wpArr = _.values(workPackages[0]);
            const regionsArr = _.values(regions[0]);
            const countriesArr = _.values(countries[0]);

            wpArr.concat(regionsArr, countriesArr);

            // return all validated sub sections
            return this.checkEmptyArray(wpArr);

        } catch (error) {
            throw new BaseError('Validate narratives', error.status || 406, error.message, false);
        }
    }

    /**
     * @param initvStgId
     * @returns validatedKeyPartners
     */
    public async isKPComplete() {
        try {
            // get key partners data
            const keyPartners = await this.queryRunner.query(`SELECT key_partner_id, key_partner_name, description FROM key_partners WHERE partnershipsId =(SELECT id FROM partnerships WHERE initvStgId = ${this.initvStgId_})`);
            // validate if any field is empty or null
            const kpArr = _.values(keyPartners[0]);

            // return all validated sub sections
            return this.checkEmptyArray(kpArr);

        } catch (error) {
            throw new BaseError('Validate narratives', error.status || 406, error.message, false);
        }
    }


     /**
     * @param initvStgId
     * @returns sections validated
     */
      async validateSections() {
        const validatedSection = <ConceptSections>{
            general_information: null,
            narratives: null,
            initial_theory_of_change: null,
            work_packages: null,
            key_partners: null
        };

        try {

            validatedSection.general_information = await this.isGIComplete();
            validatedSection.narratives = await this.isNarrtvComplete();
            validatedSection.initial_theory_of_change = await this.isTOCComplete();
            validatedSection.work_packages = await this.isWPComplete();
            validatedSection.key_partners = await this.isKPComplete();

            return validatedSection
        } catch (error) {
            throw new BaseError('Validate sections', error.status || 406, error.message, false);
        }

    }


    /**
   * 
   * @returns isMissing boolean
   */
    async validateCompletness() {
        //  get current intititve by stage
        const currentInitvStg = await this.initvStgRepo.findOne({ where: { id: this.initvStgId_ }, relations: ['stage', 'initiative'] });
        // get complited / valid sections of stage data
        const stageDesc = currentInitvStg.stage.description.split(' ').join('_').toLocaleLowerCase();
        const validatedSections = await this.validateSections();
        // validate if any missing section
        const missingSctn = (element) => element == false || element == 0;
        const isMissing = Object.values(validatedSections).some(missingSctn);
        return !isMissing;
    }

}