import { logWarn } from '../presentation/index.js';

const formatMsg = (str) => (str ? ` : ${str}` : '');

// export const logInputError = (msg = '') => {
//   logWarn(`Invalid input${formatMsg(msg)}`);
// };

// export const logOperationFail = (msg = '') => {
//   logWarn(`Operation failed${formatMsg(msg)}`);
// };

export const ivalidInputError = (info) => {
  return new Error(`Invalid input${formatMsg(info)}`);
};

export const operationFailedError = (info) => {
  return new Error(`Operation failed${formatMsg(info)}`);
};
