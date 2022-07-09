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
      const result = executeCommand(parseLine(str));
      console.log(result);
    } catch (err) {
      logWarn(`${err.message} : ${err.cause}`);
    }
  };

  closeHandler = () => {
    console.log(getGoodbyeStr(this.appData.username));
    process.exit();
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

    rl.on('close', this.closeHandler);

    this.appData.on('currDirChanged', () => {
      rl.setPrompt(this.appData.currDir);
    });
  };
}

export const app = new App();
