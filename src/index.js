require('./initializer')
const FileHelper = require('./FileHelper')
const inquirer = require('./inquirer')
const exec = require('child_process').exec
const chalk = require('chalk')

const run = async () => {
  const projectName = await inquirer.initQuestions()
  console.log('initializing project', projectName, '...')

  const fullPath = projectName.name
  console.log('Full path:', fullPath)

  if (FileHelper.directoryExists(fullPath)) {
    console.log(chalk.red(`Directory ${fullPath} already exists.`))
    process.exit(0)
  }

  let execCallback = (error, stdout, stderr) => {
    if (error) console.log(chalk.red("exec error: " + error));
    if (stdout) {
      console.log(chalk.green("Result: " + stdout));

      exec('cd ' + fullPath, (e, stdo, stde) => {
        if (stdo) {
          exec('npm init -y', () => console.log(chalk.green('Completed successfully!')))
        }
      })
    }
    if (stderr) console.log(chalk.red("shell error: " + stderr));


    console.log('going into', fullPath)
    exec('cd ' + fullPath, () => {
      console.log('executing npm init...')
      exec('npm init --yes', () => {
        console.log(chalk.green('Completed successfully!'))
      })
    })

  }
  exec('mkdir ' + fullPath, execCallback)
}

run()
