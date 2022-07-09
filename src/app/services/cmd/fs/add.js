import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const addCmd = new Cmd();
addCmd.argsNum = 1;
addCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const currDir = this.appData.currDir;
  const absPathToFile = path.resolve(currDir, pathToFile);

  let fd;
  try {
    fd = await fsPromise.open(absPathToFile, 'w');
  } catch (err) {
    throw new Error(err.message);
  } finally {
    await fd.close();
  }
};
