import getShell   from './components/shell';

let shell = null;

shell = getShell(() => shell.prompt());

shell.prompt();
