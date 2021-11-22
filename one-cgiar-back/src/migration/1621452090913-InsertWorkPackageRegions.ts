import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {RegionsByWorkPackages} from '../entity/RegionsByWorkPackages';
import {ExcelUtil} from '../utils/excel-util';
import _ from 'lodash';

const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

export class InsertWorkPackageRegions1621452090913
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
    const regnByWrkpkgRepo = getRepository(RegionsByWorkPackages);

    /**
     * read excel file
     */
    const wb = new ExcelUtil(parentD + fileName);
    const rcSheet = await wb.readWorkSheet('regions_contribution');
    const rgnSheet = await wb.readWorkSheet('regions');

    // extrac regions extraction code column
    const regionsExtCode = rgnSheet
      .getColumn('C')
      .values.slice(2, rgnSheet.getColumn('C').values.length);
    // extrac regions un code column
    const unCodes = rgnSheet
      .getColumn('A')
      .values.slice(2, rgnSheet.getColumn('A').values.length);
    // extrac regions initaitives id column
    const intiativesId = rcSheet
      .getColumn('A')
      .values.slice(2, rcSheet.getColumn('A').values.length);
    // extrac regions initaitives extraction code column
    const initiativesExtCode = rcSheet
      .getColumn('B')
      .values.slice(2, rcSheet.getColumn('B').values.length);

    let regionsArray = [];

    initiativesExtCode.forEach(async (value, i) => {
      let index = regionsExtCode.findIndex((item) => item == value);
      let unCode = unCodes[index].toString();

      let regionWP = {
        active: true,
        region_id: parseInt(unCode),
        initiativeId: intiativesId[i]
      };

      regionsArray.push(regionWP);
    });

    // get work packages from initiatives
    const workPackages = await queryRunner.query(
      `SELECT * FROM work_packages WHERE initvStgId IN (SELECT id FROM initiatives_by_stages WHERE initiativeId IN (${intiativesId}) AND stageId = 2 )`
    );

    // group regions by initiative id
    let grouped = _.mapValues(
      _.groupBy(regionsArray, 'initiativeId'),
      (clist) => clist.map((region) => _.omit(region, 'initiativeId'))
    );

    let saved = [];
    for (let index = 0; index < workPackages.length; index++) {
      const wp = workPackages[index];

      grouped[wp.initvStgId].forEach(async (gr) => {
        const wrkRegion = new RegionsByWorkPackages();
        wrkRegion.active = gr.active;
        wrkRegion.wrkPkg = wp;
        wrkRegion.region_id = gr.region_id;

        saved.push(wrkRegion);
      });
    }

    const sv = await regnByWrkpkgRepo.save(saved);
    console.log(sv);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
