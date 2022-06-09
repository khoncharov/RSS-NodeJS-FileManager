export const getGreetingStr = (userName) =>
  `\n Welcome to the File Manager, ${userName}!\n\x1b[32m Type .help to list available commands.\x1b[0m`;

export const getGoodbyeStr = () => "\n Have a great day!\n";

export const getErrorStr = () => "Invalid input";

export const getFailedStateStr = () => "Operation failed";
