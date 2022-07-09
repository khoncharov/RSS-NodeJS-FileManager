import fsPromise from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const cpCmd = new Cmd();
cpCmd.argsNum = 2;
cpCmd.executeCmd = async function (args) {
  const [pathToSrc, pathToDest] = args;
  const srcFileName = path.parse(pathToSrc).base;
  const absPathToSrc = path.resolve(this.appData.currDir, pathToSrc);
  const absPathToDest = path.resolve(this.appData.currDir, pathToDest, srcFileName);

  const mode = fs.constants.COPYFILE_EXCL;

  await fsPromise.copyFile(absPathToSrc, absPathToDest, mode);
};
