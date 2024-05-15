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
const buttonSaveAddCard = popupNewCard.querySelector(".popup__button");
//Переменная для попапов
const popups = document.querySelectorAll(".popup");
/*==================================================================================*/
/*Переменные для редактирвоания профиля*/
//Получаем форму редактирования профиля
const FormEditElementProfile = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = FormEditElementProfile.querySelector(
  ".popup__input_type_name"
); // Воспользуйтесь инструментом .querySelector()
const jobInput = FormEditElementProfile.querySelector(
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
const buttonSaveEditProfile = popupTypeEdit.querySelector(".popup__button");

//=================================================================================//
/*  Переменные для редактирования Аватара */
const profileImage = document.querySelector(".profile__image");
const editAvatar = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.forms["avatar-profile"];
const avatarInput = document.querySelector(".popup__input_type_avatar");
const buttonEditAvatar = editAvatar.querySelector(".popup__button");
const imageSection = document.querySelector(".profile__image-section");
//Функция загрузки
function loadingButtonSave(loading, button, content) {
  button.textContent = loading ? content : "";
};

/*Функция для изменения аватара*/
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  // const avatarUrl = avatarInput.value;
  loadingButtonSave(true, buttonEditAvatar, "Сохранение...");
  updateAvatar(evt.target.link.value)
    .then((data) => {
      profileImage.src = data.avatar; // Обновление изображения профиля
      closeModal(editAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при изменении аватара:", err);
    })
    .finally(() => {
      loadingButtonSave(false, buttonEditAvatar, "Сохранение...");
    });
}
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
/* Слушатель для открытия модального окна редактирования аватара и очистки полей */
imageSection.addEventListener("click", function () {
  avatarInput.value = "";
  openModal(editAvatar);
});

// Вызов функции закрытия модального окна по клику на оверлей
setCloseModalByClickListeners(popups);

/* Функция обработчика редактирования формы профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonSaveEditProfile, "Сохранение...");
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
      loadingButtonSave(false, buttonSaveEditProfile, "Сохранение...");
    });
};

// Прикрепляем обработчик к форме: // он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
//Константа поиска попапа создания карточки
const popupAddCard = document.querySelector(".popup_type_new-card");

//Добавление карточки в начало и сама форма для добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonSaveAddCard, "Сохранение...");
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
      loadingButtonSave(false, buttonSaveAddCard, "Сохранение...");
      closeModal(popupNewCard);
    });
};

newPlaceForm.addEventListener("submit", handleAddCardFormSubmit);
// Функция открытия Popup, Попап для картинки
export function openCard(evt) {
  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
};
// Попап через кнопку плюс >>>
// Добавляем прослушиватель событий к кнопке открытия
addProfileButton.addEventListener("click", function () {
  // Открываем всплывающее окно
  openModal(popupNewCard);
});
// Добавьте прослушиватель событий к кнопке открытия для профиля редактирования
buttonOpenEditProfilePopup.addEventListener("click", function () {
  getUserInfo()
    .then((userData) => {
      // Открываем модальное окно профиля и передаем данные пользователя
      openModal(popupTypeEdit, userData);
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных пользователя:", error);
      // Если возникла ошибка, открываем модальное окно профиля без данных пользователя
      openModal(popupTypeEdit, null);
    });
  clearValidation(formEditProfile, validationConfig);
  // openModal(popupTypeEdit);
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
// let userId;
Promise.all([getUserInfo(), getCardInfo()])
  .then(([user, card]) => {
    //обработка данных пользователя
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileImage.src = user.avatar;
    // userId = user._id;
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
