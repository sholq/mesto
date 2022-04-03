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
const editPopupElement = document.querySelector(editPopupSelector);
const editPopupNameInput = editPopupElement.querySelector(editPopupNameInputSelector);
const editPopupDescriptionInput = editPopupElement.querySelector(editPopupDescriptionInputSelector);

// Создание экземпляров классов

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  headers: {
    authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
    'Content-Type': 'application/json'
  }
});

// Создадим экземпляр класса с пустым массивом элементов, добавим их на страницу позже

const elementsList = new Section({items: [], renderer: (item, userId) => {
  const card = new Card(item, elementsTemplateSelector, (evt) => {
      elementPopup.open(evt)
    },
    (evt, handlerDelete) => {
      confirmPopup.open(evt, handlerDelete)
    },
    (evt, cardId) => {
      if (evt.target.classList.contains('element__like_active')) {
        return api.deleteLike(cardId);
      } else {
        return api.putLike(cardId);
      }
    },
    userId
  );
  return card.createElement();
}}, elementsListSelector);

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
      userInfo.setUserInfo(user)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.close();
    });
});

const elementPopup = new PopupWithImage(elementPopupSelector);

const addPopup = new PopupWithForm(addPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return api.addNewImage(inputValues)
    .then(card => {
      elementsList.setItem(card, userId);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPopup.close()
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
    })
    .finally(() => {
      editAvatarPopup.close();
    });
});

const confirmPopup = new PopupWithConfirmation(confirmPopupSelector, () => {
  return api.deleteCard(confirmPopup.currentId)
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
  editPopupNameInput.value = info.name;
  editPopupDescriptionInput.value = info.description;
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
// Необходимо получить id пользователя и передать в конструктор класса Card

let userId;

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    userId = result._id;
    console.log(userId)
  })
  .then(() => {
    return api.getInitialCards();
  })
  .then((result) => {
    result.forEach(item => {
      elementsList.setItem(item, userId)
    })
  })
  .catch((err) => {
    console.log(err);
  });
