"use strict";

import {initialElements} from "../components/initial-elements.js";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {settingObject} from "../components/setting-object.js";

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

// Создание экземпляров классов

const editPopupFormValidator = new FormValidator(settingObject, editPopupForm);
editPopupFormValidator.enableValidation();

const addPopupFormValidator = new FormValidator(settingObject, addPopupForm);
addPopupFormValidator.enableValidation();

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

// Установка слушателей событий

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

// Инициализация элементов

function initeElements(elements) {
  const initialElementsList = new Section({items: elements, renderer: (item) => {
    const card = new Card(item.name, item.link, '#element-template', (evt) => {elementPopup.open(evt)});
    const element = card.createElement();
    initialElementsList.setItem(element);
  }}, elementsListSelector);

  initialElementsList.renderItems();
}

initeElements(initialElements);
