import * as natural              from 'natural';
import knowledge, { knownStems } from '../constants/knowledge';

export default (classifiedQuestion) => {
  const { subject } = classifiedQuestion;

  const parsedQuestion = {
    classifiedQuestion,
    interrogative  : subject,
    knowledgeGroup : null,
    knowledgeStem  : null,
    timeframe      : null,
  };

  natural.LancasterStemmer.attach();
  parsedQuestion.subjectStems = subject.tokenizeAndStem();
  // eslint-disable-next-line no-console
  console.log('You are asking about: ', parsedQuestion.subjectStems, '\n');

  if (parsedQuestion.subjectStems.length < 1) return parsedQuestion;

  // if (
  //   parsedQuestion.subjectStems.length === 1 &&
  //   knownStems.includes(parsedQuestion.subjectStems)
  // ) {
  //   parsedQuestion.knowledgeStem = parsedQuestion.subjectStems[0];
  //   parsedQuestion.knowledgeGroup = knowledge[parsedQuestion.subjectStems[0]];
  //   return parsedQuestion;
  // }

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

  // Iterate through stems in the subject
  for (let n = 0; n < parsedQuestion.subjectStems.length; n++) {
    if (knownStems.includes(parsedQuestion.subjectStems[n])) {
      parsedQuestion.knowledgeStem  = parsedQuestion.subjectStems[n];
      parsedQuestion.knowledgeGroup = knowledge[parsedQuestion.subjectStems[n]];
      break;
    }
  }

  return parsedQuestion;
};
