import * as taskFunction from "./task.js";
import { colors, log } from "./utils.js";

//creating a command

const args = process.argv.slice(2);
const id = args[1];
export const command = async () => {
  if (args.includes("add")) {
    const taskDescription = args.slice(1).join(" ");
    if (!taskDescription) {
      console.log(
        `${colors.red}Please provide a task description.${colors.reset}`
      );
      console.log(
        `${colors.yellow}Sample: task-cli  add "Drink Water"${colors.reset}`
      );
    } else {
      await taskFunction.addNewTask(taskDescription);
    }
  } else if (args.includes("list")) {
    const status = args[1];
    await taskFunction.listTask(status);
  } else if (args.includes("update")) {
    const newTaskDescription = args.slice(2).join(" ");
    if (!id || !newTaskDescription) {
      console.log(
        `${colors.red}Please provide a task ID and new description.${colors.reset}`
      );
      console.log(
        `${colors.yellow}Sample: task-cli update 1 "Updated task description"${colors.reset}`
      );
    } else {
      await taskFunction.updateTask(id, newTaskDescription);
    }
  } else if (args.includes("delete")) {
    if (!id) {
      console.log(`${colors.red} Please provide a task ID. ${colors.reset}`);
      console.log(`${colors.yellow}Sample: task-cli  delete 1.${colors.reset}`);
    } else {
      await taskFunction.deleteTask(id);
    }
  } else if (args.includes("mark-done")) {
    if (!id) {
      console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
    } else {
      await taskFunction.markDone(id);
    }
  } else if (args.includes("in-progress")) {
    if (!id) {
      console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
    } else {
      await taskFunction.inProgress(id);
    }
  } else {
    log();
  }
};

command();
