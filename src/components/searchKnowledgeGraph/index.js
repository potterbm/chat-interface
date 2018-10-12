import knowledge, { knownStems } from '../../constants/knowledge';

export default function searchKnowledgeGraph(processedInput) {
  // Iterate through stems in the subject
  for (let n = 0; n < processedInput.classifiedInput.subjectStems.length; n++) {
    if (knownStems.includes(processedInput.classifiedInput.subjectStems[n])) {
      processedInput.knowledgeStem  = processedInput.classifiedInput.subjectStems[n];
      processedInput.knowledgeGroup = knowledge[processedInput.knowledgeStem];
      break;
    }
  }

  return processedInput;
}
