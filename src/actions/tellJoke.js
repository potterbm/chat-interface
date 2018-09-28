/* eslint-disable max-len */
const jokes = [
  'Why do cows go to New York? To see the moosicals!',
  'I invited my boyfriend to go to the gym with me, but he stood me up. I guess the two of us aren’t going to work out.',
];
/* eslint-enable max-len */

export default () => jokes[Math.floor(Math.random() * jokes.length)];
