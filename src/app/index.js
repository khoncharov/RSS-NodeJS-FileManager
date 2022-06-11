import os from 'os';
import readline from 'readline';
import {
  getInvalidInputStr,
  getGoodbyeStr,
  getGreetingStr,
  getPromptStr,
  getOperationFailedStr,
} from './const.js';
import { getUserName, isProvided, logInfo, logWarn, parseLine } from './utils/func.js';
import { getHelpTxt } from './help/index.js';
import { osHandler } from './os/index.js';

class App {
  constructor() {
    this.username = '';
    this.currDir = os.homedir();
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: getPromptStr(this.currDir),
    });
  }

  init() {
    console.clear();
    this.username = getUserName();
    console.log(getGreetingStr(this.username));

    this.readline.prompt();

    this.readline
      .on('line', (str) => {
        const { command, params } = parseLine(str);

        switch (command) {
          case '.exit':
            this.do_exit(params);
            break;

          case '.help':
            this.do_help(params);
            break;

          case '.cls':
            this.do_cls(params);
            break;

          case 'up':
            this.inputError(': Command is not implemented!');
            break;

          case 'cd':
            this.inputError(': Command is not implemented!');
            break;

          case 'ls':
            this.inputError(': Command is not implemented!');
            break;

          case 'cat':
            this.inputError(': Command is not implemented!');
            break;

          case 'add':
            this.inputError(': Command is not implemented!');
            break;

          case 'rn':
            this.inputError(': Command is not implemented!');
            break;

          case 'cp':
            this.inputError(': Command is not implemented!');
            break;

          case 'mv':
            this.inputError(': Command is not implemented!');
            break;

          case 'rm':
            this.inputError(': Command is not implemented!');
            break;

          case 'os':
            this.do_os(params);
            break;

          case 'hash':
            this.inputError(': Command is not implemented!');
            break;

          case 'compress':
            this.inputError(': Command is not implemented!');
            break;

          case 'decompress':
            this.inputError(': Command is not implemented!');
            break;

          default:
            this.inputError();
            break;
        }

        this.readline.prompt();
      })
      .on('close', () => {
        console.log(getGoodbyeStr());
        process.exit();
      });
  }

  do_exit(params) {
    isProvided(params) ? this.inputError() : this.readline.close();
  }

  do_help(params) {
    isProvided(params) ? this.inputError() : console.log(getHelpTxt());
  }

  do_cls(params) {
    isProvided(params) ? this.inputError() : console.clear();
  }

  do_os(params) {
    const result = osHandler(params);
    result ? logInfo(result) : this.inputError();
  }

  inputError(msg = '') {
    logWarn(`${getInvalidInputStr()} ${msg}`);
  }

  operationError(msg = '') {
    logWarn(`${getOperationFailedStr()} ${msg}`);
  }
}

export const app = new App();
