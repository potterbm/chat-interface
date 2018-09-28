/*
* Colors
*/
const COLOR = {
  blue    : '\x1b[34m',
  cyan    : '\x1b[36m',
  green   : '\x1b[32m',
  magenta : '\x1b[35m',
  red     : '\x1b[31m',
  reset   : '\x1b[0m',
  yellow  : '\x1b[33m',
};

/*
* Helper functions
*/
const color = (colorToUse, ...text) => {
  process.stdout.write(COLOR[colorToUse]);
  console.log(...text); // eslint-disable-line no-console
  process.stdout.write(COLOR.reset);
  // console.log(`${COLOR[colorToUse]}${text}${COLOR.reset}`); // eslint-disable-line no-console
};

// const blue    = color.bind(this, 'blue');
// const cyan    = color.bind(this, 'cyan');
// const green   = color.bind(this, 'green');
// const magenta = color.bind(this, 'magenta');
// const red     = color.bind(this, 'red');
const yellow  = color.bind(this, 'yellow');

export default (...args) => {
  yellow('\n', ...args, '\n');
};
