# Task Tracker-CLI

A solution to the task tracker-cli [challenge](https://roadmap.sh/projects/task-tracker) from [roadmap.sh](https://roadmap.sh) backend projects
Task Tracker CLI is a simple command line application that is use for managing task.

### Features

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List tasks by their status: to-do, in-progress, or done.

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) installed
- Basic knowledge of command line interface

### Installation

1. Clone the repository:

```bash
    git clone https://github.com/yourusername/Task-Tracker-CLI.git
```

2. Navigate to the project directory:

```sh
    cd Task-Tracker-CLI
```

### How to use

- **Add a new task**

```bash
task-cli add "Task description"
```

- **List all Tasks**

```bash
task-cli  list
```

- **also to list task by status (to-do, in-progress, done)**

```bash
# To list the tasks that are marked as to-do
task-cli list to-do
# To list the tasks that are marked as in-progess
task-cli list in-progress
# To list the tasks that are marked as done
task-cli list done
```

- **Update Task**

```bash
# update task with its task id
task-cli update 1
```

- **Mark Task Status**

```bash
# Mark as `in-progress` with the task ID ex: 1
task-cli mark-in-progress 1

# Mark as `done` with the task ID ex: 1
task-cli mark-done 1
```

- **Delete a task**

```bash
# delete task with the task id ex: 1
task-cli delete  1
```

### Sample JSON Data

```JSON
[
  {
    "id": 1,
    "description": "finish up the APP",
    "completed": true,
    "inProgress": false,
    "createdAt": "2024-10-04T11:15:46.752Z",
    "updatedAt": "Fri Oct 04 2024"
  }
]

```
