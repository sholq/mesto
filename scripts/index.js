"use strict";

import {initialElements} from "./initial-elements.js";
import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import {settingObject} from "./setting-object.js";

const page = document.querySelector('.page');

const elementsList = page.querySelector('.elements__list');

const editPopup = page.querySelector('.popup_type_edit');
const editPopupForm = document.forms.editPopupForm;
const editPopupNameInput = editPopupForm.elements.name;
const editPopupDescriptionInput = editPopupForm.elements.description;

const addPopup = page.querySelector('.popup_type_add');
const addPopupForm = document.forms.addPopupForm;
const addPopupNameInput = addPopupForm.elements.name;
const addPopupLinkInput = addPopupForm.elements.link;

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');

export const elementPopup = page.querySelector('.popup_type_element');
export const elementPopupImage = elementPopup.querySelector('.popup__element-image');
export const elementPopupCaption = elementPopup.querySelector('.popup__element-caption');

function addElement(element) {
  elementsList.prepend(element);
}

function createNewCard(name, link) {
  return new Card(name, link, '#element-template');
}

function initiateElements(elements) {
  elements.forEach(item => {
    addElement(createNewCard(item.name, item.link).createElement());
  })
}

// Обработчики всплывающего элемента

export function openPopup(popup) {
  document.addEventListener('keydown', handleEscPopupClosing);
  popup.classList.add('popup_opened');
}

function openEditPopup() {
  editPopupNameInput.value = profileName.textContent;
  editPopupDescriptionInput.value = profileDescription.textContent;
  editPopupFormValidator.resetValidation();
  openPopup(editPopup);
}

function openAddPopup() {
  addPopupForm.reset();
  addPopupFormValidator.resetValidation();
  openPopup(addPopup);
}

function closePopup() {
  const popup = page.querySelector('.popup_opened');
  document.removeEventListener('keydown', handleEscPopupClosing);
  popup.classList.remove('popup_opened');

}

function handleEscPopupClosing(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleOverlayPopupClosing(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

// Обработчики форм

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileDescription.textContent = editPopupDescriptionInput.value;
  closePopup();
}

function submitAddPopupForm(evt) {
  evt.preventDefault();
  addElement(createNewCard(addPopupNameInput.value, addPopupLinkInput.value).createElement());
  closePopup();
}

// Функции установки слушателей

function setCloseButtonsEventListener() {
  const closeButtons = Array.from(page.querySelectorAll('.popup__close-button'));
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', closePopup)
  });
}

function setOverlayPopupClosingEventListener() {
  const popups = Array.from(page.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayPopupClosing);
  })
}

// Инициализация элементов и установка валидации форм

initiateElements(initialElements);

const editPopupFormValidator = new FormValidator(settingObject, editPopupForm);
editPopupFormValidator.enableValidation();

const addPopupFormValidator = new FormValidator(settingObject, addPopupForm);
addPopupFormValidator.enableValidation();

// Установка слушателей

setCloseButtonsEventListener();
setOverlayPopupClosingEventListener();

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
