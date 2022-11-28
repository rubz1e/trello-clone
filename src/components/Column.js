import createElement from "../utils/createElement";

function Column(role) {
  this.role = role;
  this.element = createElement("ul", { className: this.role });
  this.list = [];

  this.constructTaskForTodo = function (task) {
    changeButtons(task, "Редактировать", "Удалить");
    this.list.push(task);
    this.element.append(task.element);
  };

  this.constructTaskForInProgress = function (task) {
    changeButtons(task, "Вернуть", "Завершить");
    this.list.push(task);
    this.element.append(task.element);
  };

  this.constructTaskForDone = function (task) {
    task.taskArrow.classList.add("task-mised");
    task.taskEdit.classList.add("task-mised");
    task.taskDelete.textContent = "Удалить";
    this.list.push(task);
    this.element.append(task.element);
  };

  this.addTask = function (task) {
    if (this.role === "todo") {
      this.constructTaskForTodo(task);

      task.taskDelete.addEventListener('click', () => {
        this.deleteTask(task);
      })
      task.taskArrow.addEventListener("click", () => {
          this.moveTaskTo(task, this.nextColumn);
      });
    }

    if (this.role === "inProgress") {
      this.constructTaskForInProgress(task);
      task.taskEdit.addEventListener("click", () => {
        this.moveTaskTo(task, this.previousColumn);
      });

      task.taskDelete.addEventListener('click', () => {
        this.moveTaskTo(task, this.nextColumn);
      })
    }

    if (this.role === "done") {
      this.constructTaskForDone(task);
      task.taskDelete.addEventListener('click', () => {
        this.deleteTask(task);
      })
    }
  };

  this.deleteTask = function (task) {
    const id = task.id;
    const deleteTask = this.list.find((task) => task.id === id);
    if (deleteTask) {
      task.element.remove();
      this.list = this.list.filter((task) => task.id !== id);
    }
  };

  this.moveTaskTo = function (task, column) {
    if (this.role === "todo") {
      this.deleteTask(task);
      task.taskArrow.classList.add("task-mised");
      column.addTask(task);
    }

    if (this.role === "inProgress") {
      this.deleteTask(task);
      task.taskArrow.classList.remove("task-mised");
      column.addTask(task);
    }
  };
}

function changeButtons(task, nameFirstBtn, nameSecondBtn) {
  task.taskEdit.textContent = nameFirstBtn;
  task.taskDelete.textContent = nameSecondBtn;
}

export default Column;
