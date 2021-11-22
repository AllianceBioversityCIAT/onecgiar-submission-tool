import * as taskClarisa from '../utils/task-clarisa';
var cron = require('node-cron');

export default async () => {
  // Create and Delete institutions every six hours 0 */6 * * *
  cron.schedule(process.env.COPY_INSTITUTIONS, async () => {
    try {
      await taskClarisa.Main();
    } catch (error) {
      console.log('Data management from CLARISA', error);
    }
  });
};
