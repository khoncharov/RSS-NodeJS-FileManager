import readline from 'readline';
import { appData } from './data/index.js';
import { executeCommand } from './services/index.js';
import { getGoodbyeStr } from './const.js';
import { getGreetingStr } from './const.js';
import { getPromptStr } from './const.js';
import { parseLine } from './utils/func.js';
import { logWarn } from './presentation/index.js';

class App {
  constructor() {
    this.appData = appData;
  }

  lineHandler = (str) => {
    try {
      executeCommand(parseLine(str));
    } catch (error) {
      logWarn(error.message);
    }
  };

  closeHandler = () => {
    console.log(getGoodbyeStr(this.appData.username));
    process.exit();
  };

  init = () => {
    console.clear();
    console.log(getGreetingStr(this.appData.username));

    const rLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: getPromptStr(this.appData.currDir),
    });

    rLine.prompt();

    rLine.on('line', (line) => {
      this.lineHandler(line);
      rLine.prompt();
    });

    rLine.on('close', this.closeHandler);
  };
}

export const app = new App();
