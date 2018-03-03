import closeHandler from '../eventHandlers/close';
import lineHandler  from '../eventHandlers/line';
import prompt       from '../constants/prompt';
import readline     from 'readline';

let rl = null;

export default (process, promptCallback) => {
  if (rl !== null) return rl;

  // Initialize shell
  rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout,
    prompt,
  });

  rl.on('close', closeHandler);
  rl.on('line', lineHandler(promptCallback));
  rl.on('SIGINT', closeHandler);

  return rl;
};
