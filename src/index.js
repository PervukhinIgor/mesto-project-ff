import { createCard, deleteCard, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import { addCardOnServer, getCards, getUserInfo, updateUserAvatar, updateUserInfo} from './components/api.js';
import './pages/index.css';

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeUpdateAvatar = document.querySelector('.popup_type_update-avatar');

const buttonOpenPopupTypeNewCard = document.querySelector('.profile__add-button');
const buttonOpenPopupTypeEdit = document.querySelector('.profile__edit-button');

const profileForm = document.querySelector('[name="edit-profile"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileNameInput = profileForm.querySelector('[name="name"]');
const profileDescriptionInput = profileForm.querySelector('[name="description"]');

const profileAvatar = document.querySelector('.profile__image');
const updateAvatarForm = document.querySelector('[name="update-avatar"]');
const avatarUrlInput = updateAvatarForm.querySelector('[name="link"]');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');

const cardForm = document.querySelector('[name="new-place"]');
const placeInput = cardForm.querySelector('[name="place-name"]');
const linkInput = cardForm.querySelector('[name="link"]');

const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const avatarFormSubmitButton = updateAvatarForm.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

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
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileFormSubmitButton.textContent ='Сохранение...';
  profileFormSubmitButton.disabled = true;

  try {
    await updateUserInfo(profileNameInput.value, profileDescriptionInput.value);
    
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    profileFormSubmitButton.textContent = 'Сохранить';

    profileForm.reset(); 
    closePopup(popupTypeEdit); 
  } 
  catch (error) {
    profileFormSubmitButton.textContent = 'Сохранить';
    profileFormSubmitButton.disabled = false;
    console.error('Ошибка сохранения: ', error);
  }
}

// Обработка формы добавления картинки
async function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  cardFormSubmitButton.textContent ='Сохранение...';
  cardFormSubmitButton.disabled = true;

  try {
    await addCardOnServer(placeInput.value, linkInput.value)
      .then((cardData) => {
        const newCard = createCard(cardData, cardData.owner._id, deleteCard, handleLikeCard, openImagePopup);
        placesList.prepend(newCard);
      })

    cardFormSubmitButton.textContent = 'Сохранить';

    cardForm.reset();
    closePopup(popupTypeNewCard);
  } 
  catch (error) {
    cardFormSubmitButton.textContent = 'Сохранить';
    cardFormSubmitButton.disabled = false;
    console.error('Ошибка сохранения: ', error);
  }
}

// Обработка формы изменения автарки
async function handleUpdateAvatarFormSubmit(evt) {
  evt.preventDefault();

  avatarFormSubmitButton.textContent ='Сохранение...';
  avatarFormSubmitButton.disabled = true;

  try {
    await updateUserAvatar(avatarUrlInput.value)
    .then(() => {
      profileAvatar.style.backgroundImage = `url('${avatarUrlInput.value}')`;
    });

    avatarFormSubmitButton.textContent = 'Сохранить';

    updateAvatarForm.reset();
    closePopup(popupTypeUpdateAvatar);
  } 
  catch (error) {
    avatarFormSubmitButton.textContent = 'Сохранить';
    avatarFormSubmitButton.disabled = false;
    console.error('Ошибка сохранения: ', error);
  }
  
}

// Вывести карточки на страницу
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    
    const userId = userData._id;
    const cards = cardsData;

    cards.forEach((card) => {
      const newCard = createCard(card, userId, deleteCard, handleLikeCard, openImagePopup);
      placesList.appendChild(newCard);
    });
  })
  .catch((error) => {
    console.error('Ошибка при загрузке данных: ', error);
  });

// Открытие попапа с добавлением карточки 
buttonOpenPopupTypeNewCard.addEventListener('click', () => {
  //убираем сообщения валидации
  clearValidation(cardForm, validationConfig);
  openPopup(popupTypeNewCard)
});

// Открытие попапа с изменеием данных профиля
buttonOpenPopupTypeEdit.addEventListener('click', () => {
  clearValidation(popupTypeEdit, validationConfig);
  openPopup(popupTypeEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

// Открытие попапа с изменением автарки
profileAvatar.addEventListener('click', () => {
  clearValidation(popupTypeUpdateAvatar, validationConfig);
  openPopup(popupTypeUpdateAvatar);
})

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
updateAvatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

getUserInfo().then((data) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url('${data.avatar}')`;
});

enableValidation(validationConfig);