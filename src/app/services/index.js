import { errType } from '../const.js';
import { helpCmd } from './cmd/system/help.js';
import { clsCmd } from './cmd/system/cls.js';
import { exitCmd } from './cmd/system/exit.js';
import { osCmd } from './cmd/os/os.js';
import { cdCmd } from './cmd/nav/cd.js';
import { upCmd } from './cmd/nav/up.js';
import { lsCmd } from './cmd/nav/ls.js';
import { hashCmd } from './cmd/hash/hash.js';
import { unzipCmd, zipCmd } from './cmd/zip/zip.js';
import { catCmd } from './cmd/fs/cat.js';
import { addCmd } from './cmd/fs/add.js';
import { rmCmd } from './cmd/fs/rm.js';
import { cpCmd } from './cmd/fs/cp.js';
import { mvCmd } from './cmd/fs/mv.js';
import { rnCmd } from './cmd/fs/rn.js';

const system = [
  ['.help', helpCmd],
  ['.cls', clsCmd],
  ['.exit', exitCmd],
];

const fs = [
  ['add', addCmd],
  ['cat', catCmd],
  ['cp', cpCmd],
  ['mv', mvCmd],
  ['rm', rmCmd],
  ['rn', rnCmd],
];

const navigation = [
  ['cd', cdCmd],
  ['up', upCmd],
  ['ls', lsCmd],
];

const zip = [
  ['zip', zipCmd],
  ['unzip', unzipCmd],
  ['compress', zipCmd],
  ['decompress', unzipCmd],
];

export const commands = new Map([
  ...system,
  ...fs,
  ...navigation,
  ...zip,
  ['os', osCmd],
  ['hash', hashCmd],
]);

export const executeCommand = async ({ cmdAlias, args }) => {
  if (commands.has(cmdAlias)) {
    const cmd = commands.get(cmdAlias);
    return await cmd.execute(args);
  } else {
    throw new Error(errType.INVALID_INPUT, { cause: 'Invalid command alias' });
  }
};
