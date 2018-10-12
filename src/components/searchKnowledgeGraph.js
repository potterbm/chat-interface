import knowledgeGraph from '../../constants/knowledge';

export default function searchKnowledgeGraph(processedInput) {
  const stemsToSearch = [].concat(
    processedInput.classifiedInput.subjectStems,
    processedInput.classifiedInput.ownerStems,
  );

  const validStem = stemsToSearch.find(stem => knowledgeGraph.findKnowledgeForStem(stem) !== null);

  processedInput.knowledgeStem = validStem || null;
  processedInput.knowledge     = knowledgeGraph.findKnowledgeForStem(validStem);

  return processedInput;
}
