import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

import Handler from './handler';

const handler = new Handler();

export const JOB_ID = 'transmission-sync';
export const job = new SimpleIntervalJob(
  { seconds: 3 },
  new AsyncTask(JOB_ID, () => handler.run())
);
