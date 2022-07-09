import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { Cmd } from '../../basic-class.js';

export const hashCmd = new Cmd();
hashCmd.argsNum = 1;
hashCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const absPathToFile = path.resolve(this.appData.currDir, pathToFile);

  const content = await fs.readFile(absPathToFile, 'utf-8');
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  return hash;
};
