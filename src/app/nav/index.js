import fs from 'fs/promises';
import path from 'path';

export const upHandler = (currDir) => {
  const newPath = path.resolve(currDir, '..');
  return newPath;
};

export const cdHandler = async (currDir, destPath) => {
  const newDest = path.resolve(currDir, destPath);

  try {
    await fs.readdir(newDest);
  } catch {
    throw new Error();
  }

  return newDest;
};

export const lsHandler = async (currDir) => {
  const list = await fs.readdir(currDir, { withFileTypes: true });

  const dirs = [];
  const files = [];

  list.forEach((item) => {
    if (item.isDirectory()) {
      dirs.push(item.name);
    } else {
      files.push(item.name);
    }
  });

  const dirsCount = dirs.length;
  const filesCount = files.length;

  dirs.unshift(`\x1b[32m*** Directories (${dirsCount}) ***\x1b[0m`);
  files.unshift(`\x1b[32m*** Files (${filesCount}) ***\x1b[0m`);

  return [...dirs.sort(), ...files.sort()].join('\n');
};
