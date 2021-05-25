import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { config } from 'dotenv';
import _ from "lodash";
import axios from "axios";
import { CountriesByWorkPackages } from "../entity/CountriesByWorkPackages";
import { ExcelUtil } from "../utils/excel-util";
import { ProjectionBenefits } from "../entity/ProjectionBenefits";


config();


const clarisaHost = process.env.clarisa || 'http://clarisatest.ciat.cgiar.org/';
const oa = `${process.env['clarisa_user']}:${process.env['clarisa_password']}`
const clarisaHeader = {
    Authorization: `Basic ${Buffer.from(oa).toString('base64')}`
}


const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

export class InsertWorkPackageImpactAreas1621948449651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
        const pBRepo = getRepository(ProjectionBenefits);

        /**
        * read excel file
        */
        const wb = new ExcelUtil(parentD + fileName);
        const impactSheet = await wb.readWorkSheet('impacts');

        // extract initaitives id column
        const initiaitivesId = impactSheet.getColumn('A').values.slice(2, impactSheet.getColumn('A').values.length);
        // extract impact names column
        const impactNames = impactSheet.getColumn('B').values.slice(2, impactSheet.getColumn('B').values.length);
        // extract impact description column
        const impactDescp = impactSheet.getColumn('C').values.slice(2, impactSheet.getColumn('C').values.length);

        // get work packages from initiatives
        const workPackages = await queryRunner.query(`SELECT * FROM work_packages WHERE initvStgId IN (SELECT id FROM initiatives_by_stages WHERE initiativeId IN (${initiaitivesId}) AND stageId = 2 )`);

        // get clarisa impact areas
        const impactAreas = await axios.get(clarisaHost + 'impact-areas', { headers: clarisaHeader });

        let pBArray = []

        impactNames.forEach((impactName, i) => {
            // populate projection benefit object
            let area = impactAreas.data.find(IA => IA.name.toLowerCase().indexOf(impactName.toString().toLowerCase()) != -1);
            const pB = {
                impact_area_id: area.id,
                impact_area_name: area.name,
                notes: impactDescp[i],
                initiativeId: initiaitivesId[i]
            }
            pBArray.push(pB)
        })
        
        // group projection benefits by initiative id
        const grouped = _.mapValues(_.groupBy(pBArray, 'initiativeId'),
        clist => clist.map(pB_ => _.omit(pB_, 'initiativeId')));
        
        let saved = []
        for (let index = 0; index < workPackages.length; index++) {
            const wp = workPackages[index];

            if (grouped[wp.initvStgId]) {

                grouped[wp.initvStgId].forEach(gr => {
                    const projectionB = new ProjectionBenefits();
                    projectionB.active = true;
                    projectionB.impact_area_id = gr.impact_area_id;
                    projectionB.impact_area_name = gr.impact_area_name;
                    projectionB.notes = gr.notes;
                    projectionB.wrkPkg = wp;

                    saved.push(projectionB)
                })
            }

        }
        // console.log(saved)
        const sv = await pBRepo.save(saved);
        console.log(sv);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
