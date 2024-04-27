export {enableValidation}
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидности поля
const isValid = (formElement, formInput) => {
    const inputValue = formInput.value.trim();
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
    const saveButton = formElement.querySelector('.popup__button');
  
    if (formInput.id === 'name' && inputValue !== 'Жак-Ив-Кусто') {
        showInputError(formElement, formInput, 'Поле должно содержать значение "Жак-Ив-Кусто"');
        saveButton.disabled = true;
        saveButton.style.backgroundColor = '#00000026';
    } else if (formInput.id === 'description' && inputValue !== 'ученый исследователь') {
        showInputError(formElement, formInput, 'Поле должно содержать значение "ученый исследователь"');
        saveButton.disabled = true;
        saveButton.style.backgroundColor = '#00000026';
    } else if (formInput.id === 'url' && !inputValue.startsWith('https')) {
        showInputError(formElement, formInput, 'Поле должно содержать корректную ссылку');
        saveButton.disabled = true;
        saveButton.style.backgroundColor = '#00000026';
    // } else if (!regex.test(inputValue)) {
    //     showInputError(formElement, formInput, 'Поле должно содержать только латинские и кириллические буквы, знаки дефиса и пробелы');
    //     saveButton.disabled = true;
    //     saveButton.style.backgroundColor = '#00000026';
    } else if (formInput.patternMismatch) {
        showInputError(formElement, formInput, formInput.validationMessage);
        saveButton.disabled = true;
        saveButton.style.backgroundColor = '#00000026';
    } else {
        hideInputError(formElement, formInput);
        saveButton.disabled = false;
        saveButton.style.backgroundColor = '';
    }
  
    return formElement.querySelectorAll('.popup__button:disabled').length === 0;
  };
// Функция установки обработчиков событий
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const saveButton = formElement.querySelector('.popup__button');
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const isValidForm = inputList.every((input) => isValid(formElement, input));
        saveButton.disabled = !isValidForm;
        if(isValidForm) {
            saveButton.style.backgroundColor = '';
        }
      });
    });
  };
  

// Функция  включения валидации всех форм
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};