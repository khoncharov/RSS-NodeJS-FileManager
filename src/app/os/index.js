import os from 'os';

export const osHandler = (param) => {
  switch (param) {
    case '--EOL':
      console.dir(os.EOL);
      return 'lf';

    case '--cpus':
      let result = '';

      const cpuInfo = os.cpus();

      result += `cpu count: ${cpuInfo.length}`;

      cpuInfo.forEach((cpu, idx) => {
        result += `\n cpu ${(idx += 1)}`;
        result += `\n - model: ${cpu.model}`;
        result += `\n - speed: ${(cpu.speed / 1000).toFixed(3)} GHz`;
      });

      return result;

    case '--homedir':
      return os.homedir();

    case '--username':
      return process.env.USERNAME;

    case '--arch':
    case '--architecture':
      return process.arch;

    default:
      return null;
  }
};
