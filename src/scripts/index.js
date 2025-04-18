import '../pages/index.css';
import { createCard } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
import {
  enableValidation,
  isValid,
  toggleButtonState,
  showInputError,
  hideInputError,
  resetValidation
} from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateAvatar, deleteCard } from '../components/api.js';

// переменные карточек и аватара
let userId;
let cardToDelete = null;
let cardIdToDelete = null;

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
const popupConfirmForm = popupConfirmDelete.querySelector('form');

popupConfirmCloseBtn.addEventListener('click', () => closeModal());

popupConfirmDelete.addEventListener('click', (event) => {
  if (event.target === popupConfirmDelete) {
    closeModal();
  }
});

function handleDelete(card, cardId) {
  cardToDelete = card;
  cardIdToDelete = cardId;
  openModal(popupConfirmDelete);
}

popupConfirmForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirmDelete);
    })
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
});

// редактирование профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  resetValidation(formEditProfile, validationConfig);

  openModal(popupTypeEdit);
});

// Обработчик открытия формы обновления аватара
const profileImageContainer = document.querySelector('.profile__image');
profileImageContainer.addEventListener('click', () => {
  resetValidation(formAvatar, validationConfig);

  formAvatar.reset();
  openModal(avatarPopup);
});

// Обработчик отправки формы обновления аватара
formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = formAvatar.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  updateAvatar({ avatar: avatarLinkInput.value })
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal();
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const submitButton = formAddCard.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  addCard({ name, link })
    .then((cardData) => {
      const newCard = createCard(cardData, handleCardClick, userId, handleDelete);
      placesList.prepend(newCard);
      closeModal();
      formAddCard.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
//открытие формы новой карточки
addButton.addEventListener('click', () => {
  resetValidation(formAddCard, validationConfig);

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
  const submitButton = formEditProfile.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

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
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach(card => {
      const cardElement = createCard(card, handleCardClick, userId, handleDelete);
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });
