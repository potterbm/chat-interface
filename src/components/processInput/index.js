import alterSettings   from '../alterSettings';
import detectQuestion  from './detectQuestion';
import formulateAnswer from '../formulateAnswer';
import log             from '../../lib/log';
import parseQuestion   from './parseQuestion';
import settings        from '../../constants/settings';
import speakeasy       from 'speakeasy-nlp';
import tagger          from '../../lib/POSTagger';

export default async (input, next) => {
  if (settings.get('mode') === 'admin' || input === 'set mode') {
    alterSettings(input);
    next();
    return;
  }

  const classifiedSentence = speakeasy.classify(input);
  classifiedSentence.original = input;
  classifiedSentence.taggedTokens = tagger.tag(classifiedSentence.tokens);

  log('I heard: \n', classifiedSentence, '\n');

  if (detectQuestion(classifiedSentence)) {
    const parsedQuestion = parseQuestion(classifiedSentence);
    await formulateAnswer(parsedQuestion);
  }

  next();
};
