export const getUserName = (args) => {
  const defaultName = "anonymous user";
  const userNameArg = args.slice(2).find((arg) => arg.startsWith("--username="));

  if (!userNameArg) {
    return defaultName;
  }

  const name = userNameArg.split("=")[1];
  const nameDefined = Boolean(name);

  if (nameDefined) {
    return name;
  }
  return defaultName;
};

export const logInfo = (str) => console.log(`\x1b[1;36m ${str}\x1b[0m`);

export const logWarn = (str) => console.log(`\x1b[1;33m ${str}\x1b[0m`);
