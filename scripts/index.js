const page = document.querySelector('.page');
const popUp = page.querySelector('.popup');
const editButton = page.querySelector('.profile__edit-button');
const closeButton = page.querySelector('.popup__close-button');

function switchPopUp() {
  popUp.classList.toggle('popup_opened');
}

editButton.addEventListener('click', switchPopUp);
closeButton.addEventListener('click', switchPopUp);
