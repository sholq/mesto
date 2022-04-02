"use strict";

import './index.css';

import {settingObject} from "../utils/setting-object.js";

const {elementsTemplateSelector, elementsListSelector, profileEditButtonSelector, profileAddButtonSelector, profileEditAvatarButtonSelector, editPopupSelector, addPopupSelector, editAvatarPopupSelector, elementPopupSelector, confirmPopupSelector, editPopupNameInputSelector, editPopupDescriptionInputSelector} = settingObject;

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupSubmit from '../components/PopupSubmit';
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

const elementsList = new Section({items: [], renderer: (item) => {
  const card = new Card(item, elementsTemplateSelector, (evt) => {
      elementPopup.open(evt)
    },
    (evt, handlerDelete) => {
      confirmPopup.open(evt, handlerDelete)
    },
    (evt, cardId) => {
      if (evt.target.classList.contains('element__like_active')) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
            'Content-Type': 'application/json'
          }
        });
      } else {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
            'Content-Type': 'application/json'
          }
        });
      }
    });
  const element = card.createElement();
  return element;
}}, elementsListSelector);

fetch('https://mesto.nomoreparties.co/v1/cohort-39/cards', {
  headers: {
    authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach(item => {
      elementsList.setItem(item)
    })
  });

// Создание экземпляров классов

const editPopupFormValidator = new FormValidator(settingObject, editPopupForm);
editPopupFormValidator.enableValidation();

const addPopupFormValidator = new FormValidator(settingObject, addPopupForm);
addPopupFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(settingObject, editAvatarPopupForm);
editAvatarFormValidator.enableValidation();

const userInfo = new UserInfo(settingObject);

const editPopup = new PopupWithForm(editPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValues)
  })
    .then(res => res.json())
    .then(user => {
      userInfo.setUserInfo(user)
    })
    .then(() => {
      editPopup.close();
    });
});

const elementPopup = new PopupWithImage(elementPopupSelector);

const addPopup = new PopupWithForm(addPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return fetch('https://mesto.nomoreparties.co/v1/cohort-39/cards', {
    method: 'POST',
    headers: {
      authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValues)
  })
    .then(res => res.json())
    .then(card => {
      elementsList.setItem(card);
    })
    .then(() => {
      addPopup.close()
    });
});

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, (evt, inputValues) => {
  evt.preventDefault();
  return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValues)
  })
    .then(res => res.json())
    .then(user => {
      userInfo.setUserInfo(user);
    })
    .then(() => {
      return fetch(inputValues.avatar)
    })
    .finally(() => {
      editAvatarPopup.close();
    });
});

const confirmPopup = new PopupSubmit(confirmPopupSelector, () => {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-39/cards/${confirmPopup.currentId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a',
        'Content-Type': 'application/json'
      }
  })
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

fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me', {
  headers: {
    authorization: 'cd6a613e-5d59-4744-9a05-b0afb2ac5a0a'
  }
})
  .then(res => res.json())
  .then((result) => {
    userInfo.setUserInfo(result);
  });
