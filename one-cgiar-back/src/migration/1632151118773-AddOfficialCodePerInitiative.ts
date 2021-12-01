import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Initiatives} from '../entity/Initiatives';

export class AddOfficialCodePerInitiative1632151118773
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const initiativeRepo = getRepository(Initiatives);

    const initiatives = await initiativeRepo.find();

    for (let index = 0; index < initiatives.length; index++) {
      const init = initiatives[index];

      init.official_code = 'INIT-' + init.id;
    }

    const asnwer = await initiativeRepo.save(initiatives);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
