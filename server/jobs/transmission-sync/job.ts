import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

import Handler from './handler';

const handler = new Handler();

export const JOB_ID = 'transmission-sync';

export const job = new SimpleIntervalJob(
  { seconds: 5 },
  new AsyncTask(
    JOB_ID,
    () => handler.run(),
    () => {}
  )
);
