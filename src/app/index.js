import os from 'os';
import readline from 'readline';
import { getInvalidInputStr } from './const.js';
import { zipOperation } from './const.js';
import { getGoodbyeStr } from './const.js';
import { getGreetingStr } from './const.js';
import { getPromptStr } from './const.js';
import { getOperationFailedStr } from './const.js';
import { getUserName } from './utils/func.js';
import { parseParams } from './utils/func.js';
import { isProvided } from './utils/func.js';
import { logInfo } from './utils/func.js';
import { logWarn } from './utils/func.js';
import { parseLine } from './utils/func.js';
import { stripDoubleQuotes } from './utils/func.js';
import { getHelpTxt } from './help/index.js';
import { cdHandler, lsHandler, upHandler } from './nav/index.js';
import { addFileHandler, catFileHandler, cpFileHandler } from './fs/index.js';
import { mvFileHandler, rmFileHandler, rnFileHandler } from './fs/index.js';
import { osHandler } from './os/index.js';
import { hashHandler } from './hash/index.js';
import { zipHandler } from './zip/index.js';

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
            this.do_cat(params);
            break;
          case 'add':
            this.do_add(params);
            break;
          case 'rn':
            this.do_rn(params);
            break;
          case 'cp':
            this.do_cp(params);
            break;
          case 'mv':
            this.do_mv(params);
            break;
          case 'rm':
            this.do_rm(params);
            break;
          case 'os':
            this.do_os(params);
            break;
          case 'hash':
            this.do_hash(params);
            break;
          case 'zip':
          case 'compress':
            this.do_compress(params);
            break;
          case 'unzip':
          case 'decompress':
            this.do_decompress(params);
            break;
          default:
            this.inputError();
            this.readline.prompt();
            break;
        }
      })
      .on('close', () => {
        console.log(getGoodbyeStr(this.username));
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

  async do_cat(params) {
    const destToFile = stripDoubleQuotes(params);

    if (destToFile) {
      try {
        await catFileHandler(this.currDir, destToFile);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_add(params) {
    const destToFile = stripDoubleQuotes(params);

    if (destToFile) {
      try {
        await addFileHandler(this.currDir, destToFile);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_rn(params) {
    const paramsArr = parseParams(params);

    if (paramsArr.length === 2) {
      try {
        await rnFileHandler(this.currDir, paramsArr);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_cp(params) {
    const paramsArr = parseParams(params);

    if (paramsArr.length === 2) {
      try {
        await cpFileHandler(this.currDir, paramsArr);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_mv(params) {
    const paramsArr = parseParams(params);

    if (paramsArr.length === 2) {
      try {
        await mvFileHandler(this.currDir, paramsArr);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_rm(params) {
    const destToFile = stripDoubleQuotes(params);

    if (destToFile) {
      try {
        await rmFileHandler(this.currDir, destToFile);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  do_os(params) {
    const result = osHandler(params);
    result ? logInfo(result) : this.inputError();
    this.readline.prompt();
  }

  async do_hash(params) {
    const destToFile = stripDoubleQuotes(params);

    if (destToFile) {
      try {
        const hash = await hashHandler(this.currDir, destToFile);
        logInfo(hash);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_compress(params) {
    const paramsArr = parseParams(params);

    if (paramsArr.length === 2) {
      try {
        await zipHandler(zipOperation.ZIP, this.currDir, paramsArr);
      } catch {
        this.operationFail();
      }
    } else {
      this.inputError();
    }

    this.readline.prompt();
  }

  async do_decompress(params) {
    const paramsArr = parseParams(params);

    if (paramsArr.length === 2) {
      try {
        await zipHandler(zipOperation.UNZIP, this.currDir, paramsArr);
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
