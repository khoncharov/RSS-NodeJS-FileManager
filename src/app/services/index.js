import { errType } from '../const.js';
import { clsCmd } from './cmd/cls.js';
import { exitCmd } from './cmd/exit.js';
import { helpCmd } from './cmd/help.js';
import { osCmd } from './cmd/os.js';

export const commands = new Map([
  ['.help', helpCmd],
  ['.cls', clsCmd],
  ['.exit', exitCmd],
  ['os', osCmd],
]);

export const executeCommand = ({ cmdAlias, args }) => {
  if (commands.has(cmdAlias)) {
    const cmd = commands.get(cmdAlias);
    return cmd.execute(args);
  } else {
    throw new Error(errType.INVALID_INPUT, { cause: 'Invalid command alias' });
  }
};
