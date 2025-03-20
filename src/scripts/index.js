import './pages/index.css';

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
  //   const deleteButtonCard = card.querySelector(".card__delete-button");

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").setAttribute("src", link);
  card.querySelector(".card__image").setAttribute("alt", `фотография ${name}`);

  //   deleteButtonCard.addEventListener(
  //     "click",
  //     () => {
  //       card.remove();
  //     },
  //     { once: true }
  //   );

  return card;
};

initialCards.forEach((card) =>
  placesList.append(addCard(card.name, card.link))
);
