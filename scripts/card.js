export default class Card {
  constructor(name, link, selector) {
    this._template = document.querySelector(selector).content;
    this._name = name;
    this._link = link;
  }

  createElement() {
    const element = this._template.querySelector('.element').cloneNode(true);
    this._renderElement(element);
    this._addEventListeners(element);
    return element;
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
    elementLikeButton.addEventListener('click', this._toggleLikeButton);
    elementDeleteButton.addEventListener('click', this._removeElement);
  }

  _removeElement(evt) {
    const element = evt.target.closest('.element');
    element.remove();
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}
