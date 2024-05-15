import { addLikeCard, removeLikeCard, deleteNewCard } from "./api.js";
/* Получаем элемент шаблона с идентификатором 'card-template', а затем первый дочерний элемент .card*/
const templateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");
/* Создаем новый элемент карточки путем клонирования элемента шаблона и возвращаем его*/
export function createCard(
  card,
  deleteCard,
  likeCard,
  openCard,
  currentUserId
) {
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
  const cardId = card._id;
  // Добавляем прослушиватель событий к каждой картинке для открытия её
  cardImage.addEventListener("click", openCard);
  /**Получаем кнопку лайка по карточке */
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  cardLikeCount.textContent = card.likes.length;
  //Слушатель для кнопки лайка
  likeButton.addEventListener("click", function () {
    likeCard(likeButton, cardLikeCount, cardId);
  });
  const meLikeAdd = card.likes.some((like) => like._id === currentUserId);
  if (meLikeAdd) {
    likeButton.classList.add("card__like-button_is-active");
  }
  /*Получаем кнопку удаления и добавляем к ней прослушиватель событий, который вызывает функцию deleteCard при нажатии*/
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (card.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", function () {
      deleteCard(cardId, cardElement);
    });
  }
  /*Возвращаем элемент card*/
  return cardElement;
}
// Функция лайка
export function likeCard(likeButton, cardLikeCount, cardId) {
  const apiLike = likeButton.classList.contains("card__like-button_is-active")
    ? removeLikeCard
    : addLikeCard; // находим кнопку лайка
  apiLike(cardId)
    .then((data) => {
      cardLikeCount.textContent = data.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при нажатии лайка:", err);
    });
}
/* функция 'removeCard', которая удаляет ближайший элемент с классом 'card' при вызове.*/
export function deleteCard(cardId, cardElement) {
  deleteNewCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:" + "" + err);
    });
}
