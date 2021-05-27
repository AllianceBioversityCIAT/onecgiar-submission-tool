import { getConnection } from "typeorm";
import _ from "lodash";

export const validateConceptSection = async () => {

    const queryRunner = getConnection().createQueryRunner();
    const conceptStagesMeta = await queryRunner.query(`
        SELECT * FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE active = true LIMIT 1)
    `);

    // group projection benefits by initiative id
    // const grouped = _.mapValues(_.groupBy(pBArray, 'initiativeId'),
    // clist => clist.map(pB_ => _.omit(pB_, 'initiativeId')));



}