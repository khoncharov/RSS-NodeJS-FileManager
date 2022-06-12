import fs from 'fs';
import path from 'path';
import stream from 'stream/promises';
import zlib from 'zlib';

export const zipFile = async (currDir, paramsArr) => {
  const sourceFile = path.resolve(currDir, paramsArr[0]);
  const destPath = path.resolve(currDir, paramsArr[1]);

  try {
    await stream.pipeline(
      fs.createReadStream(sourceFile),
      zlib.createBrotliCompress(),
      fs.createWriteStream(destPath),
    );
  } catch (err) {
    console.error(err);
  }
};

export const unzipFile = async (currDir, paramsArr) => {
  const sourceFile = path.resolve(currDir, paramsArr[0]);
  const destPath = path.resolve(currDir, paramsArr[1]);

  await stream.pipeline(
    fs.createReadStream(sourceFile),
    zlib.createBrotliDecompress(),
    fs.createWriteStream(destPath),
  );
};
