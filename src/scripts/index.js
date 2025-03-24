import '../pages/index.css';
import { initialCards } from './cards.js';

// переменные карточек
const placesList = document.querySelector(".places__list");
// работа с текстом внутри попапа карандаш
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile']
// переменные открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__close')
const popups = document.querySelectorAll('.popup')

// удаление карточек
const deleteCardHandler = (card) => {
  const deleteButtonCard = card.querySelector(".card__delete-button");
  deleteButtonCard.addEventListener(
    "click",
    () => {
      card.remove();
    },
    { once: true }
  );
};

const addCard = (name, link) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  deleteCardHandler(card);

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").setAttribute("src", link);
  card.querySelector(".card__image").setAttribute("alt", `фотография ${name}`);

  return card;
};

initialCards.forEach((card) =>
  placesList.append(addCard(card.name, card.link))
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
  descriptionInput.value = profileDescription.textContent;
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
