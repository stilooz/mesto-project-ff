import '../pages/index.css';
import { createCard } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
import {
  enableValidation,
  isValid,
  toggleButtonState,
  showInputError,
  hideInputError
} from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateAvatar, deleteCard } from '../components/api.js';
// переменные карточек и аватара
let userId;
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
const formAvatar = document.forms['update-avatar'];
const avatarLinkInput = formAvatar.elements['avatar'];
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');

// Добавление попапа подтверждения удаления карточки
const popupConfirmDelete = document.querySelector('.popup_type_confirm');
const popupConfirmCloseBtn = popupConfirmDelete.querySelector('.popup__close');

popupConfirmCloseBtn.addEventListener('click', () => closeModal());

popupConfirmDelete.addEventListener('click', (event) => {
  if (event.target === popupConfirmDelete) {
    closeModal();
  }
});

// редактирование профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const inputList = Array.from(formEditProfile.querySelectorAll('.popup__input'));
  const buttonElement = formEditProfile.querySelector('.popup__button');

  inputList.forEach(inputElement => {
    inputElement.setCustomValidity('');
    hideInputError(formEditProfile, inputElement, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
  });

  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: 'popup__button_disabled'
  });

  openModal(popupTypeEdit);
});

// Обработчик открытия формы обновления аватара
const profileImageContainer = document.querySelector('.profile__image');
profileImageContainer.addEventListener('click', () => {
  const inputList = Array.from(formAvatar.querySelectorAll('.popup__input'));
  const buttonElement = formAvatar.querySelector('.popup__button');

  inputList.forEach(inputElement => {
    hideInputError(formAvatar, inputElement, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
  });

  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: 'popup__button_disabled'
  });

  formAvatar.reset();
  openModal(avatarPopup);
});

// Обработчик отправки формы обновления аватара
formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  updateAvatar({ avatar: avatarLinkInput.value })
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal();
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    });
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addCard({ name, link })
    .then((cardData) => {
      const newCard = createCard(cardData, handleCardClick, userId);
      placesList.prepend(newCard);
      closeModal();
      formAddCard.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    });
});
//открытие формы новой карточки
addButton.addEventListener('click', () => {
  const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
  const buttonElement = formAddCard.querySelector('.popup__button');

  inputList.forEach(inputElement => {
    hideInputError(formAddCard, inputElement, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
  });

  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: 'popup__button_disabled'
  });

  openModal(popupAddCard);
});;

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

  updateUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal();
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    });
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach(card => {
      const cardElement = createCard(card, handleCardClick, userId);
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });
