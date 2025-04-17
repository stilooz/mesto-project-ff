export function getUserInfo() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/users/me', {
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function getInitialCards() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-36/cards', {
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};
export function deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-36/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
export function likeCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-36/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function unlikeCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-36/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1b90838c-6394-4588-b4b1-865db972e903'
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}