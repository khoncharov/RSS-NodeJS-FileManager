import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'path';

export const isExistingPath = async (path) => {
  try {
    const fd = await fsPromise.open(path, 'r');
    await fd.close();
    return true;
  } catch {
    return false;
  }
};

/** Print file content function
 *
 * @param {string} currDir
 * @param {string} params
 */
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

/** Create new file function
 *
 * @param {string} currDir
 * @param {string} params
 */
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

/** Rename file/dir function
 *
 * @param {string} currDir
 * @param {string[]} paramsArr
 */
export const rnFileHandler = async (currDir, paramsArr) => {
  const pathToFile = path.resolve(currDir, paramsArr[0]);

  const newFileName = paramsArr[1];
  const pathToNewFile = path.resolve(pathToFile, '..', newFileName);

  try {
    if (await isExistingPath(pathToFile)) {
      await fsPromise.rename(pathToFile, pathToNewFile);
    } else {
      throw new Error();
    }
  } catch {
    throw new Error();
  }
};

/** Copy file function
 *
 * @param {string} currDir
 * @param {string[]} paramsArr
 */
export const cpFileHandler = async (currDir, paramsArr) => {
  const pathToSource = path.resolve(currDir, paramsArr[0]);
  const sourceName = path.parse(pathToSource).base;
  const pathToDest = path.resolve(currDir, paramsArr[1], sourceName);

  const mode = fs.constants.COPYFILE_EXCL;

  try {
    if (await isExistingPath(pathToSource)) {
      await fsPromise.copyFile(pathToSource, pathToDest, mode);
    } else {
      throw new Error();
    }
  } catch {
    throw new Error();
  }
};

/** Move file function
 *
 * @param {string} currDir
 * @param {string[]} paramsArr
 */
export const mvFileHandler = async (currDir, paramsArr) => {
  const fileToMove = path.resolve(currDir, paramsArr[0]);

  // const newFileName = paramsArr[1];
  // const pathToNewFile = path.resolve(pathToFile, '..', newFileName);

  // try {
  //   if (await isExistingPath(pathToFile)) {
  //     await fsPromise.rename(pathToFile, pathToNewFile);
  //   } else {
  //     throw new Error();
  //   }
  // } catch {
  //   throw new Error();
  // }
};

/** Remove file function
 *
 * @param {string} currDir
 * @param {string} params
 */
export const rmFileHandler = async (currDir, params) => {
  const pathToFile = path.resolve(currDir, params);

  try {
    if (await isExistingPath(pathToFile)) {
      await fsPromise.rm(pathToFile);
    } else {
      throw new Error();
    }
  } catch {
    throw new Error();
  }
};
