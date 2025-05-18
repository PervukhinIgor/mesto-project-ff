import {initialCards} from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import './pages/index.css'

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const openPopupTypeNewCard = document.querySelector('.profile__add-button');
const openPopupTypeEdit = document.querySelector('.profile__edit-button');

const profileForm = document.querySelector('[name="edit-profile"]');
const cardForm = document.querySelector('[name="new-place"]');

const placesList = document.querySelector('.places__list');

// Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  // Создаем элемент карточки
  const newCard = createCard(cardData, deleteCard, likeCard);
  
  // Добавляем карточку в контейнер
  placesList.appendChild(newCard);
});

// Открытие попапа с добавлением карточки 
openPopupTypeNewCard.addEventListener('click', () => openPopup(popupTypeNewCard));

// Открытие попапа с изменеием данных профиля
openPopupTypeEdit.addEventListener('click', () => openPopup(popupTypeEdit));

// Открытие картинки в попапе
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
    popupImage.src = evt.target.dataset.fullImage || evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
  }
});

// Обработка формы с измененеим данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;
  const nameInput = document.querySelector('[name="name"]');
  const jobInput = document.querySelector('[name="description"]');

  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  profileForm.reset(); 
  closePopup(popupTypeEdit); 
}

// Обработка формы добавления картинки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const placeInput = cardForm.querySelector('[name="place-name"]');
  const linkInput = cardForm.querySelector('[name="link"]');

  const cardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  const newCard = createCard(cardData, deleteCard, likeCard);
  placesList.prepend(newCard);

  cardForm.reset();
  closePopup(popupTypeNewCard);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);