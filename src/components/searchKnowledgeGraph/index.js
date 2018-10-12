import knowledge, { knownStems } from '../../constants/knowledge';

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
