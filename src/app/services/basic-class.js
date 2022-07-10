import { errType } from '../const.js';
import { appData } from '../data/index.js';
import { parseArgs } from '../utils/func.js';

export class Cmd {
  constructor() {
    this.appData = appData;
    this.argsNum = 0;
  }

  checkArgs = (args) => {
    if (this.argsNum < 0 && this.argsNum > 2) {
      throw new Error('Invalid Cmd class implementation, wrong args number');
    } else {
      const argsArr = parseArgs(args);

      if (argsArr.length === this.argsNum) {
        return argsArr;
      }

      throw new Error(errType.INVALID_INPUT, { cause: 'Invalid args number' });
    }
  };

  execute = async (args) => {
    const argsArr = this.checkArgs(args);
    try {
      return await this.executeCmd(argsArr);
    } catch (err) {
      throw new Error(errType.OPERATION_FAILED, { cause: err.message });
    }
  };

  async executeCmd() {
    throw new Error('Command is not implemented');
  }
}
