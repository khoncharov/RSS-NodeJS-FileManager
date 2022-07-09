import { Cmd } from '../../basic-class.js';

export const exitCmd = new Cmd();
exitCmd.argsNum = 0;
exitCmd.executeCmd = () => {
  process.exit();
};
