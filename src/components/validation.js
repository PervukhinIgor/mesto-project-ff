const regEx = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  let errorMessage = '';
  
  if (inputElement.name === 'name' && !regEx.test(inputElement.value)) {
    errorMessage = inputElement.dataset.error;
  } else if (inputElement.name === 'link' && !isURLValid(inputElement.value)) {
    errorMessage = inputElement.dataset.error;
  } else if (!inputElement.validity.valid) {
    errorMessage = inputElement.validationMessage;
  }

  if (errorMessage) {
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const isURLValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList,  buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement)
    });
  });

};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    if (inputElement.name === 'link') {
      return !isURLValid(inputElement.value) || !inputElement.validity.valid;
    } else {
      return !regEx.test(inputElement.value) || !inputElement.validity.valid;
    }
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

export const clearValidation = (formElement, config) => {
  // Находим все поля ввода в форме
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  // Находим кнопку отправки формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  // Очищаем ошибки для каждого поля
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  });

  toggleButtonState(inputList, buttonElement);
}
