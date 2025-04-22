//удаление карточки через корзину
import { likeCard, unlikeCard } from './api.js';

//создание карточки
export const createCard = (cardData, onImageClick, userId, onDelete) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  if (cardData.owner && cardData.owner._id === userId) {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => {
      onDelete(card, cardData._id);
    });
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
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const action = isLiked ? unlikeCard : likeCard;

    action(cardData._id)
      .then(card => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch(err => {
        console.error('Ошибка лайка:', err);
      });
  });

  return card;
};