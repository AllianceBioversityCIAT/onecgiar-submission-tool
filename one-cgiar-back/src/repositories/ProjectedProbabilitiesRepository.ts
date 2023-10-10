import {EntityRepository, getRepository, Repository} from 'typeorm';
import {ProjectedProbabilities} from '../entity';

@EntityRepository(ProjectedProbabilities)
export class ProjectedProbabilitiesRepository extends Repository<ProjectedProbabilities> {
    async deleteAll(){
        try {
            const deleteQuery = `
                delete from clarisa_projected_probabilities;
            `;
            let resultDelete = await this.query(deleteQuery);
            return resultDelete; 
        } catch (error) {
            return error;
        }
    }
}