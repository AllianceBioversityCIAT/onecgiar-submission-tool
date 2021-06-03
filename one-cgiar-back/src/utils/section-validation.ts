import { getConnection } from "typeorm";
import _ from "lodash";

export const validateConceptSection = async (initvStgId) => {

    const queryRunner = getConnection().createQueryRunner();
    let validatedSection = {
        general_information: false,
        narratives: false,
        initial_theory_of_change: false,
        work_packages: false,
        key_partners: false
    }

    // validate general information
    const gi_conceptInfo = await queryRunner.query(`SELECT name, action_area_id FROM concept_info WHERE initvStgId = ${initvStgId}`);
    const gi_lead = await queryRunner.query(`SELECT userId FROM initiatives_by_users WHERE initiativeId = (SELECT initiativeId FROM initiatives_by_stages WHERE id = ${initvStgId}) AND roleId = (SELECT id FROM roles WHERE acronym = 'SGD')`);
    const gi_colead = await queryRunner.query(`SELECT userId FROM initiatives_by_users WHERE initiativeId = (SELECT initiativeId FROM initiatives_by_stages WHERE id = ${initvStgId}) AND roleId = (SELECT id FROM roles WHERE acronym = 'PI')`);

    validatedSection.general_information = (gi_conceptInfo.length && gi_conceptInfo.every(item => item.name && item.action_area_id)) && (gi_lead.length && gi_lead.every(item => item.userId)) && (gi_colead.length && gi_colead.every(item => item.userId));

    // validate narratives
    const narr_conceptInfo = await queryRunner.query(`SELECT challenge, objectives, results, highlights FROM concept_info WHERE initvStgId = ${initvStgId}`);
    validatedSection.narratives = narr_conceptInfo.length && narr_conceptInfo.every(item => item.challenge && item.objectives && item.results && item.highlights);


    // validate initial theory of change
    const toc_tocs = await queryRunner.query(`SELECT id FROM tocs WHERE initvStgId = ${initvStgId}`);
    const toc_files = await queryRunner.query(`SELECT id FROM files WHERE tocsId =(SELECT id FROM tocs WHERE initvStgId = ${initvStgId})`);


    validatedSection.initial_theory_of_change = (toc_tocs.length && toc_tocs.every(item => item.id)) && (toc_files.length && toc_files.every(item => item.id));


    // validate work packages
    const wp_workPackages = await queryRunner.query(`SELECT name, results, pathway_content, acronym FROM work_packages WHERE initvStgId = ${initvStgId}`);
    const wp_regions = await queryRunner.query(`SELECT region_id FROM regions_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${initvStgId} LIMIT 1)`);
    const wp_countries = await queryRunner.query(`SELECT country_id FROM countries_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${initvStgId} LIMIT 1)`);

    validatedSection.work_packages = wp_workPackages.length
        && wp_workPackages.every(item => item.name)
        && wp_workPackages.every(item => item.results)
        && wp_workPackages.every(item => item.pathway_content)
        && wp_workPackages.every(item => item.acronym)
        && (wp_regions && wp_regions.every(item => item.region_id)) 
        && (wp_countries && wp_countries.every(item => item.country_id));


    // validate key partners
    const kp_keyPartners = await queryRunner.query(`SELECT key_partner_id, key_partner_name, description FROM key_partners WHERE partnershipsId =(SELECT id FROM partnerships WHERE initvStgId = ${initvStgId})`);
    validatedSection.key_partners = kp_keyPartners.length && (kp_keyPartners.every(item => item.key_partner_name) && kp_keyPartners.every(item => item.key_partner_id) && kp_keyPartners.every(item => item.description));

    return validatedSection;

}