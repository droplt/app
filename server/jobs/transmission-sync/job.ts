import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

import SyncHandler from './handler';

const syncHandler = new SyncHandler();

export const JOB_ID = 'transmission-sync';
export const job = new SimpleIntervalJob(
  { seconds: 3 },
  new AsyncTask(
    JOB_ID,
    () => syncHandler.run(),
    () => {}
  )
);
