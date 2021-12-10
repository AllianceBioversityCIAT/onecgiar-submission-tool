import {MigrationInterface, QueryRunner, getConnection} from 'typeorm';

export class InsertRiskTheme1638388239009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('clarisa_risk_theme')
      .values([
        {
          id: 1,
          risk_theme: 'Operational',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 2,
          risk_theme: 'Fit for purpose partnerships',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 3,
          risk_theme: 'Science',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 4,
          risk_theme: 'Generic Theme',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 5,
          risk_theme: 'Funding',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 6,
          risk_theme: 'Cohesion',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 7,
          risk_theme: 'Talent growth',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 8,
          risk_theme: 'Legacy work',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 9,
          risk_theme: 'Legal',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        },
        {
          id: 10,
          risk_theme: 'Ethical',
          created_at: '2021-11-18 15:59:15',
          updated_at: '2021-11-18 15:59:15'
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
