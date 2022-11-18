import createElement from "../../utils/createElement.js";
import findFreeId from "../../utils/findFreeId.js";
import Task from "../tasks/taskCreated.js";

function changeButtons(task, nameFirstBtn, nameSecondBtn) {
  task.taskArrow.classList.toggle("task-mised");
  task.taskEdit.textContent = nameFirstBtn;
  task.taskDelete.textContent = nameSecondBtn;
}

const tasksDone = {
  element: createElement("ul", { className: "done-item" }),
  list: [],
  addTask(task) {
    const id = findFreeId(this.list);
    task.id = id;
    this.list.push(task);
    this.element.append(task.element);

    task.taskEdit.classList.toggle("task-mised");
    task.taskDelete.textContent = "Удалить";

    task.taskDelete.addEventListener("click", () => {
      const deleteTask = this.list.find((task) => task.id === id);
      if (deleteTask) {
        task.element.remove();
        this.list = this.list.filter((task) => task.id !== id);
      }
    });
  },
};

const tasksInProgress = {
  element: createElement("ul", { className: "inProgress-item" }),
  list: [],
  addTask(task) {
    const id = findFreeId(this.list);
    task.id = id;
    this.list.push(task);
    this.element.append(task.element);

    changeButtons(task, "Вернуть", "Завершить");

    task.taskDelete.addEventListener("click", () => {
      // дублирование, придумать куда вынести
      const movedTask = this.list.find((task) => task.id === id);
      if (movedTask) {
        tasksDone.addTask(task);
        this.list = this.list.filter((task) => task.id !== id);
      }
    });

    task.taskEdit.addEventListener("click", () => {
      // дублирование
      const movedTask = this.list.find((task) => task.id === id);
      if (movedTask) {
        tasks.returnTask(task);
        this.list = this.list.filter((task) => task.id !== id);
      }
    });
  },
};

const tasks = {
  element: createElement("ul", { className: "todo-item" }),
  list: [],
  addTask(title, description, user, date) {
    const id = findFreeId(this.list);
    const task = new Task(id, title, description, user, date);
    this.list.push(task);
    this.element.append(task.element);

    task.taskArrow.addEventListener("click", () => {
      const movedTask = this.list.find((task) => task.id === id);
      if (movedTask) {
        tasksInProgress.addTask(task);
        this.list = this.list.filter((task) => task.id !== id);
      }
    });

    task.taskDelete.addEventListener("click", () => {
      // вынести в функцию?
      const deleteTask = this.list.find((task) => task.id === id);
      if (deleteTask) {
        task.element.remove();
        this.list = this.list.filter((task) => task.id !== id);
      }
    });
  },
  returnTask(task) {
    const id = findFreeId(this.list);
    task.id = id;
    this.list.push(task);
    this.element.append(task.element);
    changeButtons(task, "Редактировать", "Удалить");
  },
};

export { tasksDone, tasksInProgress, tasks };
