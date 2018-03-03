import { knowledgeKeys } from '../components/knowledge';
import * as natural      from 'natural';
// import cannedResponses from '../constants/cannedResponses';

export default (classifiedQuestion) => {
  const { subject } = classifiedQuestion;

  const parsedQuestion = {
    interrogative : subject,
    subjectStem   : null,
    timeframe     : null,
  };

  natural.LancasterStemmer.attach();
  const subjectStems = subject.tokenizeAndStem();
  console.log('You are asking about: ', subjectStems);

  if (subjectStems.length < 1) return parsedQuestion;

  /*
  Here it seems to make sense to classify questions into a few categories to be able to reason
  about them.

  - asking about current state (how many processes are running)
  - asking about potential state (how many processes can you run?)
  */

  /*
  State Questions

  Asking about state usually includes a subject and a timeframe:

  How many login attempts happened today?
          [      ^       ]         [  ^  ]
    subject ----|                     |------- timeframe

  For now we can assume the subject will come first
  */

  for (let n = 0; n < subjectStems.length; n++) {
    if (knowledgeKeys.includes(subjectStems[n])) {
      parsedQuestion.subjectStem = subjectStems[n];
    }
  }

  return parsedQuestion;
};
