import createElement from "../../utils/createElement";

function ModalValidation(text, eventConfirm, options = {confirmButton: true}) {
  this.text = text;
  this.backdrop = createElement("div", { className: "backdrop" });
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

  this.removeModal = function(){
    this.element.remove();
    this.backdrop.remove();
  }

  this.closeModal = function(){
    this.element.open = false;
    this.backdrop.classList.remove("modalBg");
  }

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.closeModal();
  });

  confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    eventConfirm();
    this.removeModal();
  })

  this.cancelButton = cancelButton;
  this.confirmButton = confirmButton;

  this.openModal = function(){
    this.element.open = true;
  }

  if (!options.confirmButton) {
    form.append(formTitle, cancelButton);
  }
  if (options.confirmButton) {
    form.append(formTitle, cancelButton, confirmButton);
  }

  this.element.append(form);
  document.body.append(this.element, this.backdrop)
}

export default ModalValidation;
