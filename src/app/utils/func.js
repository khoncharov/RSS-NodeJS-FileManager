export const getUserName = () => {
  const defaultName = 'anonymous user';
  const userNameArg = process.argv.slice(2).find((arg) => arg.startsWith('--username='));

  if (!userNameArg) {
    return defaultName;
  }

  const name = userNameArg.split('--username=')[1];
  return name ? name : defaultName;
};

export const parseLine = (str) => {
  const arr = str.trim().split(/\ +/);
  const command = arr[0];
  const params = arr.slice(1);
  return { command, params };
};

export const isProvided = (params) => !!params.length;

export const logInfo = (str) => console.log(`\x1b[1;36m ${str}\x1b[0m`);

export const logWarn = (str) => console.log(`\x1b[1;33m ${str}\x1b[0m`);
