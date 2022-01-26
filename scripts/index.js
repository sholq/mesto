const page = document.querySelector('.page');

// Инициализация
const elementsList = page.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;

initialElements.forEach( item => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__caption').textContent = item.name;
  element.querySelector('.element__like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  })
  elementsList.append(element);
});

// Всплывающие формы
const editPopup = page.querySelector('.edit-popup');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const editPopupForm = editPopup.querySelector('.popup__container');
const editPopupNameInput = editPopup.querySelector('.popup__input_type_name');
const editPopupDescriptionInput = editPopup.querySelector('.popup__input_type_description');

const addPopup = page.querySelector('.add-popup');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const addPopupForm = addPopup.querySelector('.popup__container');
const addPopupNameInput = addPopup.querySelector('.popup__input_type_name');
const addPopupLinkInput = addPopup.querySelector('.popup__input_type_link');

const profileName = page.querySelector('.profile__name');
const profileDesctiption = page.querySelector('.profile__description');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');


function switchEditPopup() {
  if (!editPopup.classList.contains('popup__opened')) {
    editPopupNameInput.value = profileName.textContent;
    editPopupDescriptionInput.value = profileDesctiption.textContent;
  }
  editPopup.classList.toggle('popup_opened');
}

function switchAddPopup() {
  if (!addPopup.classList.contains('popup__opened')) {
    addPopupNameInput.value = '';
    addPopupLinkInput.value = '';
  }
  addPopup.classList.toggle('popup_opened');
}

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileDesctiption.textContent = editPopupDescriptionInput.value;
  switchEditPopup();
}

function submitAddPopupForm(evt) {
  evt.preventDefault();
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = addPopupLinkInput.value;
  element.querySelector('.element__image').alt = addPopupNameInput.value;
  element.querySelector('.element__caption').textContent = addPopupNameInput.value;
  elementsList.prepend(element);
  switchAddPopup();
}

profileEditButton.addEventListener('click', switchEditPopup);
editPopupCloseButton.addEventListener('click', switchEditPopup);

profileAddButton.addEventListener('click', switchAddPopup);
addPopupCloseButton.addEventListener('click', switchAddPopup);

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
