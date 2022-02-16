import {MigrationInterface, QueryRunner} from 'typeorm';

export class InsertSectionsMetaTable1644844516398
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('delete data sections_meta');
    await queryRunner.query(`
        DELETE FROM sections_meta
        `);

    console.log('inset data sections_meta');
    await queryRunner.query(`
 
INSERT INTO
sections_meta
VALUES
(
  1,
  'context',
  'Context',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  2
),
(
  2,
  'general-information',
  'General Information',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  1
),
(
  3,
  'general-information',
  'General Information',
  'Pre Concept',
  1,
  0,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  2,
  1
),
(
  4,
  'financial-resources',
  'Financial Resources',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  10
),
(
  5,
  'work-package-research-plans-and-tocs',
  'Work Package research plans and ToCs',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  3
),
(
  6,
  'innovation-packages-and-srp',
  'Innovation Packages and Scaling Readiness Plan',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  4
),
(
  7,
  'impact-statements',
  'Impact Statements',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  5
),
(
  8,
  'melia',
  'Monitoring, Evaluation, Learning and Impact Assessment',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  6
),
(
  9,
  'mpara',
  'Management plan and Risk assessment',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  7
),
(
  10,
  'policy-compliance-and-oversight',
  'Policy compliance, and oversight',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  8
),
(
  11,
  'initial-theory-of-change',
  'Initial theory of change',
  'Pre Concept',
  1,
  0,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  2,
  2
),
(
  12,
  'initiative-statements',
  'Initiative statements',
  'Pre Concept',
  1,
  0,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  2,
  3
),
(
  13,
  'wp-and-geo-focus',
  'Work packages and Geographic focus',
  'Pre Concept',
  1,
  0,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  2,
  4
),
(
  15,
  'human-resources',
  'Human Resources',
  'Full Proposal',
  1,
  1,
  '2021-08-04 09:13:25',
  '2021-08-04 09:13:25',
  3,
  9
),
(
  16,
  'results',
  'Results',
  'Pre Concept',
  1,
  0,
  '2022-01-31 16:40:53',
  '2022-01-31 16:40:53',
  2,
  5
),
(
  17,
  'innovations',
  'Innovations',
  'Pre Concept',
  1,
  0,
  '2022-01-31 16:40:53',
  '2022-01-31 16:40:53',
  2,
  6
),
(
  18,
  'key-partners',
  'Key partners',
  'Pre Concept',
  1,
  0,
  '2022-01-31 16:40:53',
  '2022-01-31 16:40:53',
  2,
  7
),
(
  19,
  'global-budget',
  'Global Budget',
  'Pre Concept',
  1,
  0,
  '2022-01-31 16:40:53',
  '2022-01-31 16:40:53',
  2,
  8
);


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
