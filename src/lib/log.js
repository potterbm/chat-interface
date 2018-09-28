import settings from '../constants/settings';

export default (...text) => {
  if (!settings.get('debug')) return;

  console.log(...text); // eslint-disable-line no-console
};
