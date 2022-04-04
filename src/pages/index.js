"use strict";

import './index.css';

import {settingObject} from "../utils/setting-object.js";

const {elementsTemplateSelector, elementsListSelector, profileEditButtonSelector, profileAddButtonSelector, profileEditAvatarButtonSelector, editPopupSelector, addPopupSelector, editAvatarPopupSelector, elementPopupSelector, confirmPopupSelector, editPopupNameInputSelector, editPopupDescriptionInputSelector} = settingObject;

import Api from "../components/Api";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from "../components/UserInfo.js";

// Формы

const editPopupForm = document.forms.editPopupForm;
const addPopupForm = document.forms.addPopupForm;
const editAvatarPopupForm = document.forms.editAvatarPopupForm;

// Элементы

const profileEditAvatarButton = document.querySelector(profileEditAvatarButtonSelector);
const profileEditButton = document.querySelector(profileEditButtonSelector);
const profileAddButton = document.querySelector(profileAddButtonSelector);

// Создание экземпляров классов

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  headers: {
    authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
    'Content-Type': 'application/json'
  }
});

const elementsList = new Section((item, userId) => {
  const card = new Card(item, elementsTemplateSelector, (evt) => {
      elementPopup.open(evt)
    },
    (evt, handlerDelete) => {
      confirmPopup.open(evt, handlerDelete)
    },
    (cardId) => {
      if (card.isLiked) {
        return api.deleteLike(cardId)
          .catch((err) => {
            console.log(err);
          });
      } else {
        return api.putLike(cardId)
          .catch((err) => {
            console.log(err);
          });
      }
    },
    userId
  );
  return card.createElement();
}, elementsListSelector);

const editPopupFormValidator = new FormValidator(settingObject, editPopupForm);
editPopupFormValidator.enableValidation();

const addPopupFormValidator = new FormValidator(settingObject, addPopupForm);
addPopupFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(settingObject, editAvatarPopupForm);
editAvatarFormValidator.enableValidation();

const userInfo = new UserInfo(settingObject);

const editPopup = new PopupWithForm(editPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return api.editUserInfo(inputValues)
    .then(user => {
      userInfo.setUserInfo(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

const elementPopup = new PopupWithImage(elementPopupSelector);

const addPopup = new PopupWithForm(addPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return api.addNewImage(inputValues)
    .then(card => {
      elementsList.setItem(card, userInfo.id);
    })
    .catch((err) => {
      console.log(err);
    });
});

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return api.editUserAvatar(inputValues)
    .then(user => {
      userInfo.setUserInfo(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, () => {
  return api.deleteCard(confirmPopup.currentId)
    .catch((err) => {
      console.log(err);
    });
});

// Установка слушателей событий

elementPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
editAvatarPopup.setEventListeners();
confirmPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editPopupFormValidator.resetValidation();
  editPopup.setInputValues(info);
  editPopup.open();
});
profileAddButton.addEventListener('click', () => {
  addPopupFormValidator.resetValidation();
  addPopup.open();
});
profileEditAvatarButton.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  editAvatarPopup.open();
})

// Инициализация

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    elementsList.renderItems(cards, userInfo.id);
  })
  .catch((err) => {
    console.log(err);
  });
