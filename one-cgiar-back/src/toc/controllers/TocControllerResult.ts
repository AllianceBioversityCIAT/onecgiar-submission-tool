import axios from 'axios';
import {Request, Response} from 'express';
import {TocServicesResults} from '../services/TocServicesResult'
const tocHost = 'https://toc.loc.codeobia.com/api/toc/75ebe59f-457b-4574-a772-b3db2b27f9df/dashboard-result';

/**
 *GET TOC Result Dashboard
 * @returns toc Result Dashboard
 */

export async function getTocResultDashboard(req: Request,res: Response) {
    try {
      let servicesInformation = new TocServicesResults();
        const narrative = {
          "sdg_results": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          
          "sdg_contribution": "",
          "sdg_targets": [
          {
          "sdg_target_id": 112,
          "active": true
          }
          ],
          "sdg_indicators": []
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "sdg_id": 1,
          "sdg_contribution": "",
          "sdg_targets": [
          {
          "sdg_target_id": 1,
          "active": true
          },
          {
          "sdg_target_id": 5,
          "active": true
          }
          ],
          "sdg_indicators": []
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "sdg_id": 1,
          "sdg_contribution": "",
          "sdg_targets": [
          {
          "sdg_target_id": 43,
          "active": true
          }
          ],
          "sdg_indicators": []
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "sdg_id": 1,
          "sdg_contribution": "",
          "sdg_targets": [
          {
          "sdg_target_id": 8,
          "active": true
          },
          {
          "sdg_target_id": 11,
          "active": true
          },
          {
          "sdg_target_id": 9,
          "active": true
          },
          {
          "sdg_target_id": 10,
          "active": true
          }
          ],
          "sdg_indicators": []
          }
          ],
          "impact_area_results": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "impact_area_id": 1,
          "outcome_statement": "Vitamin A deficiency is a major disease affecting 48% of children aged 6–59 months in SSA (Stevens et al., 2015). We project that the nutrition, health and food security status of about 23.1 million people (i.e., 4.7 million households) in 16 SSA countries will improve significantly through the adoption of yellow cassava varieties with high β-carotene (precursor of Vitamin A) content and high dry matter, and orange-flesh sweet potatoes (OFSP) with high β-carotene and improved productivity (details in Annex). Benefits for adopting households arise through increased production, consumption, and sale of crops with higher nutritional value. The number of beneficiaries is projected using crop/country specific adoption profiles based on past evidence and expert estimates, secondary data on national crop production area (narrowed down to target domains), average household size, and crop area per HH. We did not include benefits arising for consumers when biofortified crops are sold. The combined total number of beneficiaries accounts for an estimated 80% overlap (HHs growing both cassava and sweet potatoes) in 8 countries included in both projections. Projected impact is in the lower bound of high certainty, since dissemination and adoption of the varieties may challenge available seed systems and face market constraints in some countries.",
          "global_targets": [
          {
          "global_target_id": 1,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 1,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "impact_area_id": 4,
          "outcome_statement": "The projection of beneficiaries from climate-adapted innovations is derived from the number of farmers in Sub-Saharan Africa adopting maize varieties tolerant to abiotic stress (details in Annex). Droughts have become an almost regular occurrence in SSA, severely reducing yields of many crops (Ray et al., 2015). Maize is an important staple crop in the region and the new drought and heat resistant varieties (Cairns and Prasanna, 2018; Prasanna et al., 2021) achieve 20% higher yields under drought conditions (Setimela et al., 2017). This effect is on the upper end of the “significant” depth criteria in terms of % permanent increase in income. We assume an s-shaped logistic adoption function and use country-level rates of current adoption of improved varieties as adoption ceilings (Krishna et al., 2021), in some cased adjusted upward thanks to significant recent donor investment in the seed sector in target countries. With first adoption by farmers expected in 2022 and an estimated 10-year period to maximum adoption, we project that by 2030 about 14.7 million HH across the target domain will be adopting these improved varieties. This translates to at least 69.9 million persons benefiting from this climate-adapted innovation over the next 9 years.",
          "global_targets": [
          {
          "global_target_id": 8,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 14,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "impact_area_id": 4,
          "outcome_statement": "The projection of beneficiaries from climate-adapted innovations is derived from the number of farmers in Sub-Saharan Africa adopting maize varieties tolerant to abiotic stress (details in Annex). Droughts have become an almost regular occurrence in SSA, severely reducing yields of many crops (Ray et al., 2015). Maize is an important staple crop in the region and the new drought and heat resistant varieties (Cairns and Prasanna, 2018; Prasanna et al., 2021) achieve 20% higher yields under drought conditions (Setimela et al., 2017). This effect is on the upper end of the “significant” depth criteria in terms of % permanent increase in income. We assume an s-shaped logistic adoption function and use country-level rates of current adoption of improved varieties as adoption ceilings (Krishna et al., 2021), in some cased adjusted upward thanks to significant recent donor investment in the seed sector in target countries. With first adoption by farmers expected in 2022 and an estimated 10-year period to maximum adoption, we project that by 2030 about 14.7 million HH across the target domain will be adopting these improved varieties. This translates to at least 69.9 million persons benefiting from this climate-adapted innovation over the next 9 years.",
          "global_targets": [
          {
          "global_target_id": 9,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 14,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "impact_area_id": 5,
          "outcome_statement": "CGIAR Centers have an obligation to conserve and make available crop collections under their management, according to the provisions of the Plant Treaty. Making accessions available for international distribution requires germplasm to have acceptable viability, be free of quarantinable diseases, with adequate stock, and legally available. In 2020, CGIAR genebanks were managing a total collection of 592,257 crop and forage accessions (with 79% available for international distribution). By 2030, CGIAR genebanks will achieve (and maintain) 90% availability (i.e., an additional 70,000 accessions becoming available – see details in Annex). The genebanks will process backlogs (e.g., health testing and cleaning, seed regeneration, verifying trueness-to-type, etc.) to reach this performance target. Achieving and maintaining 90% availability enables genebanks to operate at a steady, efficient state, making them eligible for endowment funding, as well as ensuring users have access to germplasm. The effects of the pandemic and examples such as ICARDA’s evacuation from Syria illustrate the importance of sustaining performance targets (Westengen et al. 2020).",
          "global_targets": [
          {
          "global_target_id": 10,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 19,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "impact_area_id": 3,
          "outcome_statement": "While approximately half of all beneficiaries of improved varieties are women, the GI initiatives focus on crops/traits explicitly aiming at improving women’s livelihoods. Two examples are bean varieties with increased yield and reduced cooking time (Katungi et al., 2018; Letaa et al., 2020) and orange-flesh sweet potatoes (Mudege et al., 2017). Women are benefiting from these varieties through different impact pathways: i) increase of income if grown as “women’s cash crops”; ii) fast cooking (targeted 30% reduction) benefits women by freeing time, since collection of firewood and meal preparation are mostly conducted by women; and iii) health benefits for women and youth consumers. For our benefit projection, we focus on i) and ii) and follow the general steps outlined for indicators above, and then compute the share of women producers among all adopters (details in Annex). For the ‘time saving’ benefit, we assume one woman/girl benefits per adopting HH. Since most HH in SSA cultivate several crops, we use an 80% overlap for countries included in both crop projections. We project that at least 2.5 million women producers and 3.4 million women/girls in adoption HH will benefit significantly and with high certainty from these two crops in the included 17 countries alone.",
          "global_targets": [
          {
          "global_target_id": 5,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 8,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "impact_area_id": 2,
          "outcome_statement": "By enabling poor smallholder households to achieve higher yields and hence ‘living income’, adoption of improved varieties of rice, wheat and maize is expected to significantly benefit 42.6 million poor people (9 million poor HH) by 2030 (details in Annex). While the GI initiatives have identified 12 priority crops for breeding, only three innovations (higher yielding rice in South and Southeast Asia (Kumar et al., 2021); high yielding wheat in South Asia Juliana et al., 2020; Crespo-Herrera et al., 2017); and stress-tolerant maize in Sub-Saharan Africa (Cairns and Prasanna, 2018; Prasanna et al., 2021)) are included in the projection. These varieties are at an advanced stage, almost ready to be released and benefits are expected to materialize soon and with high certainty. The number of poor people benefiting is estimated by multiplying the projected number of adopters by 2030 in each country with the poverty headcount ratio at national poverty lines (World Development Indicators, most recent year available). To avoid double-counting in the projected total number of beneficiaries, we accounted for the overlap, especially in the Indo-Gangetic Plain, where HHs frequently grow both rice and wheat (Bhatt et al., 2016), by reducing numbers accordingly (based on Ladha et al., 2003; Timsina and Connor 2001).",
          "global_targets": [
          {
          "global_target_id": 3,
          "active": true
          }
          ],
          "impact_indicators": [
          {
          "impact_indicator_id": 5,
          "active": true
          }
          ],
          "sdgs": [
          [
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          }
          ]
          ]
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "impact_area_id": 3,
          "outcome_statement": "",
          "global_targets": [
          {
          "global_target_id": 6,
          "active": true
          }
          ],
          "impact_indicators": [],
          "sdgs": [
          [
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          }
          ]
          ]
          }
          ],
          "action_area_results": [
          {
          "toc_result_id": "9c89961f-7343-444b-8974-eb3cb88b2541",
          "action_area_id": 3,
          "outcome_id": 7,
          "statement": "Women and youth are empowered to be more active in decision making in food, land and water systems",
          "outcome_indicators": [
          {
          "outcome_indicator_id": 32,
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ]
          },
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "action_area_id": 3,
          "outcome_id": 12,
          "statement": "CGIAR and partners use high-quality market intelligence to guide the development of new varieties to meet the needs and expectations of a wide-range of users, with special attention to marginalized groups",
          "outcome_indicators": [
          {
          "outcome_indicator_id": 21,
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ]
          },
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "action_area_id": 3,
          "outcome_id": 15,
          "statement": "Cooperation and co-investment by CGIAR, public- and private-sector seed-system actors supports coordinated and effective research and investment in the sector",
          "outcome_indicators": [
          {
          "outcome_indicator_id": 26,
          "active": true
          },
          {
          "outcome_indicator_id": 27,
          "active": true
          }
          ],
          "impact_areas": []
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "action_area_id": 3,
          "outcome_id": 13,
          "statement": "CGIAR and partner breeding programs use best practices and shared services to rapidly and efficiently produce new varieties with in-demand traits",
          "outcome_indicators": [
          {
          "outcome_indicator_id": 23,
          "active": true
          },
          {
          "outcome_indicator_id": 25,
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ]
          }
          ],
          "output_outcome_results": [
          {
          "toc_result_id": "9c320ea4-f407-46eb-85fd-65a5207efeeb",
          "result_type": 1,
          "wp_id": 334,
          "result_title": " RACI for breeding teams",
          "result_description": "RACI for breeding teams",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "ff9a592c-ddea-4ed9-9d1c-14e5e32d138e",
          "type": {
          "value": "custom",
          "name": "RACI framework drafted (Y1), validated (Y2) and implemented (Y3)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "26f70fd1-c045-4faa-b370-006dae053d79",
          "result_type": 1,
          "wp_id": 335,
          "result_title": "Partner assessments",
          "result_description": "Partner assessments",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "unit_of_measurement": "NARES members",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "60ee686e-52a7-428b-93ce-e910012729b4",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Capacity development plans established"
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "12",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "ce7639b9-a2f7-460a-9f03-08e7a01968fd",
          "result_type": 1,
          "wp_id": 336,
          "result_title": "Lean, outcome-oriented and informative KPI system",
          "result_description": "Lean, outcome-oriented and informative KPI system",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "f34c3644-d3bc-4109-8cf8-8505b0935e10",
          "type": {
          "value": "custom",
          "name": "KPIs for TD&D developed (Y1), validated (Y2), reported (Y3)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "fb6beefd-dc8d-4887-ade8-28f72569102d",
          "result_type": 1,
          "wp_id": 335,
          "result_title": "Improvement plans; needs-based training; technical support; access to resources",
          "result_description": "Improvement plans; needs-based training; technical support; access to resources",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "unit_of_measurement": "NARES members",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "acf40016-200d-4899-838d-8f5a541ca3fe",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Capacity development plans established"
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "12",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "unit_of_measurement": "NARES members",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "290e854d-8672-4f9f-8e20-b565f1179f43",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Partners strength established: In-depth"
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "6",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "unit_of_measurement": "NARES members",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "c47c41b1-fb52-45e2-a9fb-280e160cebbb",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Improvement plans established."
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "6",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "5891fb36-b94a-4186-9b35-cad9f1bd7ea3",
          "result_type": 1,
          "wp_id": 335,
          "result_title": "Transparent, inclusive processes for co-creation and decision-making",
          "result_description": "Transparent, inclusive processes for co-creation and decision-making",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Breeding networks",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "376a4df7-df32-44c1-94a0-fcc3dfe59dea",
          "type": {
          "value": "custom",
          "name": "Baseline and augmented roles of each NARES, SME & ARI in crop networks defined"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "50",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "country": [],
          "unit_of_measurement": "% Breeding networks",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "2eb3e427-f1aa-42c2-a1d7-044ebc5ef564",
          "type": {
          "value": "custom",
          "name": "Approaches for NARES and SMEs participation in key decision-making documented and agreed"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "197bf861-4607-4f9b-8806-c55de7f8f2da",
          "result_type": 1,
          "wp_id": 337,
          "result_title": "Optimized variety extraction and farmer- and market-relevant variety identification",
          "result_description": "Optimized variety extraction and farmer- and market-relevant variety identification",
          "outcome_type": "Other",
          "indicators": [
          {
          "unit_of_measurement": "% decrease",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "c05e2f19-bb58-4efa-871f-d4652c2f2f03",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Cost per plot maintaining or increasing heritability."
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "10",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "4d1be1b9-8915-4ba3-9c80-ca181ea28c8a",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "AlphaSim applied to optimize variety extraction."
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "50",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "552c83bd-d64e-4f65-b4b8-3ddb63a18af9",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Testing strategy capturing product profile characteristics, the TPE and farmers’ conditions, passing peer review."
          },
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "2da38864-df9a-4aae-80f3-f36235ff9078",
          "result_type": 1,
          "wp_id": 333,
          "result_title": " Product profile aligned selection index",
          "result_description": "Product profile aligned selection index",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "0475166c-55e6-4075-93b8-0a86a2ff21ac",
          "type": {
          "value": "custom",
          "name": "Trait emphasis during selection, based on trait importance and impact, defined, documented and deployed"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "75",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "a1afecc7-090e-41c6-8c0d-0cb7e10cd49b",
          "result_type": 1,
          "wp_id": 334,
          "result_title": " Stage gates and handover criteria",
          "result_description": "Stage gates and handover criteria",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "8892f3e9-55ea-4037-b6f3-9d13025015a0",
          "type": {
          "value": "custom",
          "name": "Common stage gates (Y1) and commodity/pipeline-specific stage gates defined (Y2)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "5b55b34a-bdf0-4729-9b3f-ecc8503691f0",
          "result_type": 1,
          "wp_id": 337,
          "result_title": "Genomics-supported RSS schemes, optimized breeding pipelines and pipeline structure",
          "result_description": "Genomics-supported RSS schemes, optimized breeding pipelines and pipeline structure",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "0a66e846-874b-40ad-8347-2eb39d5f4d37",
          "type": {
          "value": "custom",
          "name": "GxE analysis of past testing data completed, minimum 3 years. Germplasm sharing strategy documented"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "70",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "country": [],
          "unit_of_measurement": "% Pipelines",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "64686d87-6f8e-44a9-a796-f464c097e43b",
          "type": {
          "value": "custom",
          "name": "Genome-assisted RCRS developed and implemented"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "70",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "country": [],
          "unit_of_measurement": "% reduction of cycle time",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "9e8007c8-455a-47d7-adce-b7f192cad3bc",
          "type": {
          "value": "custom",
          "name": "Pipeline cycle time"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "-30 (reduce by 30%)",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "85046047-ec09-49ff-8a99-5c62940826e7",
          "result_type": 1,
          "wp_id": 333,
          "result_title": "Portfolio of pipeline investment cases",
          "result_description": "Portfolio of pipeline investment cases",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% pipelines in portfolio",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "ab448642-15e8-4433-947e-96d35df75ce4",
          "type": {
          "value": "custom",
          "name": "Portfolio of pipeline investment cases"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "b489a472-9cac-4e06-8a9e-598d6611c7c8",
          "result_type": 1,
          "wp_id": 335,
          "result_title": "Metrics to assess network and partnership quality and output",
          "result_description": "Metrics to assess network and partnership quality and output",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "f705cc1a-ee38-4a4a-ac54-ad21340a01cd",
          "type": {
          "value": "custom",
          "name": "Metrics to assess crop breeding networks for partnership quality and germplasm output drafted (Y1), agreed (Y2), applied (Y3)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2022-04-19T00:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "bccf8e47-af78-4784-b965-611b0d157850",
          "result_type": 1,
          "wp_id": 333,
          "result_title": " Portfolio of distinct, achievable product profiles",
          "result_description": "Portfolio of distinct, achievable product profiles",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "060dc347-16d1-452e-ad46-77916f022662",
          "type": {
          "value": "custom",
          "name": "Feasibility of (current) product profiles revised and completed in a crop"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "89d1f40c-8733-41c8-a868-b25d5c131700",
          "result_type": 1,
          "wp_id": 337,
          "result_title": "CGIAR and NARES candidate varieties and trait donors meeting target product profiles",
          "result_description": "CGIAR and NARES candidate varieties and trait donors meeting target product profiles",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Number",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "e83b4404-f4f6-464c-83e9-d4f6a52ea101",
          "type": {
          "value": "custom",
          "name": "Mean number per pipeline (across portfolio) of candidate varieties that meet the target product profile requirements"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "3",
          "date": "2022-04-19T00:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "9c89961f-7343-444b-8974-eb3cb88b2541",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "cf93a58f-4d2a-4665-adf2-d2b855a24821",
          "result_type": 1,
          "wp_id": 334,
          "result_title": " Common KPI system",
          "result_description": "Common KPI system",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "3c2f8091-ed9b-4915-899c-52aa5921527a",
          "type": {
          "value": "custom",
          "name": "Breeding performance-oriented KPIs for developed (Y1), validated (Y2), reported (Y3)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "eb72ce3c-1432-4f63-9356-2aa297886a6c",
          "result_type": 1,
          "wp_id": 334,
          "result_title": " High level organizational structure: trait discovery, trait deployment, population improvement, variety identification",
          "result_description": "High level organizational structure: trait discovery, trait deployment, population improvement, variety identification",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "cd364eec-74b4-43f9-9332-a35824b9ad54",
          "type": {
          "value": "custom",
          "name": "High level organizational structure defined (Y1)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "9964ad3e-0831-4443-a0b2-e77b408b976b",
          "result_type": 1,
          "wp_id": 337,
          "result_title": "On-farm testing approaches",
          "result_description": "On-farm testing approaches",
          "outcome_type": "Innovation",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Breeding networks",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "842ddb5c-720e-492c-bbd9-642361c22e5e",
          "type": {
          "value": "custom",
          "name": "On-farm testing approaches executed (> 30 sites)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "30",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "eb3caed8-7e02-400d-adff-ffad32016239",
          "result_type": 1,
          "wp_id": 337,
          "result_title": "Genetic gain improvement plans",
          "result_description": "Genetic gain improvement plans",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "e49c62cd-85cd-4a66-ad7d-2be81ae6ec18",
          "type": {
          "value": "custom",
          "name": "Improvement plans reviewed, annually"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "d61e69cf-d6c8-44e3-b680-49e74fe2ca62",
          "result_type": 1,
          "wp_id": 335,
          "result_title": "Network membership prioritization, agreements, open access support for germplasm and knowledge",
          "result_description": "Network membership prioritization, agreements, open access support for germplasm and knowledge",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report, signed agreements",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "55d299e1-1f3f-4eeb-bd40-25fe60fd62f4",
          "type": {
          "value": "custom",
          "name": "Network agreement drafted (Y1) and agreed (Y2)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "5f8c788e-18f4-4a67-b53a-e571a22d3983",
          "type": {
          "value": "custom",
          "name": "Prioritization criteria for membership defined (Y1) and implemented (Y2)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          },
          {
          "country": [],
          "unit_of_measurement": "% Achievement",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "WP report",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "6d10ad6e-dd85-4122-8c6a-bbc84cf04715",
          "type": {
          "value": "custom",
          "name": "Mechanism for open access support drafted (Y1) and agreed (Y2)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "100",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "9bbabde6-8ff3-432d-8839-930cd6166786",
          "result_type": 1,
          "wp_id": 336,
          "result_title": "Elite donor lines carrying highly valuable, in-demand traits",
          "result_description": "Elite donor lines carrying highly valuable, in-demand traits",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% pipelines",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "1bff25f7-51b2-42ba-8bcf-b9486dcdf7c3",
          "type": {
          "value": "custom",
          "name": "Use of donors in population improvement pipeline(s)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "70",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "51f94424-3c62-4c5c-a640-cc6969bd2601",
          "result_type": 1,
          "wp_id": 336,
          "result_title": "Anticipated ROI and likelihood of success of TD&D projects",
          "result_description": "Anticipated ROI and likelihood of success of TD&D projects",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "db3b45db-e63e-4da0-aca2-7c62d5bb87a5",
          "type": {
          "value": "custom",
          "name": "TD&D projects reviewed and aligned with ROI"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "70",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "e68eccac-e236-4663-af39-1478c8ff6fd1",
          "result_type": 1,
          "wp_id": 333,
          "result_title": " Strategic breeding segment targeting",
          "result_description": "Strategic breeding segment targeting",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% Crops",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "9cba1123-533f-443d-9732-763139861679",
          "type": {
          "value": "custom",
          "name": "Strategic approach for advancing each trait on each product profile with population improvement, TD&D or both"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "80",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "ac688990-87f6-4570-8764-fdd98a2ab5ba",
          "result_type": 1,
          "wp_id": 336,
          "result_title": "Best practice approaches for highest priority TD&D scenarios",
          "result_description": "Best practice approaches for highest priority TD&D scenarios",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "% High-ROI TD&D projects",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "5ad18494-674e-48fb-b4db-dadffbb7e23b",
          "type": {
          "value": "custom",
          "name": "TD&D projects reviewed and aligned with best practice approaches"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "On-line MEL tool",
          "target": {
          "value": "70",
          "date": "2024-12-31T08:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "17d25874-460e-44c9-b531-d5e376981578",
          "result_type": 2,
          "wp_id": 336,
          "result_title": "CGIAR TD&D pipelines have mainstreamed best practices for development of prioritized donor germplasm",
          "result_description": "CGIAR TD&D pipelines have mainstreamed best practices for development of prioritized donor germplasm",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "0",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "93c52831-24bf-4a7a-b75a-8cfc7dcb37a4",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted TD&D pipelines demonstrating best practice implementation"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "70%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "468ce73c-f0c8-4dc5-b26e-149030cf2084",
          "result_type": 2,
          "wp_id": 334,
          "result_title": "Increased gender diversity in CGIAR breeding teams; specialized teams attract young talent, women scientists, and partnerships",
          "result_description": "Increased gender diversity in CGIAR breeding teams; specialized teams attract young talent, women scientists, and partnerships",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "CGIAR reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "2d743c42-94a3-4aa8-8792-c6da7a66e0a4",
          "type": {
          "value": "custom",
          "name": "Proportion of professional roles within targeted breeding teams occupied by women"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Staff lists",
          "target": {
          "value": "+10%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "cadf23dd-f975-4085-96a5-1c7972916bf5",
          "result_type": 2,
          "wp_id": 333,
          "result_title": " Enhanced alignment of CGIAR-NARES breeding investment with the five Impact Areas",
          "result_description": "Enhanced alignment of CGIAR-NARES breeding investment with the five Impact Areas",
          "outcome_type": "Policy",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Costing studies",
          "baseline": {
          "value": "0",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "e481e223-287d-40fb-8176-1bc327a98452",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted programs having fully costed investment in breeding results aligned with each of the five Impact Areas"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "ABI",
          "target": {
          "value": "75%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "afc26854-e821-4abd-be94-3a67a54ea72f",
          "result_type": 2,
          "wp_id": 337,
          "result_title": "CGIAR-NARES-SME population improvement pipelines increase predicted rates of genetic gain in farmer-preferred germplasm",
          "result_description": "CGIAR-NARES-SME population improvement pipelines increase predicted rates of genetic gain in farmer-preferred germplasm",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "9cbff325-340f-4bba-b322-bdf1e73d5ffe",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted programs increasing predicted rates of genetic gain to >1% or doubling baseline (whichever achieved first)"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "70%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "2cb8feae-b53b-4c00-8c0b-b27ba51a179d",
          "result_type": 2,
          "wp_id": 334,
          "result_title": "Improved operational clarity, effectiveness, and communication in breeding networks",
          "result_description": "Improved operational clarity, effectiveness, and communication in breeding networks",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crop Reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "4955f851-dadc-4d9c-ac6f-a144da8ea25c",
          "data_collection_frequency": "Annual",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding networks implementing new organizational frameworks and enabling tools."
          },
          "data_collection_method": "Criteria-based assessments",
          "target": {
          "value": "80%",
          "date": "2024-01-01T00:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "8f069765-986c-4e6c-98d3-f0ae5e5309b2",
          "result_type": 2,
          "wp_id": 335,
          "result_title": "Strengthened/increased NARES and SMEs capacity to participate in breeding networks and develop varieties",
          "result_description": "Strengthened/increased NARES and SMEs capacity to participate in breeding networks and develop varieties",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "204f9fb9-a695-473f-9ab9-8f3e03600487",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted NARES/SMEs increasing in capacity ratings"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "+80%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "ae944a30-021e-46b8-b4f9-6066bfbfccbf",
          "result_type": 2,
          "wp_id": 336,
          "result_title": " Stronger prioritization applied to targeted CGIAR TD&D projects",
          "result_description": "Stronger prioritization applied to targeted CGIAR TD&D projects",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "68195b0b-d2c8-4ae8-9fe2-017f06459e26",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted programs with lists of resourced prioritized TD&D projects and lists of projects canceled or shelved"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "80%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "157bb9e0-c4c6-4266-8954-eda8048cd90d",
          "result_type": 2,
          "wp_id": 335,
          "result_title": "NARES & SMEs have increased responsibility and participation in processes and decision-making",
          "result_description": "NARES & SMEs have increased responsibility and participation in processes and decision-making",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "f4762700-7f7f-44c3-b411-98f7e5512cc0",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding Networks demonstrating and documenting clear co-attribution of variety development to multiple stakeholders"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "80%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "141d933a-f70b-4883-ba5c-29b15632c98d",
          "result_type": 2,
          "wp_id": 337,
          "result_title": "Increased testing of CGIAR-NARS-SME breeding products in farmer-relevant, product profile representative conditions",
          "result_description": "Increased testing of CGIAR-NARS-SME breeding products in farmer-relevant, product profile representative conditions",
          "outcome_type": "Uptake of information product",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "387aab65-b26d-45f3-ab9a-915e0c01ed7d",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted pipelines able to capture target product profile traits under farmer-relevant conditions"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "75%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "d5440923-dfc2-40da-86dc-6f7324ae7f64",
          "result_type": 2,
          "wp_id": 333,
          "result_title": " CGIAR-NARES breeding focused on farmers' needs and drivers of impact",
          "result_description": "CGIAR-NARES breeding focused on farmers' needs and drivers of impact",
          "outcome_type": "Uptake of information product",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops reports",
          "baseline": {
          "value": "0",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "f123d15c-0513-4d11-8e06-30bffc595df5",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding pipelines clearly mapping to product profiles, TPEs and market segments"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessment",
          "target": {
          "value": "75%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "4deae3e6-655f-4014-b3b3-5b3c6ad20002",
          "result_type": 2,
          "wp_id": 337,
          "result_title": "Increased demand for and access to CGIAR-NARES germplasm by seed system partners",
          "result_description": "Increased demand for and access to CGIAR-NARES germplasm by seed system partners",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "SeEdQUAL",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "dc8a46fa-67ef-4e1a-b59d-c430f302ba38",
          "type": {
          "value": "custom",
          "name": "Increase in number of lines and varieties demanded by seed system partners"
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Survey",
          "target": {
          "value": "+20%",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "9c89961f-7343-444b-8974-eb3cb88b2541",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "608c8a29-7480-4270-8be4-af6f055ee3ae",
          "result_type": 3,
          "wp_id": null,
          "result_title": " Breeding networks implement stronger partnership models where NARES and SMEs have increased contribution to the breeding process",
          "result_description": "Breeding networks implement stronger partnership models where NARES and SMEs have increased contribution to the breeding process",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "6b5ee26e-5bf7-4b77-9cf5-6913ec4fa187",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding networks that are have implemented documented steps toward stronger partnership models where NARES and SMEs have increased breeding capacity, and make greater scientific, operational and decision-making contribution to the breeding process."
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessments",
          "target": {
          "value": "80% breeding networks",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "5c4cf77d-7209-47ee-a943-5619832f5c5a",
          "result_type": 3,
          "wp_id": null,
          "result_title": "Breeding pipelines have increased the rate of genetic gain, providing seed systems actors with farmer-preferred candidate varieties with step change in performance under farmers’ conditions",
          "result_description": "Breeding pipelines have increased the rate of genetic gain, providing seed systems actors with farmer-preferred candidate varieties with step change in performance under farmers’ conditions",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports, SeedEqual",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "3feacd06-c80f-4cde-b563-8c6034ed93d2",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding pipelines that  have increased the rate of genetic gain in the form of farmer-preferred varieties. With at least 50% providing candidate varieties with step change in performance under farmers’ conditions, to seed systems actors or the variety release system."
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Survey",
          "target": {
          "value": "At least 70% of breeding pipelines",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "9c89961f-7343-444b-8974-eb3cb88b2541",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "80b6ec6b-dbd1-412f-8c40-cbf825fdac0c",
          "result_type": 3,
          "wp_id": null,
          "result_title": "Breeding pipelines use a revised organizational framework providing teams with operational clarity and effectiveness for pursuing breeding outputs",
          "result_description": "Breeding pipelines use a revised organizational framework providing teams with operational clarity and effectiveness for pursuing breeding outputs",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports, CGIAR Reports",
          "baseline": {
          "value": "",
          "date": "2022-01-01T00:00:00.000Z"
          },
          "id": "91408e8a-bae7-45d2-8c56-1557e9d7a6e8",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding pipelines that will use a revised organizational framework that provides operational clarity and effectiveness for specialized teams pursuing breeding outputs."
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessments, Staff lists",
          "target": {
          "value": "70% breeding pipelines",
          "date": "2024-12-31T08:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "7f8120a5-1ac4-4f87-9b08-c18f8671cbaa",
          "active": true
          }
          ],
          "impact_areas": [],
          "sdgs": [],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "e5ccc697-fdff-4ce4-a0c4-038765b226bd",
          "result_type": 3,
          "wp_id": null,
          "result_title": "Breeding pipelines are supported by TD&D programs that deliver high-impact traits within elite parental lines",
          "result_description": "Breeding pipelines are supported by TD&D programs that deliver high-impact traits within elite parental lines",
          "outcome_type": "Other",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "Percent",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "73020ccd-f482-4801-959e-9c0ea96c7dd0",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding pipelines that are supported by a dedicated discovery and trait deployment (TD&D) program that will deliver high-impact traits in the form of elite parental lines."
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessments",
          "target": {
          "value": "50% of breeding pipelines",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          },
          {
          "toc_result_id": "552b01e2-d9b9-4c29-8cbd-98346d940167",
          "result_type": 3,
          "wp_id": null,
          "result_title": "CGIAR-NARES Breeding pipelines oriented towards specific market segments, enabling greater focus on farmers’ needs, drivers of adoption, and impact",
          "result_description": " CGIAR-NARES Breeding pipelines oriented towards specific market segments, enabling greater focus on farmers’ needs, drivers of adoption, and impact",
          "outcome_type": "Capacity",
          "indicators": [
          {
          "country": [],
          "unit_of_measurement": "%",
          "description": "N/A",
          "location": "global",
          "data_collection_source": "Crops Reports, Costing studies",
          "baseline": {
          "value": "",
          "date": "2022-04-19T00:00:00.000Z"
          },
          "id": "1e7c0a2e-fcd4-4f71-a259-f582eaa59816",
          "type": {
          "value": "custom",
          "name": "Proportion of targeted breeding pipelines that are be oriented towards specific market segments, enabling greater focus on farmers’ needs, drivers of adoption, and, distinct Impact Areas, and the strategic allocation of resources for maximum impact."
          },
          "data_collection_frequency": "Annual",
          "region": [],
          "data_collection_method": "Criteria-based assessments",
          "target": {
          "value": "75% of breeding pipelines",
          "date": "2024-12-30T16:00:00.000Z"
          }
          }
          ],
          "action_areas": [
          {
          "toc_result_id": "fc705043-49f8-45e5-b76a-aeb72aca262f",
          "active": true
          },
          {
          "toc_result_id": "235dcada-a9da-413f-a9e0-614d740fa34b",
          "active": true
          }
          ],
          "impact_areas": [
          {
          "toc_result_id": "93b3facf-16bd-4ee7-ab4f-b373eb2b14bd",
          "active": true
          },
          {
          "toc_result_id": "2a08ff03-504b-4abb-b77c-e2b6eb43dc2a",
          "active": true
          },
          {
          "toc_result_id": "fdc43ecf-a4c5-41ba-b058-174711e809df",
          "active": true
          },
          {
          "toc_result_id": "73f863f2-af3c-4275-96a8-f4e9bebab55a",
          "active": true
          },
          {
          "toc_result_id": "68b77f88-83e4-4ef7-a038-c0473fad0e29",
          "active": true
          },
          {
          "toc_result_id": "c3de5a57-8baf-4248-8375-a444d21503fa",
          "active": true
          },
          {
          "toc_result_id": "089a630e-e843-43dd-9c67-a1e572a95968",
          "active": true
          }
          ],
          "sdgs": [
          {
          "toc_result_id": "f4735d94-cfd1-4632-9038-38e5361a9621",
          "active": true
          },
          {
          "toc_result_id": "0c6fe719-2374-4dfe-b27f-ef2c7d1ffb9b",
          "active": true
          },
          {
          "toc_result_id": "19370f5a-eb76-4852-8990-837b27076407",
          "active": true
          },
          {
          "toc_result_id": "44e6e43e-ea2c-4c0c-872f-062575b2b39c",
          "active": true
          }
          ],
          "geo_scope": {
          "regions": [],
          "countries": []
          }
          }
          ]
          };
          const message = await servicesInformation.splitInformation(narrative)
         res.json({response: message})
          
      } catch (error) {
        
        return {
          error:'Not exists information'
        };
      }
}
