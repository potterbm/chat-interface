import * as natural              from 'natural';
import detectTimeframe           from './detectTimeframe';
import knowledge, { knownStems } from '../../constants/knowledge';
import log                       from '../../lib/log';

export default (classifiedInput) => {
  const { owner, subject } = classifiedInput;

  const parsedQuestion = {
    classifiedInput,
    knowledgeGroup : null,
    knowledgeStem  : null,
    timeframe      : null,
  };

  natural.LancasterStemmer.attach();
  parsedQuestion.classifiedInput.subjectStems = [];
  parsedQuestion.classifiedInput.ownerStems   = [];

  if (subject !== undefined) {
    parsedQuestion.classifiedInput.subjectStems = subject.tokenizeAndStem();
  }

  if (owner !== undefined) {
    parsedQuestion.classifiedInput.ownerStems   = owner.tokenizeAndStem();
  }

  log('Subjects: ', parsedQuestion.classifiedInput.subjectStems, '\n');
  log('Owners: ', parsedQuestion.classifiedInput.ownerStems, '\n');

  if (parsedQuestion.classifiedInput.subjectStems.length < 1) return parsedQuestion;

  parsedQuestion.timeframe = detectTimeframe(parsedQuestion.classifiedInput);

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
  for (let n = 0; n < parsedQuestion.classifiedInput.subjectStems.length; n++) {
    if (knownStems.includes(parsedQuestion.classifiedInput.subjectStems[n])) {
      parsedQuestion.knowledgeStem  = parsedQuestion.classifiedInput.subjectStems[n];
      parsedQuestion.knowledgeGroup = knowledge[parsedQuestion.knowledgeStem];
      break;
    }
  }

  return parsedQuestion;
};
