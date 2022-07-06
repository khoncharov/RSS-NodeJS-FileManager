import { logWarn } from '../presentation/index.js';

const getInvalidInputStr = () => 'Invalid input';

const getOperationFailedStr = () => 'Operation failed';

const formatMsg = (str) => (str ? ` : ${str}` : '');

export const logInputError = (msg = '') => {
  logWarn(`${getInvalidInputStr()}${formatMsg(msg)}`);
};

export const logOperationFail = (msg = '') => {
  logWarn(`${getOperationFailedStr()}${formatMsg(msg)}`);
};
