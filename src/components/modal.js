export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal() {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
  }
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}