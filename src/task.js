import { getTaskDB, saveTaskDB, inserTaskDB } from "./taskDB";
import {
  generateNextId,
  colors,
  logTaskDetails,
  filterByStatus,
} from "./utils";

// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

//add task to database
/*
 * addNewTask: this function adds a new task to the database
 * @param {string} - task
 */
export const addNewTask = async (task) => {
  //create a new task to save to the db
  const newTask = {
    id: generateNextId(task),
    description: task,
    completed: false,
    inProgress: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toDateString(),
  };

  //save task into the db.
  await inserTaskDB(newTask);

  return newTask;
};

// get all task from the db
export const getAlltask = async () => {
  const task = await getTaskDB();
  return task.description;
};

//update task in database
/*
 * updateTask: update the task in the database
 * @param {number} - id of the task
 * @param {string} - task description
 */
export const updateTask = async (id, task) => {
  const task = await getAlltask();

  //get task and find a task based on the id
  const currentTaskID = task.find((task) => task.id === +id);

  if (currentTaskID) {
    task.description = task;

    //upadate the updatedAt time in the database
    task.updatedAt = new Date().toISOString();
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
  const task = await getAlltask();

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

  if(filteredTask.length === 0){
    console.log(console.log(`${colors.yellow}No tasks found.${colors.reset}`));
  }
  filteredTask.forEach(logTaskDetails);
};
