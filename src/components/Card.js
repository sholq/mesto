export default class Card {
  constructor({name, link, likes, owner, _id}, selector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._likesNumber = likes.length;
    this._owner = owner._id;

    const template = document.querySelector(selector).content;
    this._element = template.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCaption = this._element.querySelector('.element__caption');
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementLikeCounter = this._element.querySelector('.element__counter');
    this._elementDeleteButton = this._element.querySelector('.element__delete');
    this._elementImage = this._element.querySelector('.element__image');

    this._element.id = _id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  createElement() {
    this._renderElement();
    this._addEventListeners();
    // if (this._owner !== 'f6c0b5ceb4d9aa888c76e5f3') {
    //   this._element.style.display = 'none';
    // }
    return this._element;

  }

  _renderElement() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementCaption.textContent = this._name;
    this._elementLikeCounter.textContent = this._likesNumber;

    if (this._likes.find(e => e._id === 'f6c0b5ceb4d9aa888c76e5f3')) {
      this._toggleLikeButton();
    }

    if (this._owner !== 'f6c0b5ceb4d9aa888c76e5f3') {
      this._elementDeleteButton.style.display = 'none';
    }
  }

  _addEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__delete')) {
        this._handleDeleteClick(evt, this.removeElement.bind(this));
      }
    });
    this._elementLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt, this._element.id)
        .then(res => res.json())
        .then((res) => {
          this._likesNumber = res.likes.length;
          this._elementLikeCounter.textContent = this._likesNumber;
          this._toggleLikeButton();
        });
    });
    this._elementImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton() {
    this._elementLikeButton.classList.toggle('element__like_active');
  }
}
