export class ContactsForm {
  constructor() {
    this.form = document.querySelector('[data-contacts-form]');
    this.inputList = Array.from(
      this.form?.querySelectorAll('.contacts-form__input')
    );
    this.buttonElement = this.form?.querySelector('.contacts-form__button');
    this.formErrorElement = this.form?.querySelector('#empty-error');
    this.#startValidation();
  }

  #startValidation() {
    this.#toggleButton();

    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.#hasInvalidInput()) {
        this.#formError();
      }
    });

    this.inputList?.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButton();
      });
    });
  }

  #checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity(this.#checkLengthMismatch(inputElement));
    }
    if (!inputElement.validity.valid) {
      inputElement.setAttribute('aria-invalid', true);
      this.#showErrorMessage(inputElement, inputElement.validationMessage);
    } else {
      inputElement.setAttribute('aria-invalid', false);
      this.#clearErrorMessage(inputElement);
    }
  }

  #checkLengthMismatch(inputElement) {
    if (inputElement.type !== 'text') return '';

    if (inputElement.validity.tooShort) {
      return inputElement.validationMessage;
    }
    return '';
  }

  #showErrorMessage(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('contacts-form__input--error');
  }

  #clearErrorMessage(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('contacts-form__input--error');
  }

  #toggleButton() {
    if (this.#hasInvalidInput()) {
      this.buttonElement?.setAttribute('aria-disabled', true);
      this.buttonElement?.classList.add('contacts-form__button--disabled');
    } else {
      this.buttonElement?.removeAttribute('aria-disabled');
      this.buttonElement?.classList.remove('contacts-form__button--disabled');
      this.formErrorElement.textContent = '';
    }
  }

  #formError() {
    this.formErrorElement.textContent = 'Заполните все поля для отправки формы.';
  }

  #hasInvalidInput() {
    return this.inputList?.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
