const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: '1b90838c-6394-4588-b4b1-865db972e903',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
};

export function updateUserInfo({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(checkResponse);
}

export function addCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
    .then(checkResponse);
}

export function updateAvatar({ avatar }) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
    .then(checkResponse);
};
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
}
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
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