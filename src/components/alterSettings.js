import displayMessage from './displayMessage';
import promptChar     from '../constants/prompt';
import settings       from '../constants/settings';
import shell          from './shell';

export default (input) => {
  if (input === 'set mode') {
    settings.set('mode', 'admin');
    shell().setPrompt(promptChar());
    displayMessage('Admin recognized. Welcome.');
    return;
  }

  if (input === 'settings') {
    displayMessage('settings: ', settings.values);
    return;
  }

  if (input === 'done') {
    settings.set('mode', 'normal');
    shell().setPrompt(promptChar());
    displayMessage('Admin mode: offline.');
    return;
  }

  const assignmentInput = input.split('=');

  if (assignmentInput.length !== 2) return;

  let newValue = assignmentInput[1].trim();

  try {
    newValue = JSON.parse(newValue);
  } catch (error) {
    // Do nothing
  }

  settings.set(assignmentInput[0].trim(), newValue);
};
