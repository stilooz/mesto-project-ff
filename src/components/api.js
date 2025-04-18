function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
export function getUserInfo() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me', {
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(checkResponse);
};

export function getInitialCards() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/cards', {
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(checkResponse);
};

export function updateUserInfo({ name, about }) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  })
    .then(checkResponse);
}

export function addCard({ name, link }) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/cards', {
    method: 'POST',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  })
    .then(checkResponse);
}

export function updateAvatar({ avatar }) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar })
  })
    .then(checkResponse);
};
export function deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-36/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(checkResponse);
}
export function likeCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-36/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(checkResponse);
}

export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
}

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

export function resetValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}