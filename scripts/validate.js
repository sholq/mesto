const settingObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  invalidInputClass: 'popup__input_invalid',
  activeErrorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(settings, form) {
    this.form = form;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.invalidInputClass = settings.invalidInputClass;
    this.activeErrorClass = settings.activeErrorClass;
  }

  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.invalidInputClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.activeErrorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.invalidInputClass);
    errorElement.classList.remove(this.activeErrorClass);
    errorElement.textContent = '';
  }

  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
    }
  }

  setEventListeners(formElement) {
    const inputs = Array.from(formElement.querySelectorAll(this.inputSelector));
    const buttonElement = formElement.querySelector(this.submitButtonSelector);
    this.toggleButtonState(inputs, buttonElement);
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(formElement, inputElement);
        this.toggleButtonState(inputs, buttonElement);
      });
      inputElement.addEventListener('invalid', (evt) => {
        evt.preventDefault();
        this.checkInputValidity(formElement, inputElement);
      });
    });
  }

  enableValidation() {
    this.form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this.setEventListeners(this.form);
  }
}

const forms = Array.from(document.querySelectorAll(settingObject.formSelector));
forms.forEach(item => {
  const form = new FormValidator(settingObject, item);
  form.enableValidation();
})
