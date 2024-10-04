import * as taskFunction from "./task.js";

//creating a command line

const args = process.argv.slice(2);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

export const command = async () => {
  if (args.includes("add")) {
    const taskDescription = args.slice(1).join(" ");
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
  } else if (args.includes("list")) {
    const status = args[1];
    await taskFunction.listTask(status);
  } else if (args.includes("update")) {
    const newTaskDescription = args.slice(2).join(" ");
    const id = args[0];
    if (!id || !newTaskDescription) {
      console.log(
        `${colors.red}Please provide a task ID and new description.${colors.reset}`
      );
      console.log(
        `${colors.yellow}Sample: node index.js update 1 "Updated task description"${colors.reset}`
      );
    } else {
      await taskFunction.updateTask(id, newTaskDescription);
    }
  } else if (args.includes("delete")) {
    const id = args[1];
    console.log(id);
    if (!id) {
      console.log(`${colors.red} Please provide a task ID. ${colors.reset}`);
      console.log(
        `${colors.yellow}Sample: node index.js delete 1.${colors.reset}`
      );
    } else {
      await taskFunction.deleteTask(id);
    }
  }
};

command();
