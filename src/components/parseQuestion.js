import * as natural                 from 'natural';
import knowledge, { knowledgeKeys } from '../constants/knowledge';

export default (classifiedQuestion) => {
  const { subject } = classifiedQuestion;

  const parsedQuestion = {
    classifiedQuestion,
    interrogative : subject,
    knowledgeStem : null,
    timeframe     : null,
  };

  natural.LancasterStemmer.attach();
  parsedQuestion.subjectStems = subject.tokenizeAndStem();
  console.log('You are asking about: ', parsedQuestion.subjectStems, '\n');

  if (parsedQuestion.subjectStems.length < 1) return parsedQuestion;

  /*
  Here it seems to make sense to classify questions into a few categories to be able to reason
  about them.

  - asking about current state (how many processes are running)
  - asking about potential state (how many processes can you run?)
  */

  /*
  Current State Questions

  Asking about state usually includes a subject and a timeframe:

  How many login attempts happened today?
          [      ^       ]         [  ^  ]
    subject ----|                     |------- timeframe

  For now we can assume the subject will come first
  */

  // Iterate through stems in the
  for (let n = 0; n < parsedQuestion.subjectStems.length; n++) {
    if (knowledgeKeys.includes(parsedQuestion.subjectStems[n])) {
      parsedQuestion.knowledgeStem = parsedQuestion.subjectStems[n];
      parsedQuestion.action = knowledge[parsedQuestion.subjectStems[n]];
      break;
    }
  }

  return parsedQuestion;
};
