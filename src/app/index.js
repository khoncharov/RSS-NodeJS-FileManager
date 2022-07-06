import readline from 'readline';
import { appData } from './data/index.js';
import { command } from './services/index.js';
import { getGoodbyeStr } from './const.js';
import { getGreetingStr } from './const.js';
import { getPromptStr } from './const.js';
import { logInputError } from './errors/index.js';
import { parseLine } from './utils/func.js';

class App {
  constructor() {
    this.appData = appData;
  }

  lineHandler = (str) => {
    const { cmdAlias, args } = parseLine(str);

    if (cmdAlias in command) {
      command[cmdAlias].excute(args);
    } else {
      logInputError();
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
