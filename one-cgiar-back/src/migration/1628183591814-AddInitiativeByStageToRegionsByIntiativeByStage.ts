import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { RegionsByInitiativeByStage } from "../entity/RegionsByInitiativeByStage";
import { WorkPackages } from "../entity/WorkPackages";

export class AddInitiativeByStageToRegionsByIntiativeByStage1628183591814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const RRepo = getRepository(RegionsByInitiativeByStage);
        const WPRepo = getRepository(WorkPackages);
        // get all regions by WP (renamed to regions_by_initiative_by_stage)
        const regions = await RRepo.find({ relations: ['wrkPkg'] });

        for (let index = 0; index < regions.length; index++) {
            // single element of the looped array
            const region = regions[index];
            // get wp intiative by stage
            const wp = await WPRepo.findOne(region.wrkPkg.id, { relations: ['initvStg'] });
            // assign intiative by stage to country
            region.initvStg = wp.initvStg;
        }

        // console.log(regions)
        // update regions with initiative by stage
        const asnwer = await RRepo.save(regions);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
