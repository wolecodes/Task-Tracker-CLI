//generate next id for task

//color output
export const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

/*
 * generateNextId : this function generates the next id for the task
 * @param {Array} - task
 * @returns {number} - returns the next id for the task
 */
export const generateNextId = (task) => {
  const ids = task.map((task) => task.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};
