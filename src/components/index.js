import "../styles/index.css"; 
import { initialCards } from "./cards.js"; 
import { likeCard, createCard, deleteCard } from "./card.js"; 
import { openModal, closeModal, setCloseModalByClickListeners} from "./modal.js"; 
import {enableValidation, clearValidation} from "./validation.js"; 
import {addNewCard,getEditProfile, getUserInfo, getCardInfo, updateAvatar} from "./api.js"; 
// Получаем элемент с классом 'places__list' */ 
const cardsContainer = document.querySelector(".places__list"); 
 // Получаем всплывающий элемент и кнопку открывания 
const popupTypeEdit = document.querySelector(".popup_type_edit"); 
const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button"); 
// Получаем всплывающий элемент и кнопку открывания 
const popupNewCard = document.querySelector(".popup_type_new-card"); 
// Переменные для  добавление карточки с картинкой 
const newPlaceForm = document.forms["new-place"]; 
const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name"); 
const linkInput = newPlaceForm.querySelector(".popup__input_type_url"); 
const addProfileButton = document.querySelector(".profile__add-button"); 
//Переменная для закрытия попапа 
const buttonClosePopupEdit = popupTypeEdit.querySelector(".popup__close"); 
//Переменная для попапов 
const popups = document.querySelectorAll(".popup"); 
//Получаем форму редактирования профиля 
const editFormElementProfile = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector() 
// Находим поля формы в DOM 
const nameInput = editFormElementProfile.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector() 
const jobInput = editFormElementProfile.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector() 
const formEditProfile = document.forms["edit-profile"]; 
// Выберите элементы, куда должны быть вставлены значения полей 
const profileName = document.querySelector(".profile__title"); 
const profileJob = document.querySelector(".profile__description"); 
// Переменные для Попапа картинки 
const imagePopup = document.querySelector(".popup_type_image"); 
const imageInPopup = imagePopup.querySelector(".popup__image"); 
const popupCaption = imagePopup.querySelector(".popup__caption"); 

//=================================================================================//
/* Аватар */
const profileImage = document.querySelector('.profile__image');
const editAvatar = document.querySelector('.popup_type_avatar');
const editAvatarForm = document.forms['avatar-profile'];
const avatarInput = document.querySelector('.popup__input_type_avatar');
const buttonEditAvatar = editAvatar.querySelector('.popup__button');
const imageSection = document.querySelector('.profile__image-section');
const exitEditAvatar = editAvatar.querySelector('.popup__close');
//Функция загрузки
function loadingButtonSave(loading, button) {
  button.textContent = loading ? "Сохранение..." : "Сохранить";
};


/*Функция для изменения аватара*/
function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();
    // const avatarUrl = avatarInput.value;
    updateAvatar(evt.target.link.value)
      .then((data) => {
        profileImage.src = data.avatar; // Обновление изображения профиля
        closeModal(editAvatar);
        editAvatarForm.reset();
      })
      .catch((err) => {
        console.error('Ошибка при изменении аватара:', err);
      });
  }
  
  editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
  /* Слушатель для открытия модального окна редактирования аватара и очистки полей */
imageSection.addEventListener('click', function () {
    avatarInput.value = '';
    openModal(editAvatar);
  });
/* Перебираем каждую карточку в исходных карточках и добавляем ее в cardsContainer*/ 

// initialCards.forEach(function (card) { 
//   /*Создаем новую карточку и добавляем ее в  cardsContainer*/ 
//   const newCard = createCard(card, deleteCard, likeCard, openCard); 
//   cardsContainer.appendChild(newCard); 
// });

// Вызов функции закрытия модального окна по клику на оверлей 
setCloseModalByClickListeners(popups); 
/* Функция обработчика заполнения формы профиля */
function handleProfileFormSubmit(evt) { 
  evt.preventDefault(); 
  loadingButtonSave(true, buttonEditAvatar)
  getEditProfile(evt.target.name.value, evt.target.description.value)
  .then((user) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    closeModal(popupTypeEdit); 
  })
  .catch((err) => {
    console.log('Ошибка при редактировании профиля:' + '' + err);
  })
  .finally(() => {
    loadingButtonSave(false, buttonEditAvatar);
  })
} 
 
// Прикрепляем обработчик к форме: // он будет следить за событием “submit” - «отправка» 
formEditProfile.addEventListener("submit", handleProfileFormSubmit); 
//Константа поиска попапа создания карточки 
const popupAddCard = document.querySelector(".popup_type_new-card"); 

//Добавление карточки в начало и сама форма для добавления карточки 
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonEditAvatar);
  const placeName = placeNameInput.value;
  const linkUrl = linkInput.value;
  addNewCard(placeName, linkUrl)
    .then((card) => {
      const cardClone = createCard(card, userId, deleteCard, likeCard, openCard);
      cardsContainer.prepend(cardClone);
      closeModal(popupAddCard);
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
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
// Попап через кнопку плюс >>> 
// Добавляем прослушиватель событий к кнопке открытия 
addProfileButton.addEventListener("click", function () { 
  // Открываем всплывающее окно 
  openModal(popupNewCard); 
}); 
// Добавьте прослушиватель событий к кнопке открытия для профиля редактирования
buttonOpenEditProfilePopup.addEventListener("click", function () { 
  // Вставляем текущие данные профиля в инпуты формы 
//   nameInput.value = profileName.textContent; 
//   jobInput.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig) 
  openModal(popupTypeEdit); 
}); 
 
/*******************************************/ 
/***************************************** */ 
// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  };
  enableValidation(validationConfig);
 
Promise.all([getUserInfo(), getCardInfo()]) 
.then(([userData, cardData]) =>{ 
  //обработка данных пользователя 
  profileName.textContent = userData.name; 
    profileJob.textContent = userData.about; 
         // Очищаем контейнер для карточек перед добавлением новых 
    cardsContainer.innerHTML = ''; 
     // Добавляем карточки на страницу 
    cardData.forEach(card => { 
      const newCard = createCard(card, deleteCard, likeCard, openCard); 
      cardsContainer.appendChild(newCard); 
    }); 
  }) 
  .catch(error => { 
    console.error('Ошибка загрузки данных:', error); 
}); 
