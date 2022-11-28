import Task from "./components/tasks/taskCreated.js";
import findFreeId from "./utils/findFreeId.js";
import {
  todoColumn,
  inProgressColumn,
  doneColumn,
} from "./components/tasks/index.js";

const createOfDate = new Date().toLocaleString();
let id = findFreeId(todoColumn.list);
const task = new Task(
  id,
  "title",
  "123awdwadwadwadawda",
  "Angelina Sergeevna",
  createOfDate
);

todoColumn.addTask(task);

document.querySelector(".columns-todo > .columns-button").before(todoColumn.element);
document.querySelector(".columns-inprogress").append(inProgressColumn.element);
document
  .querySelector(".columns-done > .columns-button")
  .before(doneColumn.element);
