// Функция создания карточки
function createCard(cardData, deleteCallback) {
  // Находим шаблон карточки
  const cardTemplate = document.querySelector('#card-template').content;
  
  // Клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим элементы внутри карточки, которые нужно заполнить данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  // Заполняем элементы данными из cardData
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Добавляем обработчик события на кнопку удаления
  deleteButton.addEventListener('click', function() {
      deleteCallback(cardElement);
  });
  
  // Возвращаем готовый элемент карточки
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach(function(cardData) {
  // Создаем элемент карточки
  const newCard = createCard(cardData, deleteCard);
  
  // Добавляем карточку в контейнер
  placesList.appendChild(newCard);
});