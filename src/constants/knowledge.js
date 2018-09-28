import actions from '../actions';

export const knowledgeGroups = {
  status : {
    action : actions.getSystemStatus,
  },

  joke : {
    action : actions.tellJoke,
  },
};

/* a map of stems to knowledge groups */
const stemMapping = {
  everyth : knowledgeGroups.status,
  jok     : knowledgeGroups.joke,
  server  : knowledgeGroups.status,
};

export const knownStems = Object.keys(stemMapping);

export default stemMapping;
