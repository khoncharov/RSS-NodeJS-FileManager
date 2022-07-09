import fs from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const cdCmd = new Cmd();
cdCmd.argsNum = 1;
cdCmd.executeCmd = async function (args) {
  const pathStr = args[0];
  const currPath = this.appData.currDir;
  const newPath = path.resolve(currPath, pathStr);

  try {
    await fs.readdir(newPath);
    this.appData.currDir = newPath;
  } catch (err) {
    throw new Error(err.message);
  }
};
