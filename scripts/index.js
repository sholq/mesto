const page = document.querySelector('.page');

// Всплывающая форма
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

function editPopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const editPopupNameInputValue = editPopupNameInput.value;
  const editPopupDescriptionInputValue = editPopupDescriptionInput.value;
  profileName.textContent = editPopupNameInputValue;
  profileDesctiption.textContent = editPopupDescriptionInputValue;
  switchEditPopup();
}

profileEditButton.addEventListener('click', switchEditPopup);
editPopupCloseButton.addEventListener('click', switchEditPopup);

profileAddButton.addEventListener('click', switchAddPopup);
addPopupCloseButton.addEventListener('click', switchAddPopup);

editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);
// addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = page.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;

initialCards.forEach( item => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__caption').textContent = item.name;
  elementsList.append(element);
});

// Кнопка лайк
let likeButtons = page.querySelectorAll('.element__like');

function switchLike(like) {
  like.classList.toggle('element__like_active');
}

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', () => {
    switchLike(likeButtons[i]);
  });
}
