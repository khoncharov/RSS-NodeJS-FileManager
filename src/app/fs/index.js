import fsPromise from 'fs/promises';
import path from 'path';

export const catFileHandler = async (currDir, params) => {
  const pathToFile = path.resolve(currDir, params);

  try {
    const content = await fsPromise.readFile(pathToFile, { encoding: 'utf-8' });
    console.log(`\x1b[32m*** File content ***\x1b[0m`);
    console.log(content);
  } catch {
    throw new Error();
  }
};

export const addFileHandler = async (currDir, params) => {
  const pathToFile = path.resolve(currDir, params);

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

export const rmFileHandler = async (currDir, params) => {
  const pathToFile = path.resolve(currDir, params);

  let fd;
  try {
    fd = await fsPromise.open(pathToFile, 'r');
    await fd.close();
    await fsPromise.rm(pathToFile);
  } catch {
    throw new Error();
  } finally {
  }
};
