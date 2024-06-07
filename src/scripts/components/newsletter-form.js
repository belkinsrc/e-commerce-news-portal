export class NewsletterFormModel {
  constructor() {
    this.form = document.querySelector('[data-newsletter-form]');
    this.inputList = Array.from(this.form?.querySelectorAll('.newsletter__input'));
    this.buttonElement = this.form?.querySelector('.newsletter__button');
    this.formErrorElement = this.form?.querySelector('#newsletter-empty-error');
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
    if (!inputElement.validity.valid) {
      inputElement.setAttribute('aria-invalid', true);
      this.#showErrorMessage(inputElement, inputElement.validationMessage);
    } else {
      inputElement.removeAttribute('aria-invalid');
      this.#clearErrorMessage(inputElement);
    }
  }

  #hasInvalidInput() {
    return this.inputList?.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #formError() {
    this.formErrorElement.textContent = 'Заполните все поля для отправки формы.';
  }

  #toggleButton() {
    if (this.#hasInvalidInput()) {
      this.buttonElement?.classList.add('newsletter__button--disabled');
      this.buttonElement?.setAttribute('aria-disabled', true);
    } else {
      this.buttonElement?.classList.remove('newsletter__button--disabled');
      this.buttonElement?.removeAttribute('aria-disabled');
      this.formErrorElement.textContent = '';
    }
  }

  #showErrorMessage(inputElement, errorMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
  }

  #clearErrorMessage(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
  }
}