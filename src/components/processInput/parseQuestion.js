import * as natural              from 'natural';
import detectTimeframe           from './detectTimeframe';
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

  return parsedQuestion;
};
