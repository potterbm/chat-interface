import parseQuestion from './parseQuestion';
import questions     from '../constants/questions';
import speakeasy     from 'speakeasy-nlp';

export default (input) => {
  // console.log('You said: ', input);
  const classifiedSentence = speakeasy.classify(input);
  console.log('I heard: ', classifiedSentence);

  if (questions.includes(classifiedSentence.action)) {
    console.log('question: ', parseQuestion(classifiedSentence));
  }
};
