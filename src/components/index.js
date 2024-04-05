import "../styles/index.css";
import { initialCards } from "./cards.js";
import { likeCard, createCard, removeCard } from "./card.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Получаем элемент с классом 'places__list' */
const cardsContainer = document.querySelector(".places__list");

// Получаем всплывающий элемент и кнопку открывания
const popupTypeEdit = document.querySelector(".popup_type_edit");
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);

// Получаем всплывающий элемент и кнопку открывания
const popupNewCard = document.querySelector(".popup_type_new-card");
// Переменные для  добавление карточки с картинкой
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const addProfileButton = document.querySelector(".profile__add-button");
//Переменная для закрытия попапа
const buttonClosePopupEdit = popupTypeEdit.querySelector(".popup__close");
//Переменная для попапов
const popups = document.querySelectorAll(".popup");
// Находим форму в DOM
const editFormElementProfile = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = editFormElementProfile.querySelector(
  ".popup__input_type_name"
); // Воспользуйтесь инструментом .querySelector()
const jobInput = editFormElementProfile.querySelector(
  ".popup__input_type_description"
); // Воспользуйтесь инструментом .querySelector()
const formEditProfile = document.forms["edit-profile"];

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
// Переменные для Попапа картинки
const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

/* Перебираем каждую карточку в исходных карточках и добавляем ее в cardsContainer*/
initialCards.forEach(function (card) {
  /*Создаем новую карточку и добавляем ее в  cardsContainer*/
  const newCard = createCard(card, removeCard, likeCard, openCard);
  cardsContainer.appendChild(newCard);
});

// Вызов функции закрытия модального окна по клику на оверлей
setCloseModalByClickListeners(popups);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closeModal(popupTypeEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
//Константа поиска попапа создания карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
//Добавление карточки в начало и сама форма для добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const linkUrl = linkInput.value;

  const card = {
    name: placeName,
    link: linkUrl,
  };
  const cardClone = createCard(card, removeCard, likeCard, openCard);
  cardsContainer.prepend(cardClone);
  closeModal(popupAddCard);
  // Очистка полей формы
  newPlaceForm.reset();
}
newPlaceForm.addEventListener("submit", handleAddCardFormSubmit);
// Функция открытия Popup, Попап для картинки
export function openCard(evt) {
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
}
// Попап через кнопку плюс >>>
// Добавляем прослушиватель событий к кнопке открытия
addProfileButton.addEventListener("click", function () {
  // Открываем всплывающее окно
  openModal(popupNewCard);
});
// Добавьте прослушиватель событий к кнопке открытия
buttonOpenEditProfilePopup.addEventListener("click", function () {
  // Вставляем текущие данные профиля в инпуты формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupTypeEdit);
});
// //Зарытие модального окна по клику на крестик
// buttonClosePopupEdit.addEventListener("click", function () {
//   closeModal(popupTypeEdit);
// });
