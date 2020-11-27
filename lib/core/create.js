const program = require('commander')
const { createProjectAction,addPageAction } = require('./action')
const createCommands = () => {
  program
    .command('create <project>')
    .description('clone template into a folder')
    .action(createProjectAction)
  program
  .command('addpage <name>')
  .description('add a page, 例如： hsh add example -d pages')
  .action(addPageAction)
}


module.exports = createCommands