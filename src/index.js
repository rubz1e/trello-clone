import tasks from "./components/tasks/index.js";
import modal from "./components/modals/modalAddNewTask.js";
import ModalValidation from "./components/modals/modalValidation.js";

// const modalDelete = new ModalValidation('Вы точно хотите удалить?', '');
// modalDelete.openModal();
// const modalDeleteAll = new ModalValidation('Вы точно хотите удалить всё?', '');
// modalDeleteAll.openModal();
// const modalDoIt = new ModalValidation('Выполните текущие задачи, прежде чем добавить дополнительные задачи', '',{confirmButton: false});
// modalDoIt.openModal();

document.querySelector("#todo-list")?.append(tasks.element);
// document.body.append(modalDelete.element, modalDelete.backdrop, modalDeleteAll.element, modalDeleteAll.backdrop, modalDoIt.element, modalDoIt.backdrop);
document.body.append(modal.element);
