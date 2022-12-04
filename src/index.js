import {
  todoColumn,
  inProgressColumn,
  doneColumn,
} from "./components/tasks/index.js";
import modal from "./components/modals/modalAddNewTask.js";

todoColumn.savingTasksInColumn();
inProgressColumn.savingTasksInColumn();
doneColumn.savingTasksInColumn();
(function () {
  todoColumn.counter();
  inProgressColumn.counter();
  doneColumn.counter();
})();

document
  .querySelector(".columns-todo > .columns-button")
  .before(todoColumn.element);
document.querySelector(".columns-inprogress").append(inProgressColumn.element);
document
  .querySelector(".columns-done > .columns-button")
  .before(doneColumn.element);
document.body.append(modal.element);
