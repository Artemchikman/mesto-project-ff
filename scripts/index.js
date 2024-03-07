// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

/*Возвращаем элемент с классом 'places__list' */
const placesList = document.querySelector(".places__list");

/* Получаем элемент шаблона с идентификатором 'card-template', а затем первый дочерний элемент .card*/
const templateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/* Создаем новый элемент карточки путем клонирования элемента шаблона и возвращаем его*/
function createCard(card, deleteCard) {
  /* Клонирует элемент шаблона*/
  const cardElement = templateElement.cloneNode(true);

  /*Устанавливаем текстовое содержимое заголовка карточки на название карточки*/
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  /* Устанавливаем атрибуты source и alt изображения карты для ссылки на карту и ее названия */
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);

  /*Получаем кнопку удаления и добавляем к ней прослушиватель событий, который вызывает функцию deleteCard при нажатии*/
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  /*Возвращаем элемент card*/
  return cardElement;
}

/* Удаляем ближайший элемент .card при вызове*/
function deleteElement(event) {
  event.target.closest(".card").remove();
}

/* Перебираем каждую карточку в исходных карточках и добавляем ее в placesList*/
initialCards.forEach(function (card) {
  /*Создаем новую карточку и добавляем ее в  placesList*/
  const newCard = createCard(card, deleteElement);
  placesList.appendChild(newCard);
});
