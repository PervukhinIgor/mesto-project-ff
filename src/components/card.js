// Находим шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, onDeleteCard, onLikeCard, onOpenImagePopup) {
  
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
  deleteButton.addEventListener('click', () => onDeleteCard(cardElement));

  // Обработчик события на кнопку лайка
  likeButton.addEventListener('click', () => onLikeCard(likeButton));
  
  // Обработчик события на картинке  
  cardImage.addEventListener('click', () => {
    onOpenImagePopup(cardData);
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