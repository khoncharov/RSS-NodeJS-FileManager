import { appData } from '../data/index.js';

export class Cmd {
  constructor() {
    this.appData = appData;
  }

  execute() {
    throw new Error('Command is not implemented.');
  }
}

export class OneArgCmd extends Cmd {
  noArgsProvided(args) {
    return Boolean(args);
  }

  execute() {
    throw new Error('Command is not implemented.');
  }
}
