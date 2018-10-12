import actions                       from '../actions';
import KnowledgeGraph, { Knowledge } from './KnowledgeGraph';

const knowledgeGraph = new KnowledgeGraph();

const joke = new Knowledge({
  action : actions.tellJoke,
  stems  : ['jok'],
});

const status = new Knowledge({
  action : actions.getSystemStatus,
  stems  : ['everyth', 'serv'],
});

const memory = new Knowledge({
  action : actions.getMemoryUsage,
  stems  : ['mem'],
});
memory.addParent(status);

knowledgeGraph.add(joke);
knowledgeGraph.add(status);
knowledgeGraph.add(memory);

export default knowledgeGraph;
