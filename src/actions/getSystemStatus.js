import { exec } from 'child_process';

export default () => new Promise((resolve, reject) => {
  exec('pmset -g powerstate', (err, stdout) => {
    if (err) return reject(err);
    return resolve(stdout);
  });
});
