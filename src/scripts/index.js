import '../pages/index.css';
import { initialCards, createCard } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
// переменные карточек
const placesList = document.querySelector(".places__list");
const formAddCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
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


//редактирование профиля
profileEditButton.addEventListener('click', () => {
  // заполнение текстовых полей попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard(name, link, handleCardClick);
  placesList.prepend(newCard);
  closeModal();
  formAddCard.reset();
});

//открытие формы новой карточки
addButton.addEventListener('click', () => {
  openModal(popupAddCard)
});

function handleCardClick(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = `Фотография ${name}`;
  popupImageCaption.textContent = name;
  openModal(popupImage);
}
//закрытие попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});


popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closeModal();
    }
  });
});

// текст в попапе карандаш
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal();
});

