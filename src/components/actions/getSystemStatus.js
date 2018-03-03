import { exec } from 'child_process';

// TODO: all actions should return a promise
export default () => {
  exec('pmset -g powerstate', (err, stdout) => {
    return stdout;
  });
};
