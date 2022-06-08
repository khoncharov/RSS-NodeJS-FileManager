import readline from "readline";
import { getErrorStr, getGoodbyeStr, getGreetingStr } from "./const.js";
import { getUserName } from "./utils/func.js";
import { getHelpTxt } from "./help/index.js";

class App {
  constructor() {
    this.userName = "";
  }

  init() {
    this.userName = getUserName(process.argv);
    console.clear();
    console.log(getGreetingStr(this.userName));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
    });

    rl.prompt();

    rl.on("line", (line) => {
      const command = line.trim();

      switch (command) {
        case ".exit":
          rl.close();
          break;

        case ".help":
          console.log(getHelpTxt());
          break;

        case "":
          console.log();
          console.log(" Command is not implemented!\n");
          break;

        default:
          console.error(getErrorStr());
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
