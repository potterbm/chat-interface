import { exec } from 'child_process';

export default () => new Promise((resolve, reject) => {
  exec('vm_stat', (err, stdout) => {
    if (err) return reject(err);

    const memory = {};

    const lines = stdout.split('\n');
    lines.forEach(line => {
      const keyValue = line
        .replace(/pages?\b/gi, '')
        .replace(/\.$/, '')
        .replace(/\s+/g, '')
        .replace(/['"]/g, '')
        .split(':');

      if (keyValue[0] === 'MachVirtualMemoryStatistics') {
        memory.pageSize = parseInt(keyValue[1].replace(/\D+/gi, ''), 10);
        return;
      }

      if (!keyValue[0]) return;
      if (!memory.pageSize) return;

      memory[keyValue[0].toLowerCase()] = parseInt(keyValue[1].replace(/\D+/gi, ''), 10);
    });

    const page = (pages) => `${(pages * memory.pageSize) / 1024 / 1024} MB`;


    const answer = [
      'Memory Usage:',
      `${page(memory.free)} Free`,
      `${page(memory.active)} Used`,
    ].join('\n');

    return resolve(answer);
  });
});
