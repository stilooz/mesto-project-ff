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