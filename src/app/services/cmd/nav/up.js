import path from 'path';
import { Cmd } from '../../basic-class.js';

export const upCmd = new Cmd();
upCmd.argsNum = 0;
upCmd.executeCmd = function () {
  const currPath = this.appData.currDir;
  const newPath = path.resolve(currPath, '..');
  this.appData.currDir = newPath;
};
