import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__element-image');
    this._caption = this._popup.querySelector('.popup__element-caption');
  }

  open(evt) {
    const image = evt.target;
    this._image.src = image.src;
    this._image.alt = image.alt;
    this._caption.textContent = image.alt;
    super.open();
  }
}
