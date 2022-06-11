import os from 'os';
import readline from 'readline';
import { getInvalidInputStr } from './const.js';
import { getGoodbyeStr } from './const.js';
import { getGreetingStr } from './const.js';
import { getPromptStr } from './const.js';
import { getOperationFailedStr } from './const.js';
import { getUserName } from './utils/func.js';
import { isProvided } from './utils/func.js';
import { logInfo } from './utils/func.js';
import { logWarn } from './utils/func.js';
import { parseLine } from './utils/func.js';
import { stripDoubleQuotes } from './utils/func.js';
import { getHelpTxt } from './help/index.js';
import { cdHandler, lsHandler, upHandler } from './nav/index.js';
import { osHandler } from './os/index.js';
import { hashHandler } from './hash/index.js';

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
            this.do_up(params);
            break;
          case 'cd':
            this.do_cd(params);
            break;
          case 'ls':
            this.do_ls(params);
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
            this.do_hash(params);
            break;
          case 'compress':
            this.inputError(': Command is not implemented!');
            break;
          case 'decompress':
            this.inputError(': Command is not implemented!');
            break;
          default:
            this.inputError();
            this.readline.prompt();
            break;
        }
      })
      .on('close', () => {
        console.log(getGoodbyeStr());
        process.exit();
      });
  }

  do_exit(params) {
    isProvided(params) ? this.inputError() : this.readline.close();
    this.readline.prompt();
  }

  do_help(params) {
    isProvided(params) ? this.inputError() : console.log(getHelpTxt());
    this.readline.prompt();
  }

  do_cls(params) {
    isProvided(params) ? this.inputError() : console.clear();
    this.readline.prompt();
  }

  do_up(params) {
    if (isProvided(params)) {
      this.inputError();
    } else {
      const newPath = upHandler(this.currDir);
      this.changeCurrDir(newPath);
    }
    this.readline.prompt();
  }

  async do_cd(params) {
    const destPath = stripDoubleQuotes(params);

    if (destPath) {
      try {
        const newPath = await cdHandler(this.currDir, destPath);
        this.changeCurrDir(newPath);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_ls(params) {
    if (isProvided(params)) {
      this.inputError();
    } else {
      console.log(await lsHandler(this.currDir));
    }
    this.readline.prompt();
  }

  do_os(params) {
    const result = osHandler(params);
    result ? logInfo(result) : this.inputError();
    this.readline.prompt();
  }

  async do_hash(params) {
    const destPath = stripDoubleQuotes(params);

    if (destPath) {
      try {
        const hash = await hashHandler(this.currDir, params);
        logInfo(hash);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  inputError(msg = '') {
    logWarn(`${getInvalidInputStr()} ${msg}`);
  }

  operationFail(msg = '') {
    logWarn(`${getOperationFailedStr()} ${msg}`);
  }

  changeCurrDir(newPath) {
    this.currDir = newPath;
    this.readline.setPrompt(getPromptStr(this.currDir));
  }
}

export const app = new App();