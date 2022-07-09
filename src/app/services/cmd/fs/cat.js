import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const catCmd = new Cmd();
catCmd.argsNum = 1;
catCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const currDir = this.appData.currDir;
  const absPathToFile = path.resolve(currDir, pathToFile);

  let result = `\x1b[32;1m*** File content ***\x1b[0m\n`;
  try {
    result += await fsPromise.readFile(absPathToFile, { encoding: 'utf-8' });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
