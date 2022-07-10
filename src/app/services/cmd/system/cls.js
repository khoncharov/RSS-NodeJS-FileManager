import { Cmd } from '../../basic-class.js';

export const clsCmd = new Cmd();
clsCmd.argsNum = 0;
clsCmd.executeCmd = () => {
  console.clear();
};
