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
export const deleteCardHandler = (card) => {
  const deleteButtonCard = card.querySelector(".card__delete-button");
  deleteButtonCard.addEventListener(
    "click",
    () => {
      card.remove();
    },
    { once: true }
  );
};

export const setLikeHandler = (button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('card__like-button_is-active');
  });
};

//создание карточки
export const createCard = (name, link, onImageClick, likes = []) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  deleteCardHandler(card);
  const cardImage = card.querySelector('.card__image');
  card.querySelector(".card__title").textContent = name;

  const likeCounter = card.querySelector('.card__like-count');
  likeCounter.textContent = likes.length;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", `фотография ${name}`);
  cardImage.addEventListener('click', () => {
    onImageClick(name, link);
  });

  //кнопка лайка
  const likeButton = card.querySelector('.card__like-button');
  setLikeHandler(likeButton);

  return card;
};

