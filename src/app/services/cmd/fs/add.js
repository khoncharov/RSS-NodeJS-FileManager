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
    console.log(`\x1b[32;1m*** File content ***\x1b[0m`);
    console.log(content);
  } catch {
    throw new Error();
  }
};
