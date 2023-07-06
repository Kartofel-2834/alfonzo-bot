function getCommandTarget(command, delimiter) {
  return command.slice(command.indexOf(delimiter) + delimiter.length).trim();
}

module.exports = getCommandTarget;
