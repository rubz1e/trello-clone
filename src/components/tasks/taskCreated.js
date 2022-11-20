import createElement from "../../utils/createElement";

function Task(id, title, description, user, date) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.user = user;
  this.date = date;
  this.element = createElement("li", { className: "task" });

  const taskTitle = createElement("p", {
    className: "task-title",
    textContent: this.title,
  });
  const taskEdit = createElement("button", {
    className: "task-edit",
    textContent: "Редактировать",
  });
  const taskDelete = createElement("button", {
    className: "task-delete",
    textContent: "Удалить",
  });
  const taskDescription = createElement("p", {
    className: "task-description",
    textContent: this.description,
  });
  const taskUser = createElement("p", {
    className: "task-text",
    textContent: this.user,
  });
  const taskArrow = createElement("div", { className: "task-arrow" });
  taskArrow.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
  const taskDate = createElement("p", {
    className: "task-text",
    textContent: this.date,
  });

  const taskTop = createElement("div", { className: "task-top" });
  const taskTopRight = createElement("div", { className: "task-top__right" });

  const taskBottom = createElement("div", { className: "task-bottom" });
  const taskBottomRight = createElement("div", {
    className: "task-bottom__right",
  });

  taskTopRight.append(taskEdit, taskDelete);
  taskTop.append(taskTitle, taskTopRight);

  taskBottomRight.append(taskArrow, taskDate);
  taskBottom.append(taskUser, taskBottomRight);

  this.element.append(taskTop, taskDescription, taskBottom);
}

export default Task;
