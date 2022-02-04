function showInputError(formElement, inputElement, errorMessage, settingObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingObj.invalidInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingObj.activeErrorClass);
}

function hideInputError(formElement, inputElement, settingObj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingObj.invalidInputClass);
  errorElement.classList.remove(settingObj.activeErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, settingObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingObj);
  } else {
    hideInputError(formElement, inputElement, settingObj);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settingObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingObj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingObj.inactiveButtonClass);
  }
}

function setEventListeners(formElement, settingObj) {
  const inputs = Array.from(formElement.querySelectorAll(settingObj.inputSelector));
  const buttonElement = formElement.querySelector(settingObj.submitButtonSelector);
  toggleButtonState(inputs, buttonElement, settingObj);
  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settingObj);
      toggleButtonState(inputs, buttonElement, settingObj);
    });
    inputElement.addEventListener('invalid', (evt) => {
      evt.preventDefault();
      checkInputValidity(formElement, inputElement, settingObj);
    });
  });
}

function enableValidation(settingObj) {
  const forms = Array.from(document.querySelectorAll(settingObj.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingObj);
  });
}

const settingObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  invalidInputClass: 'popup__input_invalid',
  activeErrorClass: 'popup__input-error_active'
}

enableValidation(settingObject);
