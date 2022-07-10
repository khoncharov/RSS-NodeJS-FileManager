import fsPromise from 'fs/promises';
import path from 'path';
import { finished } from 'stream/promises';
import { Cmd } from '../../basic-class.js';

export const catCmd = new Cmd();
catCmd.argsNum = 1;

// catCmd.executeCmd = async function (args) {
//   const pathToFile = args[0];
//   const currDir = this.appData.currDir;
//   const absPathToFile = path.resolve(currDir, pathToFile);

//   let result = `\x1b[32;1m*** File content ***\x1b[0m\n`;
//   result += await fsPromise.readFile(absPathToFile, { encoding: 'utf-8' });
//   return result;
// };

// Streaming version
catCmd.executeCmd = async function (args) {
  const pathToFile = args[0];
  const absPathToFile = path.resolve(this.appData.currDir, pathToFile);

  const fd = await fsPromise.open(absPathToFile, 'r');
  const rs = fd.createReadStream();
  const ws = process.stdout;
  ws.write(`\x1b[32;1m*** File content ***\x1b[0m\n`);
  rs.pipe(ws);
  await finished(rs);
};
