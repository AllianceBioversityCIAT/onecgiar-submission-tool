import expressLoader from './express';
import jobsLoader from './jobs';

export default async ({expressApp}) => {
  await expressLoader({app: expressApp});
  console.log('Express Initialized');

  await jobsLoader();
  console.log('Jobs Initialized');
};
