import createElement from "../utils/createElement";
import ModalValidation from "./modals/modalValidation";

function Column(role) {
  this.role = role;
  this.element = createElement("ul", { className: this.role });
  this.list = [];

  this.constructTaskForTodo = function (task) {
    changeButtons(task, "Редактировать", "Удалить");
    task.taskArrow.classList.remove("task-mised");
    const callback = function () {
      this.deleteTask(task);
    };
    task.modalDelete = new ModalValidation(
      "Вы точно хотите удалить?",
      callback.bind(this)
    );
    function deleteFunc() {
      task.modalDelete.backdrop.classList.add("modalBg");
      task.modalDelete.openModal();
    }
    task.taskDelete.addEventListener("click", deleteFunc);
    task.taskArrow.addEventListener("click", () => {
      // task.modalDelete.element.remove();
      // task.modalDelete.backdrop.remove();
      // delete task.modalDelete;
      // console.log(this.nextColumn.list);
      // console.log(this.nextColumn.list.length);
      if (this.nextColumn.list.length + 1 <= 6) {
        task.taskDelete.removeEventListener("click", deleteFunc);
        task.modalDelete.removeModal();
        this.moveTaskTo(task, this.nextColumn);
      } else {
        const modalDoIt = new ModalValidation(
          "Выполните текущие задачи, прежде чем добавить дополнительные задачи",
          "",
          { confirmButton: false }
        );
        modalDoIt.backdrop.classList.add("modalBg");
        modalDoIt.openModal();
      }
    });
  };

  this.constructTaskForInProgress = function (task) {
    changeButtons(task, "Вернуть", "Завершить");
    task.taskArrow.classList.add("task-mised");

    task.taskEdit.addEventListener("click", () => {
      task.taskDelete.removeEventListener("click", completeFuncBind);
      this.moveTaskTo(task, this.previousColumn);
    });
    function completeFunc() {
      this.moveTaskTo(task, this.nextColumn);
    }
    const completeFuncBind = completeFunc.bind(this);
    task.taskDelete.addEventListener("click", completeFuncBind);
  };

  this.constructTaskForDone = function (task) {
    task.taskArrow.classList.add("task-mised");
    task.taskEdit.classList.add("task-mised");
    task.taskDelete.textContent = "Удалить";

    const callback = function () {
      this.deleteTask(task);
    };
    task.modalDelete = new ModalValidation(
      "Вы точно хотите удалить?",
      callback.bind(this)
    );
    function deleteFunc() {
      task.modalDelete.backdrop.classList.add("modalBg");
      task.modalDelete.openModal();
    }
    task.taskDelete.addEventListener("click", deleteFunc);
  };

  this.addTask = function (task) {
    if (this.role === "todo") {
      this.constructTaskForTodo(task);
      // document.body.append(task.modalDelete?.element, task.modalDelete?.backdrop);
    }

    if (this.role === "inProgress") {
      this.constructTaskForInProgress(task);
    }

    if (this.role === "done") {
      this.constructTaskForDone(task);
      // document.body.append(task.modalDelete?.element, task.modalDelete?.backdrop);
    }

    this.list.push(task);
    this.element.append(task.element);
  };

  this.deleteTask = function (task) {
    const id = task.id;
    console.log(id);
    const deleteTask = this.list.find((task) => task.id === id);
    if (deleteTask) {
      task.element.remove();
      this.list = this.list.filter((task) => task.id !== id);
    }
  };

  this.moveTaskTo = function (task, column) {
    this.deleteTask(task);
    column.addTask(task);
  };

  this.counter = function () {
    const counterTodo = document.querySelector(
      ".columns-todo .columns-counter"
    );
    const counterInProgress = document.querySelector(
      ".columns-inprogress .columns-counter"
    );
    const counterDone = document.querySelector(
      ".columns-done .columns-counter"
    );

    if (this.role === "todo") {
      counterTodo.textContent = this.list.length;
    }
    if (this.role === "inProgress") {
      counterInProgress.textContent = this.list.length;
    }
    if (this.role === "done") {
      counterDone.textContent = this.list.length;
    }
  };

  this.deleteAll = function () {
    this.list.forEach((task) => {
      task.element.remove();
    });
    this.list = this.list.filter((task) => {
      return false;
    });
  };

  document.body.addEventListener("click", () => {
    this.counter();
  });
}

function changeButtons(task, nameFirstBtn, nameSecondBtn) {
  task.taskEdit.textContent = nameFirstBtn;
  task.taskDelete.textContent = nameSecondBtn;
}

export default Column;
