import '../pages/index.css';
import { initialCards } from './cards.js';

const placesList = document.querySelector(".places__list");

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
