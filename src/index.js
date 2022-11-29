import Task from "./components/tasks/taskCreated.js";
import findFreeId from "./utils/findFreeId.js";
// import {todoColumn, inProgressColumn, doneColumn} from "./components/tasks/index.js";
import tasks from "./components/tasks/index.js";
import modal from "./components/modals/modalAddNewTask.js";
import ModalValidation from "./components/modals/modalValidation.js";

// todoColumn.addTask(task);

// const modalDelete = new ModalValidation('Вы точно хотите удалить?', '');
// modalDelete.openModal();
// const modalDeleteAll = new ModalValidation('Вы точно хотите удалить всё?', '');
// modalDeleteAll.openModal();
// const modalDoIt = new ModalValidation('Выполните текущие задачи, прежде чем добавить дополнительные задачи', '',{confirmButton: false});
// modalDoIt.openModal();

// document.querySelector(".columns-todo > .columns-button").before(todoColumn.element);
// document.querySelector(".columns-inprogress").append(inProgressColumn.element);
//document.querySelector(".columns-done > .columns-button").before(doneColumn.element);
// document.body.append(modalDelete.element, modalDelete.backdrop, modalDeleteAll.element, modalDeleteAll.backdrop, modalDoIt.element, modalDoIt.backdrop);
document.body.append(modal.element);

