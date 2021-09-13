import { getRepository } from "typeorm";
import { getClaActionAreas } from "../controllers/Clarisa";
import { Context } from "../entity/Context";
import { CountriesByInitiativeByStage } from "../entity/CountriesByInitiativeByStage";
import { Dimensions } from "../entity/Dimensions";
import { GeneralInformation } from "../entity/GeneralInformation";
import { ImpactStrategies } from "../entity/ImpactStrategies";
import { Partners } from "../entity/Partners";
import { ProjectionBenefits } from "../entity/ProjectionBenefits";
import { RegionsByInitiativeByStage } from "../entity/RegionsByInitiativeByStage";
import { WorkPackages } from "../entity/WorkPackages";
import { ProposalSections } from "../interfaces/FullProposalSectionsInterface";
import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";


export class ProposalHandler extends InitiativeStageHandler {
    public sections: ProposalSections = <ProposalSections>{
        general_information: null,
        context: null
    };


    private metaData_;

    /**
     * Getter
     * @returns stage section metadata
     */
    public get metaData() {

        return this.metaData_;

    }


    /**
     * Setter
     * @set section name
     */
    public set metaData(sectionName: any) {

        try {
            this.metaData_ = this.queryRunner.query(` SELECT * FROM stages_meta WHERE stageId = (SELECT stageId FROM initiatives_by_stages WHERE id = ${this.initvStgId_}) ORDER BY stages_meta.order`);

        } catch (error) {
            throw new BaseError('Get Metadata', 400, error.message, false)
        }

    }

    /*****  FULL PROPOSAL GETTERS *******/

    /**
     * 
     * @returns { generalInfo }
     */
    async getGeneralInformation() {
        // get initiative by stage id from intitiative
        const initvStg = await this.initvStage

        let generalInfo;

        // string = this.initvStgId_;
        try {
            // general information sql query

            if (initvStg.length == 0 || initvStg == undefined) {

                generalInfo = []

            } else {

                const GIquery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                general.id AS generalInformationId,
                IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
            
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
            
            WHERE initvStgs.id = ${initvStg[0].id};
            
        `;


                generalInfo = await this.queryRunner.query(GIquery);

            }

            return generalInfo[0];
        } catch (error) {
            throw new BaseError('Get general information', 400, error.message, false)
        }

    }

    /**
     * 
     * @returns { context }
     */
    async getContext() {
        // get initiative by stage id from intitiative
        const initvStgId: string = this.initvStgId_;
        try {
            // contex sql query
            const contextQuery = `SELECT * FROM context WHERE initvStgId = ${initvStgId}`;

            const context = await this.queryRunner.query(contextQuery);

            return context[0];
        } catch (error) {
            throw new BaseError('Get context', 400, error.message, false)
        }
    }


    async getWorkPackage() {

        // const initvStgId: string = this.initvStgId_;
        const initvStg = await this.initvStage
        const wpRepo = getRepository(WorkPackages);

        try {

            let COquery = (
                `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE initvStgId = ${initvStg.id ? initvStg.id : initvStg[0].id}
                 AND active = 1
              GROUP BY id,country_id`
            ),
                REquery = (
                    `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE initvStgId = ${initvStg.id ? initvStg.id : initvStg[0].id}
                   AND active = 1
                GROUP BY id,region_id
                `
                ),
                WPquery = (
                    `
                    SELECT id, initvStgId,name, active, acronym,pathway_content,is_global,
                    IF (
                        name IS NULL
                        OR name = ''
                        OR pathway_content IS NULL
                        OR pathway_content = '',
                        true,
                        false
                    ) AS validateWP,
                    IF (
                        ( SELECT COUNT(id) FROM countries_by_initiative_by_stage WHERE wrkPkgId = wp.id ) = 0
                        AND 
                        (  SELECT COUNT(id) FROM regions_by_initiative_by_stage WHERE wrkPkgId = wp.id  ) = 0,
                        true,
                        false
                    ) AS validateGeographicScope
                   FROM work_packages wp 
                  WHERE wp.initvStgId =  ${initvStg.id ? initvStg.id : initvStg[0].id}
                    AND wp.active = 1                    
                    `
                )

            // var workPackages = await wpRepo.find({ where: { initvStg: initvStg.id ? initvStg.id : initvStg[0].id, active: 1 } });
            var workPackages = await this.queryRunner.query(WPquery);
            const regions = await this.queryRunner.query(REquery);
            const countries = await this.queryRunner.query(COquery);

            if (workPackages == undefined || workPackages.length == 0) {

                workPackages = []

            } else {

                // Map Initiatives
                workPackages.map(geo => {
                    geo['regions'] = regions.filter(wp => {
                        return (wp.wrkPkgId === geo.id)
                    })

                    geo['countries'] = countries.filter(wp => {
                        return (wp.wrkPkgId === geo.id)
                    })

                })
            }

            return workPackages

        } catch (error) {

            throw new BaseError('Get workpackage', 400, error.message, false)

        }

    }


    async getWorkPackageId(id) {

        // const initvStgId: string = this.initvStgId_;
        // const initvStg = await this.initvStage
        const wpRepo = getRepository(WorkPackages);

        try {

            let COquery = (
                `SELECT id,country_id,initvStgId,wrkPkgId
                FROM countries_by_initiative_by_stage 
               WHERE wrkPkgId = ${id}
                 AND active = 1
              GROUP BY id,country_id`
            ),
                REquery = (
                    `
                SELECT id,region_id,initvStgId,wrkPkgId
                  FROM regions_by_initiative_by_stage
                 WHERE wrkPkgId = ${id}
                   AND active = 1
                GROUP BY id,region_id
                `
                )

            var workPackages = await wpRepo.find({ where: { id: id, active: 1 } });
            const regions = await this.queryRunner.query(REquery);
            const countries = await this.queryRunner.query(COquery);

            if (workPackages == undefined || workPackages.length == 0) {

                workPackages = []

            } else {

                // Map Initiatives
                workPackages.map(geo => {
                    geo['regions'] = regions.filter(wp => {
                        return (wp.wrkPkgId === geo.id)
                    })

                    geo['countries'] = countries.filter(wp => {
                        return (wp.wrkPkgId === geo.id)
                    })

                })
            }

            return workPackages[0]

        } catch (error) {

            throw new BaseError('Get workpackage', 400, error.message, false)

        }

    }

    /*******  FULL PROPOSAL SETTERS   *********/

    /**
     * 
     * @param generalInformationId? 
     * @param name 
     * @param action_area_id 
     * @param action_area_description 
     * @returns generalInformation
     */

    async upsertGeneralInformation(generalInformationId?, name?, action_area_id?, action_area_description?) {

        const gnralInfoRepo = getRepository(GeneralInformation);

        //  create empty object 
        let generalInformation: GeneralInformation;
        try {
            // get current intiative by stage
            // const initvStg = await this.initvStage;
            const initvStg = await this.setInitvStage();

            // get clarisa action action areas
            const actionAreas = await getClaActionAreas();

            // get select action areas for initiative
            const selectedActionArea = actionAreas.find(area => area.id == action_area_id) || { name: null };

            // if null, create object
            if (generalInformationId == null) {

                generalInformation = new GeneralInformation();
                generalInformation.name = name;

                generalInformation.action_area_description = action_area_description || selectedActionArea.name;
                generalInformation.action_area_id = action_area_id;
                // assign initiative by stage
                generalInformation.initvStg = initvStg.id;

            } else {

                generalInformation = await gnralInfoRepo.findOne(generalInformationId);
                generalInformation.name = (name) ? name : generalInformation.name;
                generalInformation.action_area_description = selectedActionArea.name;
                generalInformation.action_area_id = (action_area_id) ? action_area_id : generalInformation.action_area_id;

            }
            // upserted data 
            let upsertedInfo = await gnralInfoRepo.save(generalInformation);

            //    update initiative name
            let initiative = await this.initiativeRepo.findOne(initvStg.initiativeId);
            initiative.name = upsertedInfo.name;
            initiative = await this.initiativeRepo.save(initiative);



            // retrieve general information
            const GIquery = ` 
            SELECT
            initvStgs.id AS initvStgId,
            general.id AS generalInformationId,
            IF(general.name IS NULL OR general.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.initiativeId ), general.name) AS name,
            
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
            console.log(error)
            throw new BaseError('General information : Full proposal', 400, error.message, false)
        }
    }


    /**
     * 
     * @param contextId? 
     * @param challenge_statement 
     * @param smart_objectives 
     * @param key_learnings 
     * @param priority_setting 
     * @param comparative_advantage 
     * @param participatory_design 
     * @returns context
     */
    async upsertContext(contextId?, challenge_statement?, smart_objectives?, key_learnings?, priority_setting?, comparative_advantage?, participatory_design?) {
        const contextRepo = getRepository(Context);
        //  create empty object 
        let context: Context;
        try {
            // get current intiative by stage
            const initvStg = await this.initvStage;

            // if null, create object
            if (contextId == null) {
                context = new Context();
                // assign initiative by stage
                context.initvStg = initvStg[0].id;
            } else {
                context = await contextRepo.findOne(contextId);

            }
            // console.log(contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design);


            context.challenge_statement = (challenge_statement) ? challenge_statement : context.challenge_statement;
            context.smart_objectives = (smart_objectives) ? smart_objectives : context.smart_objectives;
            context.key_learnings = (key_learnings) ? key_learnings : context.key_learnings;
            context.priority_setting = (priority_setting) ? priority_setting : context.priority_setting;
            context.comparative_advantage = (comparative_advantage) ? comparative_advantage : context.comparative_advantage;
            context.participatory_design = (participatory_design) ? participatory_design : context.participatory_design;

            // upserted data 
            const upsertedContext = await contextRepo.save(context);

            return upsertedContext;
        } catch (error) {
            console.log(error)
            throw new BaseError('Upsert context - full proposal', 400, error.message, false)
        }
    }


    async upsertWorkPackages(newWP?) {

        const wpRepo = getRepository(WorkPackages);
        // get current intiative by stage
        const initvStg = await this.initvStage;

        var upsertedInfo;

        try {

            if (newWP.id !== null) {

                var savedWP = await this.queryRunner.query(` SELECT *
                FROM work_packages 
               WHERE id = ${newWP.id}`);

                wpRepo.merge(
                    savedWP[0],
                    newWP
                );

                upsertedInfo = await wpRepo.save(savedWP[0]);

            } else {

                newWP.initvStgId = initvStg[0].id ? initvStg[0].id : initvStg.id;

                upsertedInfo = await wpRepo.save(newWP);

            }

            return upsertedInfo

        } catch (error) {

            console.log(error)
            throw new BaseError('Work Package: Full proposal', 400, error.message, false)

        }

    }

    /**
     * 
     * @param workPackageId 
     * @param acronym 
     * @param name 
     * @param pathway_content 
     * @returns workPackageInfo
     */
    async upsertWorkPackagesRepl(fullProposalWP?, conceptWP?) {

        const wpRepo = getRepository(WorkPackages);

        //  create empty object 
        var workPackage = [];
        try {
            // get current intiative by stage
            const initvStg = await this.setInitvStage();

            if (fullProposalWP.length > 0) {

                for (let index = 0; index < fullProposalWP.length; index++) {
                    const proposalWP = fullProposalWP[index];

                    for (let index = 0; index < conceptWP.length; index++) {
                        var conceptWp = conceptWP[index];
                        conceptWp.initvStg = initvStg.id;

                        if (proposalWP.acronym == conceptWp.acronym) {

                            workPackage.push(proposalWP);

                        }

                    }
                }

            } else {

                for (let index = 0; index < conceptWP.length; index++) {
                    var conceptWp = conceptWP[index];
                    conceptWp.initvStg = initvStg.id;

                    workPackage.push(conceptWp);

                }

            }

            // upserted data 
            let upsertedInfo = await wpRepo.save(workPackage);

            // retrieve general information
            const WPquery = ` 
             SELECT acronym,name,pathway_content,initvStgId
               FROM work_packages
              WHERE initvStgId = ${initvStg.id}
                AND active = 1;
            `;
            const workPackageInfo = await this.queryRunner.query(WPquery);

            return workPackageInfo[0];
        } catch (error) {
            console.log(error)
            throw new BaseError('Work Package Replication: Full proposal', 400, error.message, false)
        }

    }


    /**
     * 
     * @param projectionBenefitsId 
     * @param impact_area_id 
     * @param impact_area_name 
     * @param impact_area_indicator_id 
     * @param impact_area_indicator_name 
     * @param notes 
     * @param depth_scale_id 
     * @param probability_id 
     * @param impact_area_active 
     * @param active 
     * @param dimensions 
     * @returns { upsertedPjectionBenefits, upsertedDimensions }
     */
    async upsertProjectionBenefits(projectionBenefitsId?, impact_area_id?, impact_area_name?,
        impact_area_indicator_id?, impact_area_indicator_name?,
        notes?, depth_scale_id?, probability_id?, impact_area_active?, active?, dimensions?) {

        const projBeneRepo = getRepository(ProjectionBenefits);
        const dimensionsRepo = getRepository(Dimensions);
        const initvStg = await this.setInitvStage();
        var newWorkProjectionBenefits = new ProjectionBenefits();
        var newDimensions = new Dimensions();
        var upsertedPjectionBenefits;
        var upsertedDimensions;

        newWorkProjectionBenefits.id = projectionBenefitsId;
        newWorkProjectionBenefits.impact_area_id = impact_area_id;
        newWorkProjectionBenefits.impact_area_name = impact_area_name;
        newWorkProjectionBenefits.impact_area_indicator_id = impact_area_indicator_id;
        newWorkProjectionBenefits.impact_area_indicator_name = impact_area_indicator_name;
        newWorkProjectionBenefits.notes = notes;
        newWorkProjectionBenefits.depth_scale_id = depth_scale_id;
        newWorkProjectionBenefits.probability_id = probability_id;
        newWorkProjectionBenefits.impact_area_active = impact_area_active;
        newWorkProjectionBenefits.wrkPkg = null;
        newWorkProjectionBenefits.active = active ? active : true;

        try {

            if (newWorkProjectionBenefits.id !== null) {

                var savedProjectionBenefits = await projBeneRepo.findOne(newWorkProjectionBenefits.id);

                projBeneRepo.merge(
                    savedProjectionBenefits,
                    newWorkProjectionBenefits
                );

                upsertedPjectionBenefits = await projBeneRepo.save(savedProjectionBenefits);

            } else {

                newWorkProjectionBenefits.initvStgId = initvStg.id;

                upsertedPjectionBenefits = await projBeneRepo.save(newWorkProjectionBenefits);

            }

            if (dimensions.length > 0) {

                for (let index = 0; index < dimensions.length; index++) {
                    const dim = dimensions[index];

                    newDimensions.id = dim.id;
                    newDimensions.projectionId = upsertedPjectionBenefits.id;
                    newDimensions.depthDescriptionId = dim.depthDescriptionId;
                    newDimensions.breadth_value = dim.breadth_value;
                    newDimensions.active = dim.active ? dim.active : true;

                    if (newDimensions.id !== null) {

                        var savedDimensions = await dimensionsRepo.findOne(newDimensions.id);

                        dimensionsRepo.merge(
                            savedDimensions,
                            dim
                        );

                        upsertedDimensions = await dimensionsRepo.save(savedDimensions);

                    } else {

                        upsertedDimensions = await dimensionsRepo.save(newDimensions);
                    }

                }

            }

            return { upsertedPjectionBenefits, upsertedDimensions };

        } catch (error) {

            console.log(error)
            throw new BaseError('Upsert Projection Benefits: Full proposal', 400, error.message, false)

        }

    }


    /**
     * 
     * @returns { projectBenefits }
     */
    async requestProjectionBenefits() {

        const initvStg = await this.setInitvStage();

        try {


            // retrieve general information
            const prjBenQuery = (` 
            SELECT * 
            FROM projection_benefits
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `),
                dimensionsQuery = (
                    `
                SELECT * 
                FROM dimensions
               WHERE projectionId in (SELECT id
                FROM projection_benefits
               WHERE initvStgId = ${initvStg.id})
                 AND active = 1
                `
                )

            const projectBenefits = await this.queryRunner.query(prjBenQuery);
            const dimensions = await this.queryRunner.query(dimensionsQuery);

            projectBenefits.map(pb => {
                pb['dimensions'] = dimensions.filter(dim => {
                    return (dim.projectionId === pb.id)
                })
            }

            )

            return projectBenefits;

        } catch (error) {

            console.log(error)
            throw new BaseError('Get Projection Benefits: Full proposal', 400, error.message, false)

        }

    }


        /**
     * 
     * @returns { projectBenefits }
     */
         async requestProjectionBenefitsByImpact(impactAreaId) {

            const initvStg = await this.setInitvStage();
    
            try {
    
    
                // retrieve general information
                const prjBenQuery = (` 
                SELECT * 
                FROM projection_benefits
               WHERE initvStgId = ${initvStg.id}
                 AND impact_area_id = ${impactAreaId}
                 AND active = 1;
                `),
                    dimensionsQuery = (
                        `
                    SELECT * 
                    FROM dimensions
                   WHERE projectionId in (SELECT id
                    FROM projection_benefits
                   WHERE initvStgId = ${initvStg.id})
                     AND active = 1
                    `
                    )
    
                const projectBenefits = await this.queryRunner.query(prjBenQuery);
                const dimensions = await this.queryRunner.query(dimensionsQuery);
    
                projectBenefits.map(pb => {
                    pb['dimensions'] = dimensions.filter(dim => {
                        return (dim.projectionId === pb.id)
                    })
                }
    
                )
    
                return projectBenefits[0];
    
            } catch (error) {
    
                console.log(error)
                throw new BaseError('Get Projection Benefits: Full proposal', 400, error.message, false)
    
            }
    
        }


    /**
     * 
     * @param impact_strategies_id 
     * @param active 
     * @param challenge_priorization 
     * @param research_questions 
     * @param component_work_package 
     * @param performance_results 
     * @param human_capacity 
     * @param partners 
     * @returns { upsertedImpactStrategies,upsertedPartners }
     */
    async upsertImpactStrategies(impact_strategies_id?, active?, challenge_priorization?, research_questions?, component_work_package?,
        performance_results?, human_capacity?, partners?) {

        const impactStrategiesRepo = getRepository(ImpactStrategies);
        const partnersRepo = getRepository(Partners);
        const initvStg = await this.setInitvStage();
        var newImpactStrategies = new ImpactStrategies();
        var newPartners = new Partners();
        var upsertedImpactStrategies;
        var upsertedPartners;

        newImpactStrategies.id = impact_strategies_id;
        newImpactStrategies.active = active ? active : true;
        newImpactStrategies.challenge_priorization = challenge_priorization;
        newImpactStrategies.research_questions = research_questions;
        newImpactStrategies.component_work_package = component_work_package;
        newImpactStrategies.performance_results = performance_results;
        newImpactStrategies.human_capacity = human_capacity;

        try {

            if (newImpactStrategies.id !== null) {

                var savedImpactStrategies = await impactStrategiesRepo.findOne(newImpactStrategies.id);

                impactStrategiesRepo.merge(
                    savedImpactStrategies,
                    newImpactStrategies
                );

                upsertedImpactStrategies = await impactStrategiesRepo.save(savedImpactStrategies);

            } else {

                newImpactStrategies.initvStgId = initvStg.id;

                upsertedImpactStrategies = await impactStrategiesRepo.save(newImpactStrategies);

            }

            if (partners.length > 0) {

                for (let index = 0; index < partners.length; index++) {
                    const par = partners[index];

                    newPartners.id = par.id;
                    newPartners.impact_strategies_id = upsertedImpactStrategies.id;
                    newPartners.institutions_id = par.institutions_id;
                    newPartners.institutions_name = par.institutions_name;
                    newPartners.tag_id = par.tag_id;
                    newPartners.type_id = par.type_id;
                    newPartners.type_name = par.type_name;
                    newPartners.active = par.active ? par.active : true;

                    if (newPartners.id !== null) {

                        var savedPartners = await partnersRepo.findOne(newPartners.id);

                        partnersRepo.merge(
                            savedPartners,
                            par
                        );

                        upsertedPartners = await partnersRepo.save(savedPartners);

                    } else {

                        upsertedPartners = await partnersRepo.save(newPartners);
                    }

                }

            }

            return { upsertedImpactStrategies, upsertedPartners };

        } catch (error) {

            console.log(error)
            throw new BaseError('Upsert Impact Strategies: Full proposal', 400, error.message, false)

        }

    }



    async requestImpactStrategies() {

        const initvStg = await this.setInitvStage();

        try {


            // retrieve general information
            const impStraQuery = (` 
            SELECT *
            FROM impact_strategies
           WHERE initvStgId = ${initvStg.id}
             AND active = 1;
            `),
                partnersQuery = (
                    `
                SELECT * 
                FROM dimensions
               WHERE projectionId in (SELECT id
                FROM projection_benefits
               WHERE initvStgId = ${initvStg.id})
                 AND active = 1
                `
                )

            const impactStrategies = await this.queryRunner.query(impStraQuery);
            const partners = await this.queryRunner.query(partnersQuery);

            impactStrategies.map(imp => {
                imp['partners'] = partners.filter(par => {
                    return (par.impact_strategies_id === imp.id)
                })
            }

            )

            return { impactStrategies };

        } catch (error) {

            console.log(error)
            throw new BaseError('Get Impact Strategies: Full proposal', 400, error.message, false)

        }

    }



}