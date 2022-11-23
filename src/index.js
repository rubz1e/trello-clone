import createElement from "./utils/createElement.js"
import Task from './components/tasks/taskCreated.js'
import tasks from './components/tasks/index.js'
import ModalValidation from "./components/modals/modalValidation.js";

const createOfDate = new Date().toLocaleString();
tasks.addTask('title', '123awdwadwadwadawda', 'Angelina Sergeevna', createOfDate);
const modalDelete = new ModalValidation('Вы точно хотите удалить?', '');
modalDelete.openModal();
const modalDeleteAll = new ModalValidation('Вы точно хотите удалить всё?', '');
modalDeleteAll.openModal();
const modalDoIt = new ModalValidation('Выполните текущие задачи, прежде чем добавить дополнительные задачи', '',{confirmButton: false});
modalDoIt.openModal();

document.querySelector('#todo-list')?.append(tasks.element);
document.body.append(modalDelete.element, modalDelete.backdrop, modalDeleteAll.element, modalDeleteAll.backdrop, modalDoIt.element, modalDoIt.backdrop);