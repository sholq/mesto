const page = document.querySelector('.page');

const elementsList = page.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;

const editPopup = page.querySelector('.popup_edit');
const editPopupForm = editPopup.querySelector('.popup__container');
const editPopupNameInput = editPopup.querySelector('.popup__input_type_name');
const editPopupDescriptionInput = editPopup.querySelector('.popup__input_type_description');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');

const addPopup = page.querySelector('.popup_add');
const addPopupForm = addPopup.querySelector('.popup__container');
const addPopupNameInput = addPopup.querySelector('.popup__input_type_name');
const addPopupLinkInput = addPopup.querySelector('.popup__input_type_link');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');

const profileName = page.querySelector('.profile__name');
const profileDesctiption = page.querySelector('.profile__description');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');

const elementPopup = page.querySelector('.popup_element');
const elementPopupImage = elementPopup.querySelector('.popup__element-image');
const elementPopupCaption = elementPopup.querySelector('.popup__element-caption');
const elementPopupCloseButton = elementPopup.querySelector('.popup__close-button');

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function switchEditPopup() {
  if (!editPopup.classList.contains('popup_opened')) {
    editPopupNameInput.value = profileName.textContent;
    editPopupDescriptionInput.value = profileDesctiption.textContent;
  }
  switchPopup(editPopup);
}

function switchAddPopup() {
  if (!addPopup.classList.contains('popup_opened')) {
    addPopupNameInput.value = '';
    addPopupLinkInput.value = '';
  }
  switchPopup(addPopup);
}

function switchElementPopup(image) {
  if (!elementPopup.classList.contains('popup_opened')) {
    const elementImageLink = image.src;
    const elementImageName = image.alt;

    elementPopupImage.src = elementImageLink;
    elementPopupImage.alt = elementImageName;
    elementPopupCaption.textContent = elementImageName;
  }
  switchPopup(elementPopup);
}

function addElement(element) {
  // Функция добавляет верстку карточки на страницу
  elementsList.prepend(element);
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

  elementLikeButton.addEventListener('click', () => {
    elementLikeButton.classList.toggle('element__like_active');
  });

  elementImage.addEventListener('click', () => {
    switchElementPopup(elementImage);
  });

  elementDeleteButton.addEventListener('click', () => {
    element.remove();
  });

  return element;
}

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileDesctiption.textContent = editPopupDescriptionInput.value;
  switchEditPopup();
}

function submitAddPopupForm(evt) {
  evt.preventDefault();
  const element = createElement(addPopupNameInput.value, addPopupLinkInput.value);
  addElement(element);
  switchAddPopup();
}

// Массив из файла initial-elements.js
initialElements.forEach( item => {
  const newElement = createElement(item.name, item.link);
  addElement(newElement);
});

profileEditButton.addEventListener('click', switchEditPopup);
profileAddButton.addEventListener('click', switchAddPopup);

editPopupCloseButton.addEventListener('click', switchEditPopup);
addPopupCloseButton.addEventListener('click', switchAddPopup);
elementPopupCloseButton.addEventListener('click', switchElementPopup)

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
