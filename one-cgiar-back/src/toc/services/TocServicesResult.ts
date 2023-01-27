import {getConnection, getCustomRepository, getRepository} from 'typeorm';
import axios from 'axios';

export class TocServicesResults{
    private tocHost = 'https://toc.loc.codeobia.com/api/toc/75ebe59f-457b-4574-a772-b3db2b27f9df/dashboard-result';
    public queryRunner = getConnection().createQueryRunner().connection;
    

    async importInformationTocResultDashBoard(){
        const narrative = await axios.get(this.tocHost);
    }
}