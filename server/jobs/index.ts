import { ToadScheduler } from 'toad-scheduler';

import { job as sync } from './transmission-sync';

export const start = () => {
  new ToadScheduler().addSimpleIntervalJob(sync);
};
