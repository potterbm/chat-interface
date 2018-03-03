import getShell from './components/shell';
import prompt from './constants/prompt';

let shell = null;

shell = getShell(process, () => shell.prompt(prompt));

shell.prompt();
