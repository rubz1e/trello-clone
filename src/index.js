import createElement from "./utils/createElement.js";
import Task from "./components/tasks/taskCreated.js";
import { tasksInProgress, tasks, tasksDone } from "./components/tasks/index.js";

const createOfDate = new Date().toLocaleString();
tasks.addTask(
  "title",
  "123awdwadwadwadawda",
  "Angelina Sergeevna",
  createOfDate
);

document.querySelector(".columns-todo > .columns-button").before(tasks.element);
document.querySelector(".columns-inprogress").append(tasksInProgress.element);
document.querySelector(".columns-done > .columns-button").before(tasksDone.element);
