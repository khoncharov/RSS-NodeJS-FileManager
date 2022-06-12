import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';

export const catFileHandler = (currDir, params) => {};

export const addFileHandler = async (currDir, params) => {
  const pathToFile = path.resolve(currDir, params);
  // TODO: Think about existens check.
  let fd;
  try {
    fd = await fsPromise.open(pathToFile, 'w');
  } catch {
    throw new Error();
  } finally {
    await fd.close();
  }
};

export const rnFileHandler = (currDir, params) => {};

export const cpFileHandler = (currDir, params) => {};

export const mvFileHandler = (currDir, params) => {};

export const rmFileHandler = (currDir, params) => {};
