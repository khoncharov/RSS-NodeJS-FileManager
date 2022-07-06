import { appData } from '../data/index.js';

export class Cmd {
  constructor() {
    this.appData = appData;
  }

  execute() {
    throw new Error('Command is not implemented.');
  }
}
