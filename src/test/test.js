import { parseLine, parseArgs } from '../app/utils/func.js';

console.log('Begin' + '-'.repeat(28));

// parseLine
const tCases0 = [
  [parseLine('  cd   --asd qwe 123  '), { cmdAlias: 'cd', args: '--asd qwe 123' }],
  [parseLine('  cd d   --asd qwe 123  '), { cmdAlias: 'cd', args: 'd   --asd qwe 123' }],
  [parseLine(''), { cmdAlias: '', args: '' }],
  [parseLine(' comm  '), { cmdAlias: 'comm', args: '' }],
  [parseLine(' comm  22  e '), { cmdAlias: 'comm', args: '22  e' }],
];
// console.dir(tCases0);

for (let tCase of tCases0) {
  console.assert(tCase[0].command === tCase[1].command, `parseLine: ${JSON.stringify(tCase)}`);
  console.assert(tCase[0].params === tCase[1].params, `parseLine: ${JSON.stringify(tCase)}`);
}

// parseArgs
const tCases1 = [
  [parseArgs(''), []],
  [parseArgs('"'), ['"']],
  [parseArgs('""'), ['']],
  [parseArgs('" "'), [' ']],
  [parseArgs('aaa'), ['aaa']],
  [parseArgs('"aaa"'), ['aaa']],
  [parseArgs('"aaa"   "bbb"'), ['aaa', 'bbb']],
  [parseArgs('aaa   bbb ccc3'), ['aaa', 'bbb', 'ccc3']],
  [parseArgs('"aaa"   "bbb" "ccc3"'), ['aaa', 'bbb', 'ccc3']],
];
// console.dir(tCases1);

for (let tCase of tCases1) {
  console.assert(
    JSON.stringify(tCase[0]) === JSON.stringify(tCase[1]),
    `parseArgs: ${JSON.stringify(tCase)}`,
  );
}

console.log('End' + '-'.repeat(30));
