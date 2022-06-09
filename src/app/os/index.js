import os from "os";
import { getErrorStr } from "../const.js";
import { logInfo, logWarn } from "../utils/func.js";

export const osHandler = (params) => {
  const paramsCount = params.length;
  const param = params[0];

  if (paramsCount === 1) {
    switch (param) {
      case "--EOL":
        console.dir(os.EOL);
        logInfo(String(os.EOL).replace(/\\/g, "\\\\"));
        break;

      case "--cpus":
        const cpuInfo = os.cpus();

        logInfo(`cpu count: ${cpuInfo.length}`);
        cpuInfo.forEach((cpu, idx) => {
          logInfo(`cpu ${(idx += 1)}`);
          logInfo(`- model: ${cpu.model}`);
          logInfo(`- speed: ${(cpu.speed / 1000).toFixed(3)} GHz`);
        });
        break;

      case "--homedir":
        logInfo(os.homedir());
        break;

      case "--username":
        logInfo(process.env.USERNAME);
        break;

      case "--arch":
      case "--architecture":
        logInfo(process.arch);
        break;

      default:
        logWarn(getErrorStr());
        break;
    }
  } else {
    logWarn(getErrorStr());
  }
};
