import {getConnection} from 'typeorm';
import {BaseError} from '../handlers/BaseError';

export class ToolsSbt {
  queryRunner = getConnection().createQueryRunner().connection;

  /**
   * FUNCTION FOR MERGE DATA
   * @param initvStgId
   * @param repo
   * @param conditions
   * @param data
   * @returns
   */
  async mergeData(repo?, query?, data?) {
    let mergeData;
    let savedData;

    //Find record in DB with SQL query
    let findOneSql = await this.queryRunner.query(query);
    // Get one record
    savedData = findOneSql[0];

    try {
      savedData = typeof savedData === 'undefined' ? [] : savedData;
      if (savedData) {
        // Validate if exists record then make marge else next
        if (savedData.id) {
          repo.merge(savedData, data);

          mergeData = savedData;

          return mergeData;
        } else {
          return data;
        }
      }
    } catch (error) {
      console.log(error);
      throw new BaseError('Error merge array', 400, error.message, false);
    }
  }
}
