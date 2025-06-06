import { deleteCardFromServer, unlikeCard, likeCard } from "./api";

// Находим шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, userId, onDeleteCard, onLikeCard, onOpenImagePopup) {
  
  // Клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим элементы внутри карточки, которые нужно заполнить данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter')
  
  // Заполняем элементы данными из cardData
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const isOwner = cardData.owner._id === userId;
  if (!isOwner) {
    deleteButton.remove();
  }

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
  likeButton.classList.add('card__like-button_is-active');
  }

  likeCounter.textContent = cardData.likes.length;

  // Обработчик события на кнопку удаления
  deleteButton.addEventListener('click', () => onDeleteCard(cardElement, cardData._id));

  // Обработчик события на кнопку лайка
  likeButton.addEventListener('click', () => onLikeCard(cardData._id, likeButton, likeCounter));
  
  // Обработчик события на картинке  
  cardImage.addEventListener('click', () => onOpenImagePopup(cardData));
  
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки: ', error)
    })
}

// Функция лайка карточки
export function handleLikeCard(cardId, likeButton, likesCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likeRequest = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  likeRequest
  .then((updatedCard) => {
    likesCounter.textContent = updatedCard.likes.length;
    likeButton.classList.toggle('card__like-button_is-active');
  })
  .catch((error) => {
    console.error('Ошбка при обновлении лайка: ', error);
  })
}