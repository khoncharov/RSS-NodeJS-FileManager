import readline from "readline";
import { getErrorStr, getGoodbyeStr, getGreetingStr, getPromptStr } from "./const.js";
import { getUserName, logWarn } from "./utils/func.js";
import { getHelpTxt } from "./help/index.js";
import { osHandler } from "./os/index.js";
import os from "os";

class App {
  constructor() {
    this.userName = "";
    this.currentDir = os.homedir();
  }

  init() {
    this.userName = getUserName(process.argv);
    console.clear();
    console.log(getGreetingStr(this.userName));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: getPromptStr(this.currentDir),
    });

    rl.prompt();

    rl.on("line", (line) => {
      const commandsArr = line.trim().split(/\ +/);
      const command = commandsArr[0];
      const params = commandsArr.slice(1);
      const paramsAdded = Boolean(params.length);

      // logWarn(`<dev> : cmd> ${command}`);
      // logWarn(`<dev> : params> ${params}`);
      // logWarn("-----------------------------\n");

      switch (command) {
        case ".exit":
          if (paramsAdded) {
            logWarn(getErrorStr());
            break;
          }
          rl.close();
          break;

        case ".help":
          if (paramsAdded) {
            logWarn(getErrorStr());
            break;
          }
          console.log(getHelpTxt());
          break;

        case ".cls":
          if (paramsAdded) {
            logWarn(getErrorStr());
            break;
          }
          console.clear();
          break;

        case "up":
          console.log(" Command is not implemented!");
          break;

        case "cd":
          console.log(" Command is not implemented!");
          break;

        case "ls":
          console.log(" Command is not implemented!");
          break;

        case "cat":
          console.log(" Command is not implemented!");
          break;

        case "add":
          console.log(" Command is not implemented!");
          break;

        case "rn":
          console.log(" Command is not implemented!");
          break;

        case "cp":
          console.log(" Command is not implemented!");
          break;

        case "mv":
          console.log(" Command is not implemented!");
          break;

        case "rm":
          console.log(" Command is not implemented!");
          break;

        case "os":
          osHandler(params);
          break;

        case "hash":
          console.log(" Command is not implemented!");
          break;

        case "compress":
          console.log(" Command is not implemented!");
          break;

        case "decompress":
          console.log(" Command is not implemented!");
          break;

        default:
          logWarn(getErrorStr());
          break;
      }
      rl.prompt();
    }).on("close", () => {
      console.log(getGoodbyeStr());
      process.exit(0);
    });
  }
}

export const app = new App();
