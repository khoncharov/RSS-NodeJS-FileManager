import fs from 'fs/promises';
import { Cmd } from '../../basic-class.js';

export const lsCmd = new Cmd();
lsCmd.argsNum = 0;
lsCmd.executeCmd = async function () {
  const list = await fs.readdir(this.appData.currDir, { withFileTypes: true });

  const dirs = [];
  const files = [];

  list.forEach((item) => {
    if (item.isDirectory()) {
      dirs.push(item.name);
    } else {
      files.push(item.name);
    }
  });

  const dirsCount = dirs.length;
  const filesCount = files.length;

  dirs.unshift(`\x1b[32;1m*** Directories (${dirsCount}) ***\x1b[0m`);
  files.unshift(`\x1b[32;1m*** Files (${filesCount}) ***\x1b[0m`);

  return [...dirs.sort(), ...files.sort()].join('\n');
};
