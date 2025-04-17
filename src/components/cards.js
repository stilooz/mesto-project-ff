import { closeModal } from './modal.js';
import { deleteCard, likeCard, unlikeCard } from './api.js';
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

//удаление карточки через корзину
export const deleteCardHandler = (card, cardId) => {
  const deleteButtonCard = card.querySelector(".card__delete-button");
  deleteButtonCard.addEventListener("click", () => {
    const popupConfirm = document.querySelector('.popup_type_confirm');
    const confirmForm = popupConfirm.querySelector('form');

    const handleConfirm = (evt) => {
      evt.preventDefault();
      deleteCard(cardId)
        .then(() => {
          card.remove();
          closeModal(popupConfirm);
        })
        .catch(err => {
          console.error('Ошибка при удалении карточки:', err);
        });
    };

    // Сбросить старый обработчик перед установкой нового
    confirmForm.removeEventListener('submit', handleConfirm);
    confirmForm.addEventListener('submit', handleConfirm);

    popupConfirm.classList.add('popup_is-opened');
  });
};

export const setLikeHandler = (button, cardId, likeCounter) => {
  button.addEventListener('click', () => {
    const isLiked = button.classList.contains('card__like-button_is-active');
    const action = isLiked ? unlikeCard : likeCard;

    action(cardId)
      .then(card => {
        button.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch(err => {
        console.error('Ошибка при изменении лайка:', err);
      });
  });
};

//создание карточки
export const createCard = (cardData, onImageClick, userId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  if (cardData.owner && cardData.owner._id === userId) {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.style.display = 'block';
    deleteCardHandler(card, cardData._id);
  } else {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.remove();
  }
  const cardImage = card.querySelector('.card__image');
  card.querySelector(".card__title").textContent = cardData.name;

  const likeCounter = card.querySelector('.card__like-count');
  likeCounter.textContent = cardData.likes.length;
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", `фотография ${cardData.name}`);
  cardImage.addEventListener('click', () => {
    onImageClick(cardData.name, cardData.link);
  });

  //кнопка лайка
  const likeButton = card.querySelector('.card__like-button');
  setLikeHandler(likeButton, cardData._id, likeCounter);

  return card;
};