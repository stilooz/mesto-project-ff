import '../pages/index.css';
import { initialCards, createCard } from '../components/cards.js';

// переменные карточек
const placesList = document.querySelector(".places__list");
const formAddCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const popupAddButton = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
// работа с текстом внутри попапа карандаш
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile']
// переменные открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')

initialCards.forEach((card) =>
  placesList.append(createCard(card.name, card.link, handleCardClick)));

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

//редактирование профиля
profileEditButton.addEventListener('click', () => {
  // заполнение текстовых полей попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  popupOpen(popupTypeEdit);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard(name, link, handleCardClick);
  closeOpenedPopup();
  formAddCard.reset();
});

//открытие формы новой карточки
addButton.addEventListener('click', () => {
  popupOpen(popupAddButton)
});
//закрытие попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closeOpenedPopup);
});

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

function handleCardClick(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = `Фотография ${name}`;
  popupImageCaption.textContent = name;
  popupOpen(popupImage);
}