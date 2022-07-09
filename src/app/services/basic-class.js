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

      throw new Error('INVALID_INPUT', { cause: 'Invalid args number' });
    }
  };

  catchOperationFail = (func, args) => {
    try {
      func(args);
    } catch (err) {
      throw new Error('OPERATION_FAILED', { cause: err.message });
    }
  };

  execute = (args) => {
    let result;
    const argsArr = this.checkArgs(args);
    this.catchOperationFail(() => {
      result = this.executeCmd(argsArr);
    });
    return result;
  };

  executeCmd = () => {
    throw new Error('OPERATION_FAILED', { cause: 'Command is not implemented' });
  };
}
