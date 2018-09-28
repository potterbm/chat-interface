import settings from '../constants/settings';

export default () => {
  if (settings.get('mode') === 'admin') return 'admin> ';
  return '> ';
};
