// Попап через кнопку редактировать >>>
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  clearValidation(popup);
  document.addEventListener("keydown", closeEscape);
};

//Закрытие модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscape);
};

// Закрытие модального окна через Escape
function closeEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

// Функция закрытия модального окна по клику на оверлей
export function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    // Находим кнопку закрытия окна
    const closeButton = popup.querySelector(".popup__close");
    // Добавляем обработчик слушателя для закрытия окна
    closeButton.addEventListener("click", () => {
      closeModal(popup);
    });
    // Добавление обработчика слушателя закрытия окна по оверлею
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
};
// // Очистка ошибок валидации на форме
// export function clearValidationErrors(form) {
//   const errorMessages = form.querySelectorAll(".popup__form"); // Пока не поятно, нужно оно или нет
//   errorMessages.forEach((errorMessage) => {
//     errorMessage.textContent = "";
//   });
// };

// Функция для сброса значений в полях формы
const clearValidation = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    input.value = '';
  });
};