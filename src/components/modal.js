export function openPopup(popup) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', closeByEscacpe);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscacpe);
}

export function closeByEscacpe(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}




