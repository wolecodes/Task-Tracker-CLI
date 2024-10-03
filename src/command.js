import * as taskFunction from "./task.js";

//creating a command line

const processs = process.argv.slice(2);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

export const command = async () => {
  if (processs.includes("add")) {
    const taskDescription = processs.slice(1).join(" ");

    console.log(taskDescription);
    if (!taskDescription) {
      console.log(
        `${colors.red}Please provide a task description.${colors.reset}`
      );
      console.log(
        `${colors.yellow}Sample: node index.js add "Drink Water"${colors.reset}`
      );
    } else {
      await taskFunction.addNewTask(taskDescription);
    }
  }
};

command();
