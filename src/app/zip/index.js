import fs from 'fs';
import path from 'path';
import stream from 'stream/promises';
import zlib from 'zlib';

export const zipOperation = {
  UNZIP: 0,
  ZIP: 1,
};

export const zipHandler = async (operation, currDir, paramsArr) => {
  const sourceFile = path.resolve(currDir, paramsArr[0]);
  const destPath = path.resolve(currDir, paramsArr[1]);

  try {
    let ts;
    const zipFile = operation;
    if (zipFile) {
      ts = zlib.createBrotliCompress();
    } else {
      ts = zlib.createBrotliDecompress();
    }
    await stream.pipeline(fs.createReadStream(sourceFile), ts, fs.createWriteStream(destPath));
  } catch {
    throw new Error();
  }
};
