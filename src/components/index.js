import "../styles/index.css";
import { likeCard, createCard, deleteCard } from "./card.js";
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  addNewCard,
  getEditProfile,
  getUserInfo,
  getCardInfo,
  updateAvatar,
} from "./api.js";

// Получаем элемент с классом 'places__list'
const cardsContainer = document.querySelector(".places__list");
// Получаем всплывающий элемент и кнопку открывания
const popupTypeEdit = document.querySelector(".popup_type_edit");
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
// Получаем всплывающий элемент и кнопку открывания
const popupNewCard = document.querySelector(".popup_type_new-card");
// Переменные для добавления карточки с картинкой
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const buttonAddProfile = document.querySelector(".profile__add-button");
const buttonSaveAddCard = popupNewCard.querySelector(".popup__button");
// Переменная для попапов
const popups = document.querySelectorAll(".popup");
// Переменные для редактирования профиля
const formEditElementProfile = document.querySelector(".popup__form");
const nameInput = formEditElementProfile.querySelector(".popup__input_type_name");
const descriptionInput = formEditElementProfile.querySelector(
  ".popup__input_type_description"
);
const formEditProfile = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
// Переменные для попапа картинки
const imagePopup = document.querySelector(".popup_type_image");
const imageInPopup = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const buttonSaveEditProfile = popupTypeEdit.querySelector(".popup__button");
// Переменные для редактирования аватара
const profileImage = document.querySelector(".profile__image");
const editAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = document.forms["avatar-profile"];
const buttonEditAvatar = editAvatar.querySelector(".popup__button");
const imageSection = document.querySelector(".profile__image-section");
// Функция загрузки
function loadingButtonSave(button, content) {
  button.textContent = content;
}

// Функция для изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(buttonEditAvatar, "Сохранение...");
  updateAvatar(evt.target.link.value)
    .then((data) => {
      profileImage.src = data.avatar; // Обновление изображения профиля
      closeModal(editAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.error("Ошибка при изменении аватара:", err);
    })
    .finally(() => {
      loadingButtonSave(buttonEditAvatar, "Сохранить");
    });
}
formEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
// Слушатель для открытия модального окна редактирования аватара и очистки полей
imageSection.addEventListener("click", function () {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openModal(editAvatar);
});
// Вызов функции закрытия модального окна по клику на оверлей
setCloseModalByClickListeners(popups);
// Функция обработчика редактирования формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(buttonSaveEditProfile, "Сохранение...");
  getEditProfile(evt.target.name.value, evt.target.description.value)
    .then((user) => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log("Ошибка при редактировании профиля:" + "" + err);
    })
    .finally(() => {
      loadingButtonSave(buttonSaveEditProfile, "Сохранить");
    });
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
// Константа поиска попапа создания карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
// Добавление карточки в начало и сама форма для добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(buttonSaveAddCard, "Сохранение...");
  const placeName = placeNameInput.value;
  const linkUrl = linkInput.value;
  addNewCard(placeName, linkUrl)
    .then((card) => {
      const cardClone = createCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        card.owner._id
      );
      cardsContainer.prepend(cardClone);
      newPlaceForm.reset();
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      loadingButtonSave(buttonSaveAddCard, "Сохранить");
    });
}
newPlaceForm.addEventListener("submit", handleAddCardFormSubmit);
// Функция открытия Popup, Попап для картинки
export function openCard(evt) {
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
}
// Попап через кнопку плюс
buttonAddProfile.addEventListener("click", function () {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupNewCard);
});
// Добавляем прослушиватель событий к кнопке открытия для профиля редактирования
buttonOpenEditProfilePopup.addEventListener("click", function () {
  // Получаем текущие значения полей профиля из разметки
  const currentName = profileName.textContent;
  const currentDescription = profileJob.textContent;
    nameInput.value = currentName;
  descriptionInput.value = currentDescription;
  console.log(nameInput.value);
  // Сброс валидации при открытии модального окна
  clearValidation(formEditProfile, validationConfig);
  // Открываем модальное окно профиля
  openModal(popupTypeEdit);
});

/***************************************** */
// Конфиг валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardInfo()])
  .then(([user, card]) => {
    // Обработка данных пользователя
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileImage.src = user.avatar;
    // Очищаем контейнер для карточек перед добавлением новых
    cardsContainer.innerHTML = "";
    // Добавляем карточки на страницу
    card.forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        user._id
      );
      cardsContainer.appendChild(newCard);
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки данных:", error);
  });