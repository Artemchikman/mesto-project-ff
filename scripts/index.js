// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list'); /*Вводим переменную и получаем доступ к классу places__list*/
const templateElement = document.querySelector('#card-template').content.querySelector('.card'); /*Вводим переменную и получаем доступ к шаблону карточек*/
function createCard(card, deleteCard) {
  const cardElement = templateElement.cloneNode(true); /*получаем Клон карточки template */
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
return cardElement;
}

function deleteElement(event) {  /*Функция для удаления карточек*/
event.target.closest('.card').remove();
}

initialCards.forEach(function(card){ /* Цикл который добавляет карточки */
  card = createCard(card, deleteElement);
  placesList.appendChild(card);
}) 