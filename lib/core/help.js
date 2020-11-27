const program = require('commander')


const helpOptions =()=>{
    //增加自己的options
  // program.option('-n, --pageName <pageName>', 'add new page , 例如：-n pageName')

  program.on('--help',function() {
    // console.log('other options');
  })
}

module.exports  = helpOptions