import { expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("../src/taskDB.js", () => ({
  inserTaskDB: jest.fn(),
  getTaskDB: jest.fn(),
  saveTaskDB: jest.fn(),
}));

jest.unstable_mockModule("../src/utils.js", () => ({
  generateNextId: jest.fn(),
  filterByStatus: jest.fn(),
  logTaskDetails: jest.fn(),
  colors: {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
  },
}));
const { inserTaskDB, getTaskDB, saveTaskDB } = await import("../src/taskDB.js");
const { generateNextId, logTaskDetails } = await import("../src/utils.js");
const { addNewTask, updateTask, deleteTask, listTask, markDone, inProgress } =
  await import("../src/task.js");

beforeEach(() => {
  inserTaskDB.mockClear();
  getTaskDB.mockClear();
  saveTaskDB.mockClear();
});

test("addNewTask inserts task and returns it", async () => {});

test("update the task with id do nothing if node found ", async () => {
  const task = [
    { id: 1, description: "new task" },
    { id: 2, description: "second task" },
  ];

  getTaskDB.mockResolvedValueOnce(task);

  saveTaskDB.mockResolvedValue(task);

  const updateId = 3;

  const result = await updateTask(updateId);
  expect(result).toBeUndefined();
});

test("delete task with id do nothing if not found", async () => {
  const task = [
    { id: 1, description: "new task" },
    { id: 2, description: "second task" },
    { id: 3, description: "third test" },
  ];
  getTaskDB.mockResolvedValueOnce(task);

  saveTaskDB.mockResolvedValue(task);
  const deleteId = 4;
  const result = await deleteTask(deleteId);
  expect(result).toBeUndefined();
});

test("mark task as done", async () => {
  const task = [
    { id: 1, description: "new task", completed: false, inProgress: true },
    { id: 2, description: "second task", completed: false, inProgress: false },
  ];

  getTaskDB.mockResolvedValueOnce(task);

  const taskId = 1;
  await markDone(taskId);

  expect(task[0].completed).toBe(true);
  expect(task[0].inProgress).toBe(false);
  expect(saveTaskDB).toHaveBeenCalledWith(task);
});

test("mark as inprogress", async () => {
  const task = [
    { id: 1, description: "new task", completed: false, inProgress: true },
    { id: 2, description: "second task", completed: false, inProgress: false },
  ];

  getTaskDB.mockResolvedValueOnce(task);

  const taskId = 1;
  await inProgress(taskId);
  expect(task[0].completed).toBe(false);
  expect(task[0].inProgress).toBe(true);
  expect(saveTaskDB).toHaveBeenCalledWith(task);
});
test("list all tasks", async () => {
  const task = [
    { id: 1, description: "new task", completed: true, inProgress: false },
    { id: 2, description: "second task", completed: false, inProgress: true },
  ];

  getTaskDB.mockResolvedValueOnce(task);

  // await listTask();
  await listTask();

  expect(logTaskDetails).toHaveBeenCalledTimes(2);
});

test("list tasks by status", async () => {
  const task = [
    { id: 1, description: "new task", completed: true, inProgress: false },
    { id: 2, description: "second task", completed: false, inProgress: true },
  ];

  getTaskDB.mockResolvedValueOnce(task);
  filterByStatus.mockReturnValue([task[0]]);

  await listTask("done");

  expect(filterByStatus).toHaveBeenCalledWith(task, "done");
  expect(logTaskDetails).toHaveBeenCalledWith(task[0]);
});
