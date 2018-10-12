import closeHandler from '../eventHandlers/close';
import lineHandler  from '../eventHandlers/line';
import promptChar   from '../constants/prompt';
import readline     from 'readline';

let rl = null;

export default (promptCallback) => {
  if (rl !== null) return rl;

  // Initialize shell
  rl = readline.createInterface({
    input    : process.stdin,
    output   : process.stdout,
    prompt   : promptChar(),
    terminal : true,
  });

  rl.on('close', closeHandler);
  rl.on('SIGINT', closeHandler);

  rl.on('line', lineHandler(promptCallback));

  return rl;
};
