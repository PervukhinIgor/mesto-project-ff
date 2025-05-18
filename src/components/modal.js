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

// Закртие по клике вне контента
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});

// Закрытие попапов по крестику
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    closePopup(popup);
  });
});



