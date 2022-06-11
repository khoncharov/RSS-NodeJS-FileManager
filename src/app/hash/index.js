import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export const hashHandler = async (currDir, destPath) => {
  const filePath = path.resolve(currDir, destPath);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    return hash;
  } catch {
    throw new Error();
  }
};
