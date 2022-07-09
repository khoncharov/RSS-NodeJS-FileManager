import readline from 'readline';
import { appData } from './data/index.js';
import { executeCommand } from './services/index.js';
import { getGoodbyeStr } from './const.js';
import { getGreetingStr } from './const.js';
import { getPromptStr } from './const.js';
import { parseLine } from './utils/func.js';
import { logInfo, logWarn } from './presentation/index.js';

class App {
  constructor() {
    this.appData = appData;
  }

  lineHandler = (str) => {
    if (str) {
      try {
        const result = executeCommand(parseLine(str));
        if (result) {
          logInfo(result);
        }
      } catch (err) {
        logWarn(`${err.message} : ${err.cause}`);
      }
    }
  };

  init = () => {
    console.clear();
    console.log(getGreetingStr(this.appData.username));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: getPromptStr(this.appData.currDir),
    });

    rl.prompt();

    rl.on('line', (line) => {
      this.lineHandler(line);
      rl.prompt();
    });

    process.on('exit', () => {
      console.log(getGoodbyeStr(this.appData.username));
    });

    this.appData.on('currDirChanged', () => {
      rl.setPrompt(this.appData.currDir);
    });
  };
}

export const app = new App();
