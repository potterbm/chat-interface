import auxiliaryVerbs from '../constants/auxiliaryVerbs';
import questionWords  from '../constants/questionWords';

function indexOfPOS(taggedTokens, pos) {
  return taggedTokens.findIndex((array) => array[1].includes(pos));
}

function subjectVerbInversion(taggedTokens) {
  const verbIndex = indexOfPOS(taggedTokens, 'VB');
  const subjectIndex = indexOfPOS(taggedTokens, 'PRP');

  return verbIndex < subjectIndex && auxiliaryVerbs.includes(taggedTokens[verbIndex][0]);
}

export default (classifiedSentence) => {
  // Easy question words
  if (questionWords.includes(classifiedSentence.action)) return true;

  // Ends in question mark
  if (classifiedSentence.tokens[classifiedSentence.tokens.length - 1] === '?') return true;

  // Subject–auxiliary inversion
  if (subjectVerbInversion(classifiedSentence.taggedTokens)) return true;

  return false;
};
