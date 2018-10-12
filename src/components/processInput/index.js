import detectQuestion from './detectQuestion';
import log            from '../../lib/log';
import parseQuestion  from './parseQuestion';
import speakeasy      from 'speakeasy-nlp';
import tagger         from '../../lib/POSTagger';

export default (input) => {
  let parsedInput = {
    classifiedSentence : speakeasy.classify(input),
    knowledgeGroup     : null,
    knowledgeStem      : null,
    timeframe          : null,
  };

  parsedInput.classifiedSentence.original = input;
  parsedInput.classifiedSentence.taggedTokens = tagger.tag(parsedInput.classifiedSentence.tokens);

  log('classifiedSentence: \n', parsedInput.classifiedSentence, '\n');

  if (detectQuestion(parsedInput.classifiedSentence)) {
    parsedInput = parseQuestion(parsedInput.classifiedSentence);
  }

  return parsedInput;
};
