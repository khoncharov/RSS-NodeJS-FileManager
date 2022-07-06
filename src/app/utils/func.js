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

export const stripDoubleQuotes = (str) => {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1);
  }
  return str;
};

export const parseParams = (str) => {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    const trimedStr = str.slice(1, -1);
    const paramsArr = trimedStr.split(/\"\ +\"/);
    return paramsArr;
  }

  const paramsArr = str.split(/\ +/);
  return paramsArr;
};

// export const isProvided = (params) => !!params.length;

// export const

// export const oneArgProvided = (args) => Boolean(args);

// export const twoArgsProvided = (args) => Boolean(args);
