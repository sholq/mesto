"use strict";

import {initialElements} from "./initial-elements.js";
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import {settingObject} from "./setting-object.js";

// Формы

const editPopupForm = document.forms.editPopupForm;
const addPopupForm = document.forms.addPopupForm;

// Селекторы

const elementsListSelector = '.elements__list';
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const addPopupSelector = '.popup_type_add';
const editPopupSelector = '.popup_type_edit';
const elementPopupSelector = '.popup_type_element';

// Элементы

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editPopupElement = document.querySelector(editPopupSelector);
const addPopupElement = document.querySelector(addPopupSelector);

// Установка валидации форм

const editPopupFormValidator = new FormValidator(settingObject, editPopupForm);
editPopupFormValidator.enableValidation();

const addPopupFormValidator = new FormValidator(settingObject, addPopupForm);
addPopupFormValidator.enableValidation();

class Section {
  constructor({items, renderer}, constainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(constainerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  }

  setItem(item) {
    this._container.prepend(item);
  }
}

class Popup {
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

class PopupWithImage extends Popup {
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

class PopupWithForm extends Popup {
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

class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}

const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

const elementPopup = new PopupWithImage(elementPopupSelector);

const editPopup = new PopupWithForm(editPopupSelector, (evt) => {
  evt.preventDefault();
  const inputValues = editPopup._getInputValues();
  userInfo.setUserInfo(inputValues);
  editPopup.close();
});

const addPopup = new PopupWithForm(addPopupSelector, (evt) => {
  evt.preventDefault();
  const inputValues = addPopup._getInputValues();
  initeElements([inputValues]);
  addPopup.close();
});

elementPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editPopupFormValidator.resetValidation();
  editPopupElement.querySelector('.popup__input_type_name').value = info.name;
  editPopupElement.querySelector('.popup__input_type_description').value = info.description;
  editPopup.open();
});
profileAddButton.addEventListener('click', () => {
  addPopupFormValidator.resetValidation();
  addPopup.open();
});

function initeElements(elements) {
  const initialElementsList = new Section({items: elements, renderer: (item) => {
    const card = new Card(item.name, item.link, '#element-template', (evt) => {elementPopup.open(evt)});
    const element = card.createElement();
    initialElementsList.setItem(element);
  }}, elementsListSelector);

  initialElementsList.renderItems();
}

initeElements(initialElements);
