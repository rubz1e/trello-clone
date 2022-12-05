import Column from "../Column.js";
import ModalAddNewTask from "../modals/modalAddNewTask.js";

const todoColumn = new Column('todo');
const inProgressColumn = new Column('inProgress');
const doneColumn = new Column('done');
todoColumn.nextColumn = inProgressColumn;
inProgressColumn.previousColumn = todoColumn;
inProgressColumn.nextColumn = doneColumn;

const deleteAllButton = document.querySelector('.columns-done .columns-button')
deleteAllButton.addEventListener('click', () => {
    doneColumn.deleteAll();
})

const addNewTask = document.querySelector(".columns-button");
const newTaskModal = new ModalAddNewTask()
addNewTask.addEventListener("click", () => {
  newTaskModal.openModal()
});


export { todoColumn, inProgressColumn, doneColumn };
