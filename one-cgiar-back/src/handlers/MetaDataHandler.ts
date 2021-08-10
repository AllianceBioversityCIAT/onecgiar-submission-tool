import { BaseError } from "./BaseError";
import { InitiativeStageHandler } from "./InitiativeStageController";


export class MetaDataHandler extends InitiativeStageHandler {

    
    async getStages(initiativeId:string){

      try {

        let stages = this.queryRunner.query(`SELECT b.id as stageId,b.description,a.active,
        b.start_date,b.end_date
        FROM initiatives_by_stages a
        JOIN stages b
        ON a.stageId = b.id
        WHERE initiativeId =  ${initiativeId}`);

        return stages
        
      } catch (error) {
        

        throw new BaseError('Get Metadata', 400, error.message, false)

      }

    }


    async getSections(initiativeId:string) {

        try {

            let sections = this.queryRunner.query(` SELECT sections.id as sectionId,
            stages.description as stage,sections.description as section,sections.active, sections.visible,sections.orderSection,
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

            throw new BaseError('Get Metadata', 400, error.message, false)

        }

    }

    async getSubSectios(initiativeId:string) {

        try {

            let subsections = this.queryRunner.query(` SELECT subsections.id as subSectionId,subsections.description as subsections,
            subsections.display_name as display,subsections.single_section, subsections.sectionId,subsections.active,
            subsections.visible,subsections.order
            FROM stages stages
            JOIN sections_meta sections
              ON stages.id = sections.stageId
            LEFT JOIN subsections_meta subsections
              ON sections.id = subsections.sectionId
            LEFT JOIN stages_meta stageMeta
              ON stageMeta.subsectionId = subsections.id
           WHERE sections.stageId in (SELECT stageId FROM initiatives_by_stages WHERE initiativeId = ${initiativeId})
           GROUP BY  subsections.id,  subsections.description, subsections.single_section,subsections.display_name
           ORDER BY subsections.order`);

            return subsections


        } catch (error) {


            throw new BaseError('Get Metadata', 400, error.message, false)

        }

    }

    async getSubSectiosByName(sectionName: any) {

        try {

            let subsections = this.queryRunner.query(` SELECT subsections.id as subSectionId,subsections.description as subsections,subsections.display_name as display,subsections.single_section
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

}