import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
      this._submiter(evt);
    });
  }

  close() {
    super.close();
    setTimeout(() => {
      this._form.reset();
    }, 501)
  }
}
