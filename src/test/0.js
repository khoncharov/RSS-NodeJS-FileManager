import { parseLine, stripDoubleQuotes } from '../app/utils/func.js';

console.log('Begin' + '-'.repeat(28));

// stripDoubleQuotes
const tCases1 = [
  [stripDoubleQuotes('""'), ''],
  [stripDoubleQuotes('"asd"'), 'asd'],
  [stripDoubleQuotes('"asd'), '"asd'],
  [stripDoubleQuotes('asd"'), 'asd"'],
  [stripDoubleQuotes('as"d"'), 'as"d"'],
];

for (let tCase of tCases1) {
  console.assert(tCase[0] === tCase[1], `stripDoubleQuotes: ${JSON.stringify(tCase)}`);
}

// parseLine
const tCases2 = [
  [parseLine('  cd   --asd qwe 123  '), { command: 'cd', params: '--asd qwe 123' }],
  [parseLine('  cd d   --asd qwe 123  '), { command: 'cd', params: 'd   --asd qwe 123' }],
  [parseLine(''), { command: '', params: '' }],
  [parseLine(' comm  '), { command: 'comm', params: '' }],
  [parseLine(' comm  22  e '), { command: 'comm', params: '22  e' }],
];

for (let tCase of tCases2) {
  console.assert(tCase[0].command === tCase[1].command, `parseLine: ${JSON.stringify(tCase)}`);
  console.assert(tCase[0].params === tCase[1].params, `parseLine: ${JSON.stringify(tCase)}`);
}

console.log('End' + '-'.repeat(30));
