import { errType } from '../const.js';
import { helpCmd } from './cmd/basic/help.js';
import { clsCmd } from './cmd/basic/cls.js';
import { exitCmd } from './cmd/basic/exit.js';
import { osCmd } from './cmd/os/os.js';
import { cdCmd } from './cmd/nav/cd.js';
import { upCmd } from './cmd/nav/up.js';
import { lsCmd } from './cmd/nav/ls.js';
import { hashCmd } from './cmd/hash/hash.js';

const basic = [
  ['.help', helpCmd],
  ['.cls', clsCmd],
  ['.exit', exitCmd],
];

const navigation = [
  ['cd', cdCmd],
  ['up', upCmd],
  ['ls', lsCmd],
];

export const commands = new Map([...basic, ...navigation, ['os', osCmd], ['hash', hashCmd]]);

export const executeCommand = async ({ cmdAlias, args }) => {
  if (commands.has(cmdAlias)) {
    const cmd = commands.get(cmdAlias);
    return await cmd.execute(args);
  } else {
    throw new Error(errType.INVALID_INPUT, { cause: 'Invalid command alias' });
  }
};
