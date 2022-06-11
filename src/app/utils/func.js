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
  const command = str.trim().split(/\ +/, 1)[0];
  const params = str.trim().slice(command.length).trim();

  // console.log('::: com>');
  // console.dir(command);
  // console.log('::: par>');
  // console.dir(params);

  return { command, params };
};

export const stripDoubleQuotes = (str) => {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1);
  }
  return str;
};

export const isProvided = (params) => !!params.length;

export const logInfo = (str) => console.log(`\x1b[1;36m ${str}\x1b[0m`);

export const logWarn = (str) => console.log(`\x1b[1;33m ${str}\x1b[0m`);
