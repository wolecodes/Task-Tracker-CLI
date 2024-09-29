import { getTaskDB, saveTaskDB, inserTaskDB } from "./taskDB";
import { generateNextId } from "./utils";
// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

//add task to database

const addNewTask = async (task) => {
  const newTask = {
    id: generateNextId(task),
    description: [],
    completed: false,
    inProgress: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toDateString(),
  };

  await inserTaskDB(newTask);

  return newTask;
};
