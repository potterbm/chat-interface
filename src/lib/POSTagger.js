import natural from 'natural';
import path    from 'path';

const BASE_FOLDER = path.join(path.dirname(require.resolve('natural')), 'brill_pos_tagger');
const rulesFilename = `${BASE_FOLDER}/data/English/tr_from_posjs.txt`;
const lexiconFilename = `${BASE_FOLDER}/data/English/lexicon_from_posjs.json`;
const defaultCategory = 'N';

const lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
const rules   = new natural.RuleSet(rulesFilename);
const tagger  = new natural.BrillPOSTagger(lexicon, rules);

export default tagger;
