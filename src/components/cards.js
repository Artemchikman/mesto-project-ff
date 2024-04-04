import { openModal } from "./modal.js";
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  /*Получаем кнопку удаления и добавляем к ней прослушиватель событий, который вызывает функцию deleteCard при нажатии*/
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
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

// Попап для картинки
const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

export function openCard(evt) {
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
}
