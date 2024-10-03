//this file contains operations to get, save and insert tasks in the database
import fs from "fs/promises";

const DB_path = new URL("../task.json", import.meta.url).pathname;
console.log(DB_path);

//get task from database

/*
 * getTaskDB: this function reads the task from the database
 * @returns {Promise} - returns the task from the database
 */
export const getTaskDB = async () => {
  try {
    const task = await fs.readFile(DB_path, "utf-8");
    return JSON.parse(task);
  } catch (error) {
    return [];
  }
};

//add task to database
/*
 * saveTaskDB: this function writes the task to the database
 * @returns {Promise} - returns the task to the database
 */
export const saveTaskDB = async (db) => {
  await fs.writeFile(DB_path, JSON.stringify(db, null, 2));
  return db;
};

//insert file in the database
/*
 * inserTaskDB: this function inserts the task to the database
 * @returns {obj} - returns the inserted task to the database
 */
export const inserTaskDB = async (task) => {
  try {
    const taskDB = await getTaskDB();
    taskDB.push(task);
    await saveTaskDB(taskDB);
    return task;
  } catch (error) {
    console.log("Error saving task");
  }
};
