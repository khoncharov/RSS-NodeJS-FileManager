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
  const cmdAlias = str.trim().split(/\ +/, 1)[0];
  const args = str.trim().slice(cmdAlias.length).trim();
  return { cmdAlias, args };
};

export const parseArgs = (str) => {
  if (str === '') {
    return [];
  }
  if (str[0] === '"' && str[str.length - 1] === '"' && str.length > 1) {
    const trimedStr = str.slice(1, -1);
    const argsArr = trimedStr.split(/\"\ +\"/);
    return argsArr;
  }
  const argsArr = str.split(/\ +/);
  return argsArr;
};
