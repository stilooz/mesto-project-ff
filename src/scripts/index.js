import '../pages/index.css';
import { initialCards, createCard } from '../components/cards.js';

// переменные карточек
const placesList = document.querySelector(".places__list");
const formAddCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
// работа с текстом внутри попапа карандаш
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile']
// переменные открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close')
const popups = document.querySelectorAll('.popup')

initialCards.forEach((card) =>
  placesList.append(createCard(card.name, card.link))
);

// открытие и закрытие попапа
function popupOpen(popup) {
  popup.classList.add('popup_is-opened');
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
  }
}

profileEditButton.addEventListener('click', () => {
  // заполнение текстовых полей попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  popupOpen(popupTypeEdit);
});

popupCloseButton.addEventListener('click', closeOpenedPopup);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOpenedPopup();
  }
});

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.classList.remove('popup_is-opened');
    }
  });
});

// текст в попапе карандаш
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeOpenedPopup();
});
