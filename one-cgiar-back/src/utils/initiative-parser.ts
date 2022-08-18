import { getConnection } from 'typeorm';

export module initiativeParser{
    export const getInitParams = async (initStageId: string) => {
        const queryRunner = getConnection().createQueryRunner().connection;
        try {
            const stageIdQuery = `
                              select initiativeId, stageId  from initiatives_by_stages ibs 
                              where id = ${initStageId}
                                `;
            const result = await queryRunner.query(stageIdQuery);
            return result[0];
          } catch (error) {
            
          }
    }
}