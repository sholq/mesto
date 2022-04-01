export default class Card {
  constructor({name, link, likes}, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    const template = document.querySelector(selector).content;
    this._element = template.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCaption = this._element.querySelector('.element__caption');
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementLikeCounter = this._element.querySelector('.element__counter');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._handleCardClick = handleCardClick;
  }

  createElement() {
    this._renderElement();
    this._addEventListeners();
    return this._element;
  }

  _renderElement() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementCaption.textContent = this._name;
    this._elementLikeCounter.textContent = this._likes;
  }

  _addEventListeners() {
    this._elementLikeButton.addEventListener('click', (evt) => {
      this._toggleLikeButton(evt);
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._removeElement();
    });
    this._elementImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  _removeElement() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}
