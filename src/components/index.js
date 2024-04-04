import "../styles/index.css";
import {
  initialCards,
  likeCard,
  createCard,
  removeCard,
  openCard,
} from "./cards.js";
import { openModal, closeModal } from "./modal.js";
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Получаем элемент с классом 'places__list' */
const placesList = document.querySelector(".places__list");

/* Перебираем каждую карточку в исходных карточках и добавляем ее в placesList*/
initialCards.forEach(function (card) {
  /*Создаем новую карточку и добавляем ее в  placesList*/
  const newCard = createCard(card, removeCard, likeCard, openCard);
  placesList.appendChild(newCard);
});

// Получаем всплывающий элемент и кнопку открывания
const popupTypeEdit = document.querySelector(".popup_type_edit");
const opener = document.querySelector(".profile__edit-button");

// Добавьте прослушиватель событий к кнопке открытия
opener.addEventListener("click", function () {
  openModal(popupTypeEdit);
});

const closePopupEdit = popupTypeEdit.querySelector(".popup__close");
closePopupEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated"); //Плавная анимация
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(evt.target.closest(".popup"));
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(evt.target.closest(".popup"));
    }
  });
});

// Попап через кнопку плюс >>>
// Получаем всплывающий элемент и кнопку открывания
const popupNewCard = document.querySelector(".popup_type_new-card");
const addProfileButton = document.querySelector(".profile__add-button");

// Добавляем прослушиватель событий к кнопке открытия
addProfileButton.addEventListener("click", function () {
  // Открываем всплывающее окно
  openModal(popupNewCard);
});

// Добавляем прослушиватель событий к каждой картинке для открытия её
const cardImages = document.querySelectorAll(".card__image");
cardImages.forEach(function (image) {
  image.addEventListener("click", openCard);
});

// Находим форму в DOM
const formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const formEditProfile = document.forms["edit-profile"];

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closeModal(evt.target.closest(".popup"));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleFormSubmit);

// Функция и добавление карточки с картинкой
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");

//Добавление карточки в начало и сама форма для добавления карточки
function addCard(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const linkUrl = linkInput.value;

  const card = {
    name: placeName,
    link: linkUrl,
  };

  const cardClone = createCard(card, removeCard, likeCard);
  placesList.prepend(cardClone);
  closeModal(newPlaceForm.closest(".popup"));
}
newPlaceForm.addEventListener("submit", addCard);

// Слушатель на кнопке лайка
const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((button) => {
  button.addEventListener("click", likeCard);
});
