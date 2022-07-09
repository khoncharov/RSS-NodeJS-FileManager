import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const cdCmd = new Cmd();
cdCmd.argsNum = 1;
cdCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const absPathToFile = path.resolve(this.appData.currDir, pathToFile);

  await fsPromise.readdir(absPathToFile);
  this.appData.currDir = absPathToFile;
};
