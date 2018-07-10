require("./initializer");
const FileHelper = require("./FileHelper");
const inquirer = require("./inquirer");
const exec = require("child_process").exec;
const chalk = require("chalk");
const executor = require("./cmdExecutor");

const run = async () => {
  const projectName = await inquirer.initQuestions();
  console.log("initializing project", projectName, "...");

  const fullPath = projectName.name;
  console.log("Full path:", fullPath);

  if (FileHelper.directoryExists(fullPath)) {
    console.log(chalk.red(`Directory ${fullPath} already exists.`));
    process.exit(0);
  }

  executor
    .execPromise(`mkdir ${fullPath} && cd ${fullPath} && npm init --y`)
};

run();
