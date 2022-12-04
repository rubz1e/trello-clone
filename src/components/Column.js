import createElement from "../utils/createElement";
import findFreeId from "../utils/findFreeId";
import ModalValidation from "./modals/modalValidation";
import Task from "./tasks/taskCreated";

function Column(role) {
  this.role = role;
  this.element = createElement("ul", { className: this.role });
  this.list = [];

  this.constructTaskForTodo = function (task) {
    changeButtons(task, "Редактировать", "Удалить");
    task.taskArrow.classList.remove("task-mised");
    task.element.classList.remove("task--inProgress");
    const callback = function () {
      this.deleteTask(task);
    };
    task.modalDelete = new ModalValidation(
      "Вы точно хотите удалить?",
      callback.bind(this)
    );
    const deleteFunc = () => {
      task.modalDelete.backdrop.classList.add("modalBg");
      task.modalDelete.openModal();
    };
    task.taskDelete.addEventListener("click", deleteFunc);
    const moveToNextColumn = () => {
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
      task.taskArrow.removeEventListener("click", moveToNextColumn);
    };
    task.taskArrow.addEventListener("click", moveToNextColumn);
  };

  this.constructTaskForInProgress = function (task) {
    changeButtons(task, "Вернуть", "Завершить");
    task.taskArrow.classList.add("task-mised");
    task.element.classList.add("task--inProgress");
    const moveToPrevColumn = () => {
      this.moveTaskTo(task, this.previousColumn);
      task.taskEdit.removeEventListener("click", moveToPrevColumn);
      task.taskDelete.removeEventListener("click", moveToNextColumn);
    };
    task.taskEdit.addEventListener("click", moveToPrevColumn);

    const moveToNextColumn = () => {
      this.moveTaskTo(task, this.nextColumn);
      task.taskDelete.removeEventListener("click", moveToNextColumn);
    };
    task.taskDelete.addEventListener("click", moveToNextColumn);
  };

  this.constructTaskForDone = function (task) {
    task.taskArrow.classList.add("task-mised");
    task.taskEdit.classList.add("task-mised");
    task.taskDelete.textContent = "Удалить";
    task.element.classList.add("task--done");

    const callback = function () {
      this.deleteTask(task);
    };
    task.modalDelete = new ModalValidation(
      "Вы точно хотите удалить?",
      callback.bind(this)
    );

    const deleteFunc = () => {
      task.modalDelete.backdrop.classList.add("modalBg");
      task.modalDelete.openModal();
    };
    task.taskDelete.addEventListener("click", deleteFunc);
  };

  this.addTask = function (task) {
    if (this.role === "todo") {
      this.constructTaskForTodo(task);
    }

    if (this.role === "inProgress") {
      this.constructTaskForInProgress(task);
    }

    if (this.role === "done") {
      this.constructTaskForDone(task);
    }

    this.list.push(task);
    this.element.append(task.element);
  };

  this.deleteTask = function (task) {
    const id = task.id;
    task.element.remove();
    this.list = this.list.filter((task) => task.id !== id);
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

  this.savingTasksInColumn = function () {
    const initColumn = JSON.parse(localStorage.getItem(this.role));
    initColumn?.forEach((element) => {
      const id = findFreeId(this.list);
      const task = new Task(
        id,
        element.title,
        element.description,
        element.user,
        element.date
      );
      this.addTask(task);
    });

    window.addEventListener("beforeunload", () => {
      const data = this.list.map(({ title, description, user, date }) => ({
        title,
        description,
        user,
        date,
      }));
      localStorage.setItem(this.role, JSON.stringify(data));
    });
  };
}

function changeButtons(task, nameFirstBtn, nameSecondBtn) {
  task.taskEdit.textContent = nameFirstBtn;
  task.taskDelete.textContent = nameSecondBtn;
}

export default Column;
