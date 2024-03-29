// import {
//   getRepository,
//   MigrationInterface,
//   QueryRunner,
//   getConnection
// } from 'typeorm';
// import {RegionsByInitiativeByStage} from '../entity/RegionsByInitiativeByStage';

// export class InsertInitiativesONECGIARRegions1640014354174
//   implements MigrationInterface
// {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     const connection = getConnection();

//     const regionsRepo = connection.getRepository(RegionsByInitiativeByStage);

//     const regions = await regionsRepo.find();

//     regions.map((r) => (r.active = false));

//     const updatedR = await regionsRepo.save(regions);

//     const insertSQL = `INSERT INTO regions_by_initiative_by_stage (active, wrkPkgId, region_id, initvStgId)
//     VALUES (1,155,4,34),(1,155,5,34),(1,157,4,34),(1,157,5,34),(1,159,4,34),(1,159,5,34),(1,168,4,37),
//     (1,168,5,37),(1,170,4,37),(1,170,5,37),(1,171,4,37),(1,171,5,37),(1,172,4,37),(1,172,5,37),(1,173,5,38),
//     (1,173,6,38),(1,173,1,38),(1,173,4,38),(1,173,3,38),(1,173,2,38),(1,175,6,38),(1,175,2,38),(1,176,4,38),
//     (1,176,5,38),(1,302,4,38),(1,302,5,38),(1,204,4,45),(1,204,3,45),(1,204,1,45),(1,204,5,45),(1,204,6,45),
//     (1,204,2,45),(1,206,4,45),(1,206,3,45),(1,206,1,45),(1,206,5,45),(1,206,6,45),(1,206,2,45),(1,207,4,45),
//     (1,207,3,45),(1,207,1,45),(1,207,5,45),(1,207,6,45),(1,207,2,45),(1,208,4,45),(1,208,3,45),(1,208,1,45),
//     (1,208,5,45),(1,208,6,45),(1,208,2,45),(1,217,3,47),(1,217,5,47),(1,221,3,48),(1,221,4,48),(1,221,5,48),
//     (1,221,1,48),(1,239,5,52),(1,240,5,52),(1,241,5,52),(1,242,5,52),(1,243,5,52),(1,247,4,53),(1,249,3,54),
//     (1,250,3,54),(1,251,3,54),(1,252,3,54),(1,253,3,54),(1,254,1,55),(1,254,2,55),(1,254,3,55),(1,254,4,55),
//     (1,254,6,55),(1,255,2,55),(1,255,3,55),(1,255,4,55),(1,255,6,55),(1,256,1,55),(1,256,2,55),(1,256,3,55),
//     (1,256,4,55),(1,257,1,55),(1,257,2,55),(1,257,3,55),(1,257,4,55),(1,259,4,56),(1,259,5,56),(1,267,3,58),
//     (1,267,4,58),(1,268,4,58),(1,268,5,58),(1,269,5,58),(1,269,4,58),(1,269,3,58),(1,275,4,60),(1,275,4,60),
//     (1,275,2,67),(1,275,3,67),(1,275,4,67),(1,275,1,67),(1,275,2,67),(1,275,3,67),(1,275,4,67),(1,275,1,67),
//     (1,275,2,67),(1,275,3,67),(1,275,4,67),(1,275,1,67),(1,275,2,67),(1,275,4,67),(1,275,2,67),(1,275,3,67),(1,275,4,67),(1,275,1,67)`;

//     const insertedRegions = await connection
//       .createQueryRunner()
//       .query(insertSQL);

//     console.log(insertedRegions);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {}
// }
