import {EntityRepository, Repository} from 'typeorm';
import { TocSdgResults } from '../entity/tocSdgResults';


@EntityRepository(TocSdgResults)
export class TocSdgResultsRepository extends Repository<TocSdgResults> {
    async saveInDataBaseSdgResults(listSdgResults:any){
        const aux = await this.save(listSdgResults);
        return aux;
    }
}