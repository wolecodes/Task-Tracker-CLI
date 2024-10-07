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
const { addNewTask } = await import("../src/task.js");

beforeEach(() => {
  inserTaskDB.mockClear();
  getTaskDB.mockClear();
  saveTaskDB.mockClear();
});

test("add a new task and return it", async () => {
  const description = "the new description";
  const nextId = 1;
  const data = {
    id: nextId,
    description: description,
    completed: false,
    inProgress: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };

  getTaskDB.mockResolvedValueOnce([]);

  // Mock `generateNextId()` to return a specific ID
  generateNextId.mockReturnValueOnce(nextId);

  inserTaskDB.mockResolvedValue(data);

  const result = await addNewTask(description);

  expect(result).toEqual(data);
  expect(inserTaskDB).toHaveBeenCalledWith(data);
});
