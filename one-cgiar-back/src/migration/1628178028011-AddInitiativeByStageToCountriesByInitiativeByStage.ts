import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { CountriesByInitiativeByStage } from "../entity/CountriesByInitiativeByStage";
import { WorkPackages } from "../entity/WorkPackages";

export class AddInitiativeByStageToCountriesByInitiativeByStage1629832672160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const CRepo = getRepository(CountriesByInitiativeByStage);
        const WPRepo = getRepository(WorkPackages);
        // get all countries by WP (renamed to countries_by_initiative_by_stage)
        const countries = await CRepo.find({ relations: ['wrkPkg'] });

        for (let index = 0; index < countries.length; index++) {
            // single element of the looped array
            const country = countries[index];
            // get wp intiative by stage
            const wp = await WPRepo.findOne(country.wrkPkg.id, { relations: ['initvStg'] });
            // assign intiative by stage to country
            country.initvStg = wp.initvStg;
        }

        // console.log(countries)
        // update countries with initiative by stage
        const asnwer = await CRepo.save(countries);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
