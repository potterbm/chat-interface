import actions from './actions';

/* a map of stems to actions */
const thingsIKnow = {
  everyth : actions.getSystemStatus,
};

export const knowledgeKeys = Object.keys(thingsIKnow);

export default thingsIKnow;
