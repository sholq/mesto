export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseReference = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    const handleReference = this._handleEscCloseReference;
    document.addEventListener('keydown', handleReference);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    const handleReference = this._handleEscCloseReference;
    document.removeEventListener('keydown', handleReference);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayPopupClosing(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', (evt) => {
      this._handleOverlayPopupClosing(evt);
    });
  }
}
