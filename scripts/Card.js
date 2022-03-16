import {openPopup, elementPopup, elementPopupImage, elementPopupCaption} from "./index.js"

export default class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }

  createElement() {
    const template = document.querySelector(this._selector).content;
    this._element = template.querySelector('.element').cloneNode(true);
    this._renderElement(this._element);
    this._addEventListeners(this._element);
    return this._element;
  }

  _renderElement(element) {
    const elementImage = element.querySelector('.element__image');
    const elementCaption = element.querySelector('.element__caption');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementCaption.textContent = this._name;
  }

  _addEventListeners(element) {
    const elementLikeButton = element.querySelector('.element__like');
    const elementDeleteButton = element.querySelector('.element__delete');
    const elementImage = element.querySelector('.element__image');
    elementLikeButton.addEventListener('click', this._toggleLikeButton);
    elementDeleteButton.addEventListener('click', () => {this._removeElement()});
    elementImage.addEventListener('click', this._openElementPopup);
  }

  _openElementPopup(evt) {
    const image = evt.target;
    elementPopupImage.src = image.src;
    elementPopupImage.alt = image.alt;
    elementPopupCaption.textContent = image.alt;
    openPopup(elementPopup);
  }

  _removeElement() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}