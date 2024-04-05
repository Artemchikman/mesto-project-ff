/* Получаем элемент шаблона с идентификатором 'card-template', а затем первый дочерний элемент .card*/
const templateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");
/* Создаем новый элемент карточки путем клонирования элемента шаблона и возвращаем его*/
export function createCard(card, deleteCard, likeCard, openCard) {
  //Функция создания карточки
  /* Клонирует элемент шаблона*/
  const cardElement = templateElement.cloneNode(true);
  /*Устанавливаем текстовое содержимое заголовка карточки на название карточки*/
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;
  /* Устанавливаем атрибуты source и alt изображения карты для ссылки на карту и ее названия */
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  /*Получаем кнопку удаления и добавляем к ней прослушиватель событий, который вызывает функцию deleteCard при нажатии*/
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  /**Получаем кнопку лайка по картчоке */
  const likeButtons = cardElement.querySelector(".card__like-button");
  likeButtons.addEventListener("click", likeCard);
  // Добавляем прослушиватель событий к каждой картинке для открытия её
  cardImage.addEventListener("click", openCard);
  /*Возвращаем элемент card*/
  return cardElement;
}

// Функция лайка
export function likeCard(evt) {
  const currentLike = evt.target.closest(".card__like-button"); // находим кнопку лайка
  currentLike.classList.toggle("card__like-button_is-active");
}
/* функция 'removeCard', которая удаляет ближайший элемент с классом 'card' при вызове.*/
export function removeCard(event) {
  event.target.closest(".card").remove();
}