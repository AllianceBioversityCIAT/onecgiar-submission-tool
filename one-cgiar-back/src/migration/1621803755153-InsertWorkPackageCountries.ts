import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {CountriesByWorkPackages} from '../entity/CountriesByWorkPackages';
import {ExcelUtil} from '../utils/excel-util';
import _ from 'lodash';

const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

export class InsertWorkPackageCountries1621803755153
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
    const regnByWrkpkgRepo = getRepository(CountriesByWorkPackages);

    /**
     * read excel file
     */
    const wb = new ExcelUtil(parentD + fileName);
    const countriesContributionSheet = await wb.readWorkSheet(
      'countries_contribution'
    );
    const countriesSheet = await wb.readWorkSheet('countries');

    // extrac countries initaitives id column
    const countriesInitiativesId = countriesContributionSheet
      .getColumn('A')
      .values.slice(2, countriesContributionSheet.getColumn('A').values.length);
    // extrac countries names column
    const countriesNames = countriesContributionSheet
      .getColumn('D')
      .values.slice(2, countriesContributionSheet.getColumn('D').values.length);

    // extrac countries names column
    const cNames = countriesSheet
      .getColumn('C')
      .values.slice(2, countriesSheet.getColumn('C').values.length);
    // extrac countries code column
    const countryCode = countriesSheet
      .getColumn('A')
      .values.slice(2, countriesSheet.getColumn('A').values.length);

    // get work packages from initiatives
    const workPackages = await queryRunner.query(
      `SELECT * FROM work_packages WHERE initvStgId IN (SELECT id FROM initiatives_by_stages WHERE initiativeId IN (${countriesInitiativesId}) AND stageId = 2 )`
    );

    let countriesArray = [];

    countriesNames.forEach(async (value, i) => {
      let index = cNames.findIndex((item) => item == value);
      if (index != -1) {
        let contrCode = countryCode[index].toString();
        let countryWP = {
          active: true,
          country_id: parseInt(contrCode),
          initiativeId: countriesInitiativesId[i]
        };

        countriesArray.push(countryWP);
      }
    });

    // group countries by initiative id
    let grouped = _.mapValues(
      _.groupBy(countriesArray, 'initiativeId'),
      (clist) => clist.map((region) => _.omit(region, 'initiativeId'))
    );

    let saved = [];
    for (let index = 0; index < workPackages.length; index++) {
      const wp = workPackages[index];

      if (grouped[wp.initvStgId]) {
        grouped[wp.initvStgId].forEach((gr) => {
          const wrkRegion = new CountriesByWorkPackages();
          wrkRegion.active = gr.active;
          wrkRegion.wrkPkg = wp;
          wrkRegion.country_id = gr.country_id;

          saved.push(wrkRegion);
        });
      }
    }
    // throw new Error()
    const sv = await regnByWrkpkgRepo.save(saved);
    console.log(sv);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
