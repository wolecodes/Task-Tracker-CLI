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
export const generateNextId = (tasks) => {
  const ids = tasks.map((task) => task.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};

export const filterByStatus = (task, statusArg) => {
  let status = {
    done: (task) => task.completed,
    todo: (task) => !(task.completed && task.inProgress),
    inProgress: (task) => task.inProgress,
  };

  const filterFn = status[statusArg.toLowerCase()];

  return filterFn ? task.filter(filterFn) : null;
};

export const logTaskDetails = (task) => {
  console.log("\n");
  console.log("ID:", task.id);
  console.log("Description:", task.description);
  console.log(
    "Status:",
    `${
      task.completed
        ? colors.green + "Done"
        : task.inProgress
        ? colors.yellow + "In-progress"
        : colors.red + "To-do"
    }${colors.reset}`
  );
};
