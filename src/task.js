import { getTaskDB, saveTaskDB, inserTaskDB } from "./taskDB.js";
import {
  generateNextId,
  colors,
  logTaskDetails,
  filterByStatus,
} from "./utils.js";

// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

// get all task from the db

const getAlltask = async () => {
  const task = await getTaskDB();
  return task.description;
};
//add task to database
/*
 * addNewTask: this function adds a new task to the database
 * @param {string} - task
 */
export const addNewTask = async (description) => {
  const tasks = await getTaskDB();
  //create a new task
  const newTask = {
    id: generateNextId(tasks),
    description: description,
    completed: false,
    inProgress: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toDateString(),
  };
  tasks.push(newTask);
  //save task into the db.
  await inserTaskDB(newTask);
  console.log(
    `${colors.green}Task added successfully! (ID: ${newTask.id})${colors.reset}`
  );
  return newTask;
};

//update task in database
/*
 * updateTask: update the task in the database
 * @param {number} - id of the task
 * @param {string} - task description
 */
export const updateTask = async (id, task) => {
  const tasks = await getTaskDB();

  //get task and find a task based on the id
  const currentTaskID = tasks.find((task) => task.id === +id);

  if (currentTaskID) {
    tasks.description = task;

    //upadate the updatedAt time in the database
    tasks.updatedAt = new Date().toISOString();
    //save the updated task in the database
    await saveTaskDB(task);
    console.log(`${colors.green}Task with ID ${id} updated.${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
};

//delete task from database
/*
 * deleteTask: delete the task from the database
 * @param {number} - id of the task
 */

export const deleteTask = async (id) => {
  const task = await getTaskDB();

  //filtered the task the task that are not of the same to the id
  let filteredTask = task.filter((task) => task.id !== +id);

  //check if the task was removed
  if (filteredTask.length > task.length) {
    //save the task
    await saveTaskDB(filteredTask);
    console.log(`${colors.green} Task ID ${id} deleted.${colors.reset}`);
    //if task not found
    console.log(`${colors.red} Task ID ${id} not found.${colors.reset}`);
  }
};

//list task

export const listTask = async (status) => {
  const task = await getAlltask();
  let filteredTask = task;
  if (status) {
    filteredTask = filterByStatus(task, status);

    if (!filteredTask) {
      console.log(
        `${colors.red}Invalid status. Use 'done', 'to-do', or 'in-progress'.${colors.reset}`
      );
      return;
    }
  }

  if (filteredTask.length === 0) {
    console.log(console.log(`${colors.yellow}No tasks found.${colors.reset}`));
  }
  filteredTask.forEach(logTaskDetails);
};

//list task in-progress

export const inProgress = async (id) => {
  const tasks = await getAlltask();
  const task = tasks.find((task) => task.id === +id);

  if (task) {
    task.inProgress = true;
    task.completed = false;
    await saveTaskDB(task);
    console.log(
      `${colors.yellow}Task ID ${id} marked as in-progress.${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
};

//list mark task as done
export const markDone = async (id) => {
  const tasks = await getAlltask();
  const task = tasks.find((task) => task.id === +id);

  if (task) {
    task.completed = true;
    task.inProgress = false;
    await saveTaskDB(task);
    console.log(`${colors.green}Task ID ${id} marked as done.${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
};
