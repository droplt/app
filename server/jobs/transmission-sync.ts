import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

const task = new AsyncTask('transmission-sync', () => {
  console.log('Task registered');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Task completed');
      resolve();
    }, 1500);
  });
});

export const transmissionSync = new SimpleIntervalJob({ seconds: 3 }, task);
