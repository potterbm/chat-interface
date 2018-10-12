import alterSettings        from '../components/alterSettings';
import formulateAnswer      from '../components/formulateAnswer';
import log                  from '../lib/log';
import processInput         from '../components/processInput';
import searchKnowledgeGraph from '../components/searchKnowledgeGraph';
import settings             from '../constants/settings';

export default (next) => async (input) => {
  if (settings.get('mode') === 'admin' || input === 'set mode') {
    alterSettings(input);
    next();
    return;
  }

  const processedInput = processInput(input);
  log('Processed Input:\n', processedInput, '\n');

  searchKnowledgeGraph(processedInput);
  log('Processed Input:\n', processedInput, '\n');

  const answer = await formulateAnswer(processedInput);
  log(answer);

  next();
};
