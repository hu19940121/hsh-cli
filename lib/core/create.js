const program = require('commander')

const createCommands = () => {
  program
    .command('create <project>')
}


module.exports = createCommands