// Функция, которая добавляет класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput, validationConfig) => {
  const saveButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const isFormEmpty = inputList.every((input) => input.value.trim() === "");
  if (isFormEmpty) {
    saveButton.disabled = true;
    saveButton.style.backgroundColor = "#00000026";
    return false;
  }
  const customErrorMessage =
    formInput.dataset.errorMessage || formInput.validationMessage;

  // Проверяем все возможные ошибки валидации
  if (!formInput.validity.valid) {
    // Проверяем, есть ли ошибка patternMismatch
    if (formInput.validity.patternMismatch) {
      // Если есть, устанавливаем пользовательское сообщение об ошибке
      formInput.setCustomValidity(
        formInput.dataset.errorMessage || customErrorMessage
      );
    } else {
      // Иначе, сбрасываем пользовательское сообщение об ошибке
      formInput.setCustomValidity("");
    }

    // Отображаем сообщение об ошибке
    showInputError(
      formElement,
      formInput,
      formInput.validationMessage,
      validationConfig
    );
    saveButton.disabled = true;
    saveButton.style.backgroundColor = "#00000026";
    return false;
  } else {
    // Если все в порядке, скрываем ошибку и активируем кнопку
    hideInputError(formElement, formInput, validationConfig);
    saveButton.disabled = false;
    saveButton.style.backgroundColor = "";
    return true;
  }
};

// Функция установки обработчиков событий
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const saveButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isValidForm = inputList.every((input) =>
        isValid(formElement, input, validationConfig)
      );
      saveButton.disabled = !isValidForm;
      if (isValidForm) {
        saveButton.style.backgroundColor = "";
      }
    });
    // Проверяем валидность сразу при инициализации
    isValid(formElement, inputElement, validationConfig);
  });
};

// Функция включения валидации всех форм
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Функция для сброса значений в полях формы и скрытия ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((input) => {
    input.setCustomValidity("");
    hideInputError(formElement, input, validationConfig); // скрываем ошибки валидации при очистке полей
  });
  // Выключаем кнопку сохранения после очистки полей
  const saveButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  saveButton.disabled = true;
  saveButton.style.backgroundColor = "#00000026";
};
