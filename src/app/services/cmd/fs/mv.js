import { Cmd } from '../../basic-class.js';

export const mvCmd = new Cmd();
mvCmd.argsNum = 2;
mvCmd.executeCmd = async function (args) {
  const [pathToSrc, pathToDest] = args;
  const srcFileName = path.parse(pathToSrc).base;
  const absPathToSrc = path.resolve(this.appData.currDir, pathToSrc);
  const absPathToDest = path.resolve(this.appData.currDir, pathToDest, srcFileName);

  await fsPromise.rename(absPathToSrc, absPathToDest);
};
