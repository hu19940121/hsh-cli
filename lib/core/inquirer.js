const inquirer = require('inquirer');

const confirmInquirer = (message) => {
  return new Promise((resolve,reject)=>{
    inquirer
    .prompt([
      {
        name: 'value',
        type: 'confirm',
        message
      }

    ])
    .then(answers => {
      // console.log(answers);
      resolve(answers.value)

  
      // Use user feedback for... whatever!!
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
  })

}

module.exports = {
  confirmInquirer
}