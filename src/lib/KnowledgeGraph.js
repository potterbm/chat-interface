export class Knowledge {
  constructor({ action, stems }) {
    this.parent   = null;
    this.siblings = {};
    this.children = {};

    this.action      = action;
    this.primaryStem = stems[0];
    this.stems       = stems;
  }

  addParent(p) {
    this.parent = p;
    this.siblings = Object.assign({}, p.children, this.siblings);
  }

  addSibling(k) {
    this.siblings.push(k);
  }
}

export default class KnowledgeGraph {
  constructor() {
    this.stemMapping = {};
    this.allStems = new Set([]);
    this.topLevel = [];
  }

  add(k) {
    k.stems.forEach(s => this.stemMapping[s] = k);
    if (k.parent === null) this.topLevel.push(k);
  }

  findKnowledgeForStem(stem) {
    if (this.stemMapping[stem] !== undefined) return this.stemMapping[stem];
    return null;
  }
}
