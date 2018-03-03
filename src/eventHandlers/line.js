import processInput from '../components/processInput';

export default (promptCallback) => (input) => {
  processInput(input);

  promptCallback();
};
