import os from 'os';
import { Cmd } from '../basic-class.js';

export const osCmd = new Cmd();
osCmd.argsNum = 1;
osCmd.executeCmd = (args) => {
  let result = '';
  const arg = args[0];
  switch (arg) {
    case '--EOL':
      result = JSON.stringify(os.EOL);
      break;
    case '--cpus':
      const cpuInfo = os.cpus();
      result += `cpu count: ${cpuInfo.length}`;
      cpuInfo.forEach((cpu, idx) => {
        result += `\n cpu ${(idx += 1)}`;
        result += `\n - model: ${cpu.model}`;
        result += `\n - speed: ${(cpu.speed / 1000).toFixed(3)} GHz`;
      });
      break;
    case '--homedir':
      result = os.homedir();
      break;
    case '--username':
      result = process.env.USERNAME;
      break;
    case '--arch':
    case '--architecture':
      result = process.arch;
      break;
    default:
      throw new Error('INVALID_INPUT', { cause: 'Invalid agr' });
  }
  return result;
};
