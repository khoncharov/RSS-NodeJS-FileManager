import fs from 'fs';
import path from 'path';
import stream from 'stream/promises';
import zlib from 'zlib';
import { Cmd } from '../../basic-class.js';

export const zipOperation = {
  UNZIP: 0,
  ZIP: 1,
};

export const zipHandler = async (operation, currDir, argsArr) => {
  const sourceFile = path.resolve(currDir, argsArr[0]);
  const destPath = path.resolve(currDir, argsArr[1]);

  try {
    let ts;
    const zipFile = operation;
    if (zipFile) {
      ts = zlib.createBrotliCompress();
    } else {
      ts = zlib.createBrotliDecompress();
    }
    await stream.pipeline(fs.createReadStream(sourceFile), ts, fs.createWriteStream(destPath));
  } catch (err) {
    throw new Error(err.message);
  }
};

export const zipCmd = new Cmd();
zipCmd.argsNum = 2;
zipCmd.executeCmd = async function (args) {
  await zipHandler(zipOperation.ZIP, this.appData.currDir, args);
  return `File zipped`;
};

export const unzipCmd = new Cmd();
unzipCmd.argsNum = 2;
unzipCmd.executeCmd = async function (args) {
  await zipHandler(zipOperation.UNZIP, this.appData.currDir, args);
  return `File unzipped`;
};
