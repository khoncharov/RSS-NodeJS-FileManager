import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const rnCmd = new Cmd();
rnCmd.argsNum = 2;
rnCmd.executeCmd = async function (args) {
  const [pathToSrc, newFileName] = args;
  const srcFileName = path.parse(pathToSrc).base;
  const absPathToSrc = path.resolve(this.appData.currDir, pathToSrc);
  const absPathToDest = path.resolve(absPathToSrc, '..', srcFileName);

  await fsPromise.rename(absPathToFile, absPathToDest);
};
