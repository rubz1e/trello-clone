import createElement from "./utils/createElement.js"
import Task from './components/tasks/taskCreated.js'
import tasks from './components/tasks/index.js'
import ModalValidation from "./components/modals/modalValidation.js";

const createOfDate = new Date().toLocaleString();
tasks.addTask('title', '123awdwadwadwadawda', 'Angelina Sergeevna', createOfDate);
const modalDelete = new ModalValidation('Вы точно хотите удалить?', 'delete');
modalDelete.element.open = true;
// const modalDeleteAll = new ModalValidation('Вы точно хотите удалить всё?', 'deleteAll');
// modalDelete.element.open = true;
// const modalDoIt = new ModalValidation('Выполните текущие задачи, прежде чем добавить дополнительные задачи', 'do it');
// modalDoIt.element.open = true; 

document.querySelector('#todo-list')?.append(tasks.element);
document.body.append(modalDelete.element, modalDelete.backdrop);