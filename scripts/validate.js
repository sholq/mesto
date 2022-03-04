export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._invalidInputClass = settings.invalidInputClass;
    this._activeErrorClass = settings.activeErrorClass;
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form);
  }

  _setEventListeners(formElement) {
    const inputs = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, buttonElement);
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputs, buttonElement);
      });
      inputElement.addEventListener('invalid', (evt) => {
        evt.preventDefault();
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._invalidInputClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._invalidInputClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }
}
