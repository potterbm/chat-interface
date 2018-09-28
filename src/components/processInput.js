import detectQuestion  from './detectQuestion';
import formulateAnswer from './formulateAnswer';
import parseQuestion   from './parseQuestion';
import speakeasy       from 'speakeasy-nlp';
import tagger          from '../lib/POSTagger';

export default async (input, next) => {
  const classifiedSentence = speakeasy.classify(input);
  classifiedSentence.taggedTokens = tagger.tag(classifiedSentence.tokens);
  // eslint-disable-next-line no-console
  console.log('I heard: \n', classifiedSentence, '\n');

  if (detectQuestion(classifiedSentence)) {
    const parsedQuestion = parseQuestion(classifiedSentence);
    await formulateAnswer(parsedQuestion);
  }

  next();
};
