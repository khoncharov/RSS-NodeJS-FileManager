import fs from 'fs/promises';
import { Cmd } from './basic-class.js';

class DoAdd extends Cmd {
  execute = async (args) => {
    const pathToFile = path.resolve(this.appData.homeDir, args);

    let fd;
    try {
      fd = await fs.open(pathToFile, 'w');
    } catch {
      throw new Error();
    } finally {
      await fd.close();
    }
  };
}

export const addNewFile = new DoAdd();
