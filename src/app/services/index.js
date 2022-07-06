import { logInputError } from '../errors/index.js';
import { addNewFile } from './file-system.js';

export const command = {
  // help: printHelp,
  add: addNewFile,
};

export const executeCommand = ({ cmdAlias, args }) => {
  if (cmdAlias in command) {
    command[cmdAlias].excute(args);
  } else {
    logInputError();
  }
};
