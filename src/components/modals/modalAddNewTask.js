import createElement from "../../utils/createElement";
import { todoColumn } from "../tasks";
import Task from "../tasks/taskCreated";
import findFreeId from "../../utils/findFreeId";

function ModalAddNewTask(task) {
  this.element = createElement("dialog", {
    className: "modal-addnewcard",
  });
  const form = createElement("form", { className: "modal-addnewcard__form" });

  this.formTitle = createElement("input", {
    className: "modal-addnewcard__title",
    placeholder: "Заголовок...",
  });

  const formCrossButton = createElement("div", {
    className: "modal-addnewcard__cross",
  });

  formCrossButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  formCrossButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.closeModal();
  });

  this.formDescription = createElement("textarea", {
    className: "modal-addnewcard__description",
    placeholder: "Описание...",
  });

  this.formUser = createElement("select", {
    className: "modal-addnewcard__select",
  });

  const formUsers = createElement("option", {
    textContent: "Выбрать пользователя",
  });

  this.formUser.append(formUsers);

  const formClose = createElement("button", {
    className: "modal-addnewcard__close",
    textContent: "Отменить",
  });

  const formSubmit = createElement("button", {
    className: "modal-addnewcard__submit",
    textContent: "Добавить",
  });

  const formTop = createElement("div", { className: "modal-addnewcard__top" });

  formTop.append(this.formTitle, formCrossButton);

  const formBottom = createElement("div", {
    className: "modal-addnewcard__bottom",
  });

  formBottom.append(this.formUser, formClose, formSubmit);

  form.append(formTop, this.formDescription, formBottom);

  this.element.append(form);

  this.backdrop = createElement("div", { className: "hide modalBg" });

  formClose.addEventListener("click", (event) => {
    event.preventDefault();
    this.closeModal();
  });

  this.closeModal = function(e) {
    e && e.preventDefault();
    this.element.open = false;
    this.backdrop.classList.add("hide");
  }

  this.openModal = function() {
    this.element.open = true;
    this.backdrop.classList.remove("hide");
  }

  wrapper = createElement("div");
  wrapper.append(this.element, this.backdrop);

  this.removeModal = function(){
    wrapper.remove();
  }

  formSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const titleString = this.formTitle.value;
    const descriptionString = this.formDescription.value;
    const userString = this.formUser.options[this.formUser.selectedIndex].text;
    if (!titleString || !descriptionString) {
      return;
    }

    if (task) {
      task.edit(titleString, descriptionString, userString);
    } else {
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
    }
   
    this.formTitle.value = "";
    this.formDescription.value = "";
    this.closeModal();
  });

  document.body.append(wrapper);
}

export default ModalAddNewTask;