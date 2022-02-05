const page = document.querySelector('.page');

const elementsList = page.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;

const editPopup = page.querySelector('.popup_type_edit');
const editPopupForm = document.forms.editPopupForm;
const editPopupNameInput = editPopupForm.elements.name;
const editPopupDescriptionInput = editPopupForm.elements.description;

const addPopup = page.querySelector('.popup_type_add');
const addPopupForm = document.forms.addPopupForm;
const addPopupNameInput = addPopupForm.elements.name;
const addPopupLinkInput = addPopupForm.elements.link;

const profileName = page.querySelector('.profile__name');
const profileDesctiption = page.querySelector('.profile__description');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');

const elementPopup = page.querySelector('.popup_type_element');
const elementPopupImage = elementPopup.querySelector('.popup__element-image');
const elementPopupCaption = elementPopup.querySelector('.popup__element-caption');

function handleEscPopupClosing(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function setEscPopupClosingEventListener() {
  document.addEventListener('keydown', handleEscPopupClosing);
}

function removeEscPopupClosingEventListener() {
  document.removeEventListener('keydown', handleEscPopupClosing);
}

function openPopup(popup) {
  // Установка обработчика закрытия всплывающего окна через Esc
  setEscPopupClosingEventListener();
  // Открытие всплывающего окна
  popup.classList.add('popup_opened');
}

function closePopup() {
  const popup = page.querySelector('.popup_opened');
  // Удаление обработчика закрытия всплывающего окна через Esc
  removeEscPopupClosingEventListener();
  // Закрытие всплывающего окна
  popup.classList.remove('popup_opened');
  // Скрытие ошибок полей ввода при закрытии всплывающего окна
  const formElement = popup.querySelector('.popup__form');
  if (formElement) {
    const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
    inputElements.forEach(inputElement => {
      hideInputError(formElement, inputElement, settingObject);
    });
  }
}

function openEditPopup() {
  editPopupNameInput.value = profileName.textContent;
  editPopupDescriptionInput.value = profileDesctiption.textContent;
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

function addElement(element) {
  // Функция добавляет верстку карточки на страницу
  elementsList.prepend(element);
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle('element__like_active');
}

function removeElement(evt) {
  const element = evt.target.closest('.element');
  element.remove();
}

function createElement(name, link) {
  // Функция возвращает верстку карточки элемента
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementCaption = element.querySelector('.element__caption');
  const elementLikeButton = element.querySelector('.element__like');
  const elementDeleteButton = element.querySelector('.element__delete');
  const elementImageLink = link;
  const elementName = name;
  elementImage.src = elementImageLink;
  elementImage.alt = elementName;
  elementCaption.textContent = elementName;
  elementLikeButton.addEventListener('click', toggleLikeButton);
  elementImage.addEventListener('click', openElementPopup);
  elementDeleteButton.addEventListener('click', removeElement);

  return element;
}

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileDesctiption.textContent = editPopupDescriptionInput.value;
  closePopup();
}

function submitAddPopupForm(evt) {
  evt.preventDefault();
  const element = createElement(addPopupNameInput.value, addPopupLinkInput.value);
  addElement(element);
  closePopup();
}

function handleOverlayPopupClosing(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

function setCloseButtonsEventListener() {
  const closeButtons = page.querySelectorAll('.popup__close-button');
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

setCloseButtonsEventListener();
setOverlayPopupClosingEventListener();

// Массив из файла initial-elements.js
initialElements.forEach( item => {
  const newElement = createElement(item.name, item.link);
  addElement(newElement);
});

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openAddPopup);

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
