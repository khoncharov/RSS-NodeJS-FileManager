export const getHelpTxt = () => `List of operations:

- Use double quotes to enter parameters with a space.
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
  os --architecture

- Hash calculation
  hash path_to_file

- Compress and decompress operations
  compress path_to_file path_to_destination
  decompress path_to_file path_to_destination`;
