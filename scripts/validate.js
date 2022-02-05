function showInputError(formElement, inputElement, errorMessage, {invalidInputClass, activeErrorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(invalidInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(activeErrorClass);
}

function hideInputError(formElement, inputElement, {invalidInputClass, activeErrorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(invalidInputClass);
  errorElement.classList.remove(activeErrorClass);
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

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...settingObj}) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
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

function enableValidation({formSelector, ...settingObj}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
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
