import createElement from "../../utils/createElement";

function ModalValidation(text, name) {
  this.text = text;
  this.name = name;

  this.backdrop = createElement("div", { className: "backdrop modalBg" });

  this.element = createElement("dialog", {
    className: "modal-validation",
  });
  const form = createElement("form");
  const formTitle = createElement("h2", {
    textContent: this.text,
    className: "modal-validation__text",
  });
  const cancelButton = createElement("button", {
    textContent: "Отменить",
    className: "modal-validation__button",
  });
  const confirmButton = createElement("button", {
    textContent: "Подтвердить",
    className: "modal-validation__button",
  });

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.element.open = false;
    this.backdrop.classList.remove("modalBg");
  });

  confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (this.name === 'delete'){

    }
    if (this.name === 'deleteAll'){

    }
    this.element.open = false;
    this.backdrop.classList.remove("modalBg");
  })

  this.cancelButton = cancelButton;
  this.confirmButton = confirmButton;

  if (this.name === "do it") {
    form.append(formTitle, cancelButton);
  }
  if (this.name === "delete") {
    form.append(formTitle, cancelButton, confirmButton);
  }

  this.element.append(form);
}

export default ModalValidation;
