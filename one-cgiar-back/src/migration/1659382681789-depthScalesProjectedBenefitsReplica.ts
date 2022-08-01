import {MigrationInterface, QueryRunner} from "typeorm";

export class depthScalesProjectedBenefitsReplica1659382681789 implements MigrationInterface {
    name = 'depthScalesProjectedBenefitsReplica1659382681789'

    public async up(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(`insert into projection_benefits_depth_scales 
                                    (active, 
                                    projectionBenefitsId, 
                                    depthScalesId)
                                select 	1 as active, 
                                        pb.id as projectionBenefitsId, 
                                        pb.depth_scale_id as depthScalesId 
                                from projection_benefits pb 
                                where pb.depth_scale_id is not null;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
