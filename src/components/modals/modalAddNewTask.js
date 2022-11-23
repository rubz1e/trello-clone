import createElement from "../../utils/createElement";
import tasks from "../tasks";

const addNewTask = document.querySelector(".columns-button");
addNewTask.addEventListener("click", () => {
  modalAddNewTask.open = true;
  backdrop.classList.remove("hide");
});

const createOfDate = new Date().toLocaleString();

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

const formUsers2 = createElement("option", { textContent: "Angel" });
const formUsers3 = createElement("option", { textContent: "3" });
formUser.append(formUsers, formUsers2, formUsers3);

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
  const questionString = formTitle.value;
  const answerString = formDescription.value;
  const userString = formUser.options[formUser.selectedIndex].text;
  if (!questionString || !answerString) {
    return;
  }
  const card = tasks.addTask(
    questionString,
    answerString,
    userString,
    createOfDate
  );
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
