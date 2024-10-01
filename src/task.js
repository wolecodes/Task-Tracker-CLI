import { getTaskDB, saveTaskDB, inserTaskDB } from "./taskDB";
import { generateNextId, colors } from "./utils";
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
  const newTask = {
    id: generateNextId(task),
    description: task,
    completed: false,
    inProgress: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toDateString(),
  };

  await inserTaskDB(newTask);

  return newTask;
};

// get all task from the database
export const getAlltask = async () => {
  const task = await getTaskDB();
  return task.description;
};

//update task in database
/*
 * updateTask: update the task in the database
 * @param {number} - id of the task
 * @param {string} - currnet task description
 */
export const updateTask = async (id, task) => {
  const task = await getAlltask();
  const currentTaskID = task.find((task) => task.id === +id);

  if (currentTaskID) {
    task.description = task;
    task.updatedAt = new Date().toISOString();
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
  let filteredTask = task.filter((task) => task.id !== +id);
};
