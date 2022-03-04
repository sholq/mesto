"use strict";

import {initialElements} from "./initial-elements.js";
import Card from "./card.js"
import FormValidator from "./validate.js";
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

const elementPopup = page.querySelector('.popup_type_element');
const elementPopupImage = elementPopup.querySelector('.popup__element-image');
const elementPopupCaption = elementPopup.querySelector('.popup__element-caption');

function addElement(element) {
  elementsList.prepend(element);
}

function initiateElements(elements) {
  elements.forEach(item => {
    const element = new Card(item, '#element-template');
    addElement(element.createElement());
  })
}

function setFormValidation() {
  const forms = Array.from(document.querySelectorAll(settingObject.formSelector));
  forms.forEach(item => {
    const form = new FormValidator(settingObject, item);
    form.enableValidation();
  });
}

// Обработчики всплывающего элемента

function openPopup(popup) {
  document.addEventListener('keydown', handleEscPopupClosing);
  popup.classList.add('popup_opened');
}

function openEditPopup() {
  editPopupNameInput.value = profileName.textContent;
  editPopupDescriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
}

function openAddPopup() {
  addPopupNameInput.value = '';
  addPopupLinkInput.value = '';
  openPopup(addPopup);
}

function openElementPopup(evt) {
  const image = evt.target;
  const elementImageLink = image.src;
  const elementImageName = image.alt;
  elementPopupImage.src = elementImageLink;
  elementPopupImage.alt = elementImageName;
  elementPopupCaption.textContent = elementImageName;
  openPopup(elementPopup);
}

function closePopup() {
  const popup = page.querySelector('.popup_opened');
  document.removeEventListener('keydown', handleEscPopupClosing);
  popup.classList.remove('popup_opened');
  const formElement = popup.querySelector('.popup__form');
  if (formElement) {
    const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
    inputElements.forEach(inputElement => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(settingObject.invalidInputClass);
      errorElement.classList.remove(settingObject.activeErrorClass);
      errorElement.textContent = '';
    });
  }
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
  const element = new Card(addPopupNameInput.value, addPopupLinkInput.value);
  addElement(element.createElement());
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

function setCardImageEventListener() {
  const images = Array.from(page.querySelectorAll('.element__image'));
  images.forEach(image => {
    image.addEventListener('click', openElementPopup)
  });
}

// Инициализация элементов и установка валидации форм

initiateElements(initialElements);
setFormValidation();

// Установка слушателей

setCloseButtonsEventListener();
setOverlayPopupClosingEventListener();
setCardImageEventListener();

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
