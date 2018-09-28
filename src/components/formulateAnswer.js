import cannedResponses from '../constants/cannedResponses';
import displayMessage  from './displayMessage';

export default async (parsedQuestion) => {
  // For now if we didn't find a knowledge stem let's just say we don't know
  if (parsedQuestion.knowledgeStem === null) {
    return displayMessage(cannedResponses.question.confusion);
  }

  if (parsedQuestion.knowledgeGroup === null) {
    return displayMessage(cannedResponses.question.ignorance);
  }

  const answer = parsedQuestion.knowledgeGroup.action(parsedQuestion);

  // If the answer is a promise, delay a little
  if (typeof answer.then === 'function') {
    displayMessage(cannedResponses.delay.searching);
    await answer;
    return answer.then(text => displayMessage(text));
  }

  return displayMessage(answer);
};
