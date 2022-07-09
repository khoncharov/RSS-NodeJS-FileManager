import { helpCmd } from './cmd/help.js';
import { osCmd } from './cmd/os.js';

export const commands = new Map([
  ['.help', helpCmd],
  ['os', osCmd],
]);

export const executeCommand = ({ cmdAlias, args }) => {
  if (commands.has(cmdAlias)) {
    const cmd = commands.get(cmdAlias);
    return cmd.execute(args);
  } else {
    throw new Error('INVALID_INPUT', { cause: 'Invalid command alias' });
  }
};
