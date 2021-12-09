import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {GlobalTargets} from '../entity/GlobalTargets';

export class InsertGlobal2030Targets1635258745715
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const globalTargetsRepository = getRepository(GlobalTargets);

    const global2030Targets = globalTargetsRepository.create([
      {
        id: 1,
        impact_area_id: 1,
        impact_area_name: 'Nutrition, health and food security',
        target:
          'End hunger for all and enable affordable healthy diets for the 3 billion people who do not currently have access to safe and nutritious food.'
      },
      {
        id: 2,
        impact_area_id: 1,
        impact_area_name: 'Nutrition, health and food security',
        target:
          'Reduce cases of foodborne illness (600 million annually) and zoonotic disease (1 billion annually) by one third.'
      },
      {
        id: 3,
        impact_area_id: 2,
        impact_area_name: 'Poverty reduction, livelihoods and jobs',
        target:
          'Lift at least 500 million people living in rural areas above the extreme poverty line of US $1.90 per day (2011 PPP).'
      },
      {
        id: 4,
        impact_area_id: 2,
        impact_area_name: 'Poverty reduction, livelihoods and jobs',
        target:
          'Reduce by at least half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions.'
      },
      {
        id: 5,
        impact_area_id: 3,
        impact_area_name: 'Gender equality, youth and social inclusion',
        target:
          'Close the gender gap in rights to economic resources, access to ownership and control over land and natural resources for over 500 million women who work in food, land and water systems.'
      },
      {
        id: 6,
        impact_area_id: 3,
        impact_area_name: 'Gender equality, youth and social inclusion',
        target:
          'Offer rewardable opportunities to 267 million young people who are not in employment, education or training'
      },
      {
        id: 7,
        impact_area_id: 4,
        impact_area_name: 'Climate adaptation and mitigation',
        target:
          'Implement all National adaptation Plans (NAP) and Nationally Determined Contributions (NDC) to the Paris Agreement.'
      },
      {
        id: 8,
        impact_area_id: 4,
        impact_area_name: 'Climate adaptation and mitigation',
        target:
          'Equip 500 million small-scale producers to be more resilient to climate shocks, with climate adaptation solutions available through national innovation systems.'
      },
      {
        id: 9,
        impact_area_id: 5,
        impact_area_name: 'Environmental health and biodiversity',
        target:
          'Stay within planetary and regional environmental boundaries: consumptive water use in food production of less than 2500 km3 per year (with a focus on the most stressed basins), zero net deforestation, nitrogen application of 90 Tg per year (with a redistribution towards low-input farming system) and increased use efficiency; and phosphorus application of 10 Tg per year.'
      }
    ]);

    const res = await globalTargetsRepository.save(global2030Targets);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
