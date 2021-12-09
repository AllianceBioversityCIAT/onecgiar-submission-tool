import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Stages} from '../entity/Stages';
import {StagesMeta} from '../entity/StagesMeta';

export class InsertKeyPartnerMeta1622161311648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const stageRepo = getRepository(Stages);
    const stageMetaRepo = getRepository(StagesMeta);
    const concptStage = await stageRepo.findOne({where: {active: true}});

    const conceptEntitiesMeta = stageMetaRepo.create([
      {
        group_by: 'Key Partners',
        order: 5,
        col_name: 'key_partner_id',
        table_name: 'key_partners',
        display_name: null,
        stage_name: concptStage.description,
        active: true,
        visible: false,
        stage: concptStage
      },
      {
        group_by: 'Key Partners',
        order: 5,
        col_name: 'key_partner_name',
        table_name: 'key_partners',
        display_name: 'Key Partner Name',
        stage_name: concptStage.description,
        active: true,
        visible: true,
        stage: concptStage
      },
      {
        group_by: 'Key Partners',
        order: 5,
        col_name: 'description',
        table_name: 'key_partners',
        display_name: 'Key Partner Description',
        stage_name: concptStage.description,
        active: true,
        visible: true,
        stage: concptStage
      }
    ]);

    let s = await stageMetaRepo.save(conceptEntitiesMeta);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
