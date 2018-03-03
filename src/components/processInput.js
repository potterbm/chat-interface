import formulateAnswer from './formulateAnswer';
import parseQuestion   from './parseQuestion';
import questionWords   from '../constants/questionWords';
import speakeasy       from 'speakeasy-nlp';

export default async (input, next) => {
  const classifiedSentence = speakeasy.classify(input);
  console.log('I heard: \n', classifiedSentence, '\n');

  if (questionWords.includes(classifiedSentence.action)) {
    const parsedQuestion = parseQuestion(classifiedSentence);
    await formulateAnswer(parsedQuestion);
  }

  next();
};
