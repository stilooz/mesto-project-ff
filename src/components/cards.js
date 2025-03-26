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

//создание карточки
export const createCard = (name, link) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  deleteCardHandler(card);

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").setAttribute("src", link);
  card.querySelector(".card__image").setAttribute("alt", `фотография ${name}`);

  //кнопка лайка
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  })

  return card;
};

