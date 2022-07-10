import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const rmCmd = new Cmd();
rmCmd.argsNum = 1;
rmCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const absPathToFile = path.resolve(this.appData.currDir, pathToFile);

  await fsPromise.rm(absPathToFile);
};
