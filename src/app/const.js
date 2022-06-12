export const getGreetingStr = (userName) =>
  `\n Welcome to the File Manager, ${userName}!\n\x1b[32m Type .help to list available commands.\x1b[0m`;

export const getPromptStr = (currentDir) =>
  `\n\x1b[32m You are currently in \x1b[0m${currentDir}\n\n> `;

export const getGoodbyeStr = (userName) => `\n Thank you for using File Manager, ${userName}!\n`;

export const getInvalidInputStr = () => 'Invalid input';

export const getOperationFailedStr = () => 'Operation failed';
