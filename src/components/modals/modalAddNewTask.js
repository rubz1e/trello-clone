import createElement from "../../utils/createElement";
import { todoColumn } from "../tasks";
import Task from "../tasks/taskCreated";
import findFreeId from "../../utils/findFreeId";

const addNewTask = document.querySelector(".columns-button");
addNewTask.addEventListener("click", () => {
  modalAddNewTask.open = true;
  backdrop.classList.remove("hide");
});

const modalAddNewTask = createElement("dialog", {
  className: "modal-addnewcard",
});

const form = createElement("form", { className: "modal-addnewcard__form" });

const formTitle = createElement("input", {
  className: "modal-addnewcard__title",
  placeholder: "Заголовок...",
});

const formCrossButton = createElement("div", {
  className: "modal-addnewcard__cross",
});

formCrossButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

formCrossButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

const formDescription = createElement("textarea", {
  className: "modal-addnewcard__description",
  placeholder: "Описание...",
});

const formUser = createElement("select", {
  className: "modal-addnewcard__select",
});

const formUsers = createElement("option", {
  textContent: "Выбрать пользователя",
});

async function getResponse() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let content = await response.json();
  for (key in content) {
    const listOptions = [content[key].name];
    const select = document.querySelector("select");
    for (let i = 0; i < listOptions.length; i++) {
      const option = createElement("option");
      option.value = listOptions[i];
      option.text = listOptions[i];
      select.add(option);
    }
  }
}
getResponse();

formUser.append(formUsers);

const formClose = createElement("button", {
  className: "modal-addnewcard__close",
  textContent: "Отменить",
});

const formSubmit = createElement("button", {
  className: "modal-addnewcard__submit",
  textContent: "Добавить",
});

const formTop = createElement("div", { className: "modal-addnewcard__top" });

formTop.append(formTitle, formCrossButton);

const formBottom = createElement("div", {
  className: "modal-addnewcard__bottom",
});

formBottom.append(formUser, formClose, formSubmit);

form.append(formTop, formDescription, formBottom);

modalAddNewTask.append(form);

const backdrop = createElement("div", { className: "hide modalBg" });

formClose.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});

formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const titleString = formTitle.value;
  const descriptionString = formDescription.value;
  const userString = formUser.options[formUser.selectedIndex].text;
  if (!titleString || !descriptionString) {
    return;
  }
  const createOfDate = new Date().toLocaleString();
  const id = findFreeId(todoColumn.list);
  const task = new Task(
    id,
    titleString,
    descriptionString,
    userString,
    createOfDate
  );
  todoColumn.addTask(task);
  formTitle.value = "";
  formDescription.value = "";
  closeModal();
});

function closeModal(e) {
  e && e.preventDefault();
  modalAddNewTask.open = false;
  backdrop.classList.add("hide");
}

function openModal() {
  modal.open = true;
  backdrop.classList.remove("hide");
}

const wrapper = createElement("div");
wrapper.append(modalAddNewTask, backdrop);

const modalObj = {
  element: wrapper,
  closeModal,
  openModal,
};

export default modalObj;
