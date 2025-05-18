// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback) {
  // Находим шаблон карточки
  const cardTemplate = document.querySelector('#card-template').content;
  
  // Клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим элементы внутри карточки, которые нужно заполнить данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  // Заполняем элементы данными из cardData
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Обработчик события на кнопку удаления
  deleteButton.addEventListener('click', function() {
    deleteCallback(cardElement);
  });

  // Обработчик события на кнопку лайка
  likeButton.addEventListener('click', function() {
    likeCallback(likeButton);
  });
  
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}