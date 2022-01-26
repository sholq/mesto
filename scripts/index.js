let page = document.querySelector('.page');

// Всплывающая форма
let popup = page.querySelector('.popup');
let profileEditButton = page.querySelector('.profile__edit-button');
let popupCloseButton = page.querySelector('.popup__close-button');
let popupForm = page.querySelector('.popup__container');
let popupNameInput = page.querySelector('.popup__input_type_name');
let popupDescriptionInput = page.querySelector('.popup__input_type_description');
let profileName = page.querySelector('.profile__name');
let profileDesctiption = page.querySelector('.profile__description');

function switchPopup() {
  if (!popup.classList.contains('popup__opened')) {
    popupNameInput.value = profileName.textContent;
    popupDescriptionInput.value = profileDesctiption.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function popupFormSubmitHandler (evt) {
  evt.preventDefault();
  let popupNameInputValue = popupNameInput.value;
  let popupDescriptionInputValue = popupDescriptionInput.value;
  profileName.textContent = popupNameInputValue;
  profileDesctiption.textContent = popupDescriptionInputValue;
  switchPopup();
}

profileEditButton.addEventListener('click', switchPopup);
popupCloseButton.addEventListener('click', switchPopup);
popupForm.addEventListener('submit', popupFormSubmitHandler);

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
