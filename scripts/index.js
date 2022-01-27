const page = document.querySelector('.page');

function switchPopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Инициализация
const elementsList = page.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const elementPopupTemplate = document.querySelector('#element-popup-template').content;

initialElements.forEach( item => {
  // Добавление карточки элемента
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementCaption = element.querySelector('.element__caption');
  const elementLikeButton = element.querySelector('.element__like');
  const elementDeleteButton = element.querySelector('.element__delete');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementCaption.textContent = item.name;

  elementLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  });
  elementDeleteButton.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  // Добавление всплывающего окна элемента
  const elementPopup = elementPopupTemplate.querySelector('.popup').cloneNode(true);
  const elementPopupImage = elementPopup.querySelector('.popup__element-image');
  const elementPopupCaption = elementPopup.querySelector('.popup__element-caption');
  const elementPopupCloseButton = elementPopup.querySelector('.popup__close-button');

  elementPopupImage.src = item.link;
  elementPopupImage.alt = item.name;
  elementPopupCaption.textContent = item.name;

  elementPopupCloseButton.addEventListener('click', () => {
    switchPopup(elementPopup);
  });

  // Открытие всплывающего окна элемента по клику на картинку
  elementImage.addEventListener('click', () => {
    elementPopup.classList.toggle('popup_opened');
  });

  elementsList.append(element);
  page.append(elementPopup);
});

// Всплывающие формы
const editPopup = page.querySelector('.popup_edit');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const editPopupForm = editPopup.querySelector('.popup__container');
const editPopupNameInput = editPopup.querySelector('.popup__input_type_name');
const editPopupDescriptionInput = editPopup.querySelector('.popup__input_type_description');

const addPopup = page.querySelector('.popup_add');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const addPopupForm = addPopup.querySelector('.popup__container');
const addPopupNameInput = addPopup.querySelector('.popup__input_type_name');
const addPopupLinkInput = addPopup.querySelector('.popup__input_type_link');

const profileName = page.querySelector('.profile__name');
const profileDesctiption = page.querySelector('.profile__description');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');

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

function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = editPopupNameInput.value;
  profileDesctiption.textContent = editPopupDescriptionInput.value;
  switchEditPopup();
}

function submitAddPopupForm(evt) {
  evt.preventDefault();
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementCaption = element.querySelector('.element__caption');

  elementImage.src = addPopupLinkInput.value;
  elementImage.alt = addPopupNameInput.value;
  elementCaption.textContent = addPopupNameInput.value;

  elementsList.prepend(element);
  switchAddPopup();
}

profileEditButton.addEventListener('click', switchEditPopup);
editPopupCloseButton.addEventListener('click', switchEditPopup);

profileAddButton.addEventListener('click', switchAddPopup);
addPopupCloseButton.addEventListener('click', switchAddPopup);

editPopupForm.addEventListener('submit', submitEditPopupForm);
addPopupForm.addEventListener('submit', submitAddPopupForm);
