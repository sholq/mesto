import Popup from '../components/Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._saveButton = this._popup.querySelector('.popup__save-button');
    this._submiter = submiter;
  }

  open(evt, handleDelete) {
    this._card = evt.target.parentElement;
    this.currentId = this._card.id;
    this._handleDelete = handleDelete;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._saveButton.addEventListener('click', () => {
      this._submiter()
        .then(() => {
          this._handleDelete();
          this.close();
        });
    })
  }
}

