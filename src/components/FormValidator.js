export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._invalidInputClass = settings.invalidInputClass;
    this._activeErrorClass = settings.activeErrorClass;
    this._inputs = Array.from(this._form.querySelectorAll(settings.inputSelector));
    this._buttonElement = this._form.querySelector(settings.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    return this._inputs.some(inputElement => !inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._invalidInputClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._invalidInputClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }
}
