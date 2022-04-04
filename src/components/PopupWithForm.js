import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._saveButton = this._form.querySelector('.popup__save-button')
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  };

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      const saveButtonTextContent = this._saveButton.textContent;
      this._saveButton.textContent += '...';
      const inputValues = this._getInputValues();
      this._handleSubmit(evt, inputValues)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._saveButton.textContent = saveButtonTextContent;
      });
    });
  }

  close() {
    super.close();
    setTimeout(() => {
      this._form.reset();
    }, 501)
  }
}
