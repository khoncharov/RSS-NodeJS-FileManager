import { noAgrsProvided } from '../errors/index.js';
import { Cmd } from './basic-class.js';

class DoHelp extends Cmd {
  execute = async (args) => {
    const isValidArgs = this.checkArgs(args);

    if (isValidArgs) {
      return HELP_TEXT;
    } else {
      return Err;
    }
  };
}

const HELP_TEXT = `List of operations:

- Use double quotes to enter 2 paths where at least one with a space.
- .exit .help .cls

- Navigation & working directory
  up
  cd path_to_directory
  ls

- Basic operations with files
  cat path_to_file
  add new_file_name
  rn path_to_file new_filename
  cp path_to_file path_to_new_directory
  mv path_to_file path_to_new_directory
  rm path_to_file

- Operating system info
  os --EOL
  os --cpus
  os --homedir
  os --username
  os --architecture (shortcut: --arch)

- Hash calculation
  hash path_to_file

- Compress and decompress operations
  compress path_to_file path_to_destination  (shortcut: zip)
  decompress path_to_file path_to_destination  (shortcut: unzip)`;

export const getHelp = new DoHelp();