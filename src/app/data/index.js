import os from 'os';
import { getUserName } from '../utils/func.js';

class AppData {
  constructor() {
    this._username = getUserName();
    this._currDir = os.homedir();
  }

  get username() {
    return this._username;
  }

  get currDir() {
    return this._currDir;
  }

  set currDir(value) {
    this._currDir = value;
  }
}

export const appData = new AppData();
