//generate next id for task
/*
 * generateNextId : this function generates the next id for the task
 * @param {Array} - task
 * @returns {number} - returns the next id for the task
 */
export const generateNextId = (task) => {
  const ids = task.map((task) => task.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};

