import { initialCards } from './components/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import './pages/index.css'

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const buttonOpenPopupTypeNewCard = document.querySelector('.profile__add-button');
const buttonOpenPopupTypeEdit = document.querySelector('.profile__edit-button');

const profileForm = document.querySelector('[name="edit-profile"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = profileForm.querySelector('[name="name"]');
const profileDescriptionInput = profileForm.querySelector('[name="description"]');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');

const cardForm = document.querySelector('[name="new-place"]');
const placeInput = cardForm.querySelector('[name="place-name"]');
const linkInput = cardForm.querySelector('[name="link"]');

const placesList = document.querySelector('.places__list');

function openImagePopup(cardData) {
  // Заполняем попап данными из карточки
  popupImage.src = cardData.link;
  popupImage.alt = `Увеличенное изображение ${cardData.name}`;
  popupImageCaption.textContent = cardData.name;
  
  // Открываем попап
  openPopup(popupTypeImage);
}

// Обработка формы с измененеим данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  profileForm.reset(); 
  closePopup(popupTypeEdit); 
}

// Обработка формы добавления картинки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);
  placesList.prepend(newCard);

  cardForm.reset();
  closePopup(popupTypeNewCard);
}

// Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  // Создаем элемент карточки
  const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);
  
  // Добавляем карточку в контейнер
  placesList.appendChild(newCard);
});

// Открытие попапа с добавлением карточки 
buttonOpenPopupTypeNewCard.addEventListener('click', () => openPopup(popupTypeNewCard));

// Открытие попапа с изменеием данных профиля
buttonOpenPopupTypeEdit.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

// Закртие по клику вне контента
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

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);