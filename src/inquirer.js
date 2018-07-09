const inquirer = require('inquirer')
const FileHeloer = require('./FileHelper')

module.exports = {
  initQuestions: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Enter project name:',
        validate: function(value) {
          if (value.length < 3) {
            return 'Project name should be at least 3 characters long.'
          } else {
            return true
          }
        }
      }
    ]

    return inquirer.prompt(questions)
  }
}