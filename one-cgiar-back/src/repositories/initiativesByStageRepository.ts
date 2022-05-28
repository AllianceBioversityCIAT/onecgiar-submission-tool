import {EntityRepository, Repository} from 'typeorm';
import {InitiativesByStages} from '../entity';

@EntityRepository(InitiativesByStages)
export class InitiativesByStagesRepository extends Repository<InitiativesByStages> {
  async findOneInitiativeByStage(initiativeId: number, stageId: number) {
    const testQuery = `SELECT a.id,a.initiativeId,a.stageId AS stageId,a.active,a.global_dimension
    FROM initiatives_by_stages a
    where a.initiativeId = ${initiativeId}
      and a.stageId = ${stageId}
    GROUP BY a.id,a.initiativeId,a.stageId,a.active`;

    const resultQuery = await this.query(testQuery);

    return resultQuery[0];
  }
}
