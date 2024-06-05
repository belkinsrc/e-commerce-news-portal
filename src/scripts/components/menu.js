export class MenuModel {
  constructor() {
    this.header = document.querySelector('[data-header]');
    this.menu = this.header?.querySelector('[data-menu]');
    this.burger = this.header?.querySelector('[data-burger-menu]');
    this.menuLinks = this.header?.querySelectorAll('a');
    this.body = document.body;
    this.focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
    this.focusableElements = this.header?.querySelectorAll(this.focusableElementsString);
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    this.#init();
  }

  #init() {
    this.#handleBurgerClick();
    this.#handleMenuLinksClick();
  }

  #handleBurgerClick() {
    this.burger?.addEventListener('click', () => {
      this.burger.classList.toggle('burger-menu--expanded');
      if (this.burger.classList.contains('burger-menu--expanded')) {
        this.burger.setAttribute('aria-expanded', true);
        this.menu?.classList.add('menu--expanded');
        this.#disableScroll();
        this.#addHandlerToLockFocusWithInHeader();
      } else {
        this.burger.setAttribute('aria-expanded', false);
        this.menu?.classList.remove('menu--expanded');
        this.#enableScroll();
        this.#removeHandlerToLockFocusWithInHeader();
      }
    });
  }

  #handleMenuLinksClick() {
    this.menuLinks?.forEach((link) => {
      link.addEventListener('click', () => {
        this.burger?.classList.remove('burger-menu--expanded');
        this.menu?.classList.remove('menu--expanded');
        this.#enableScroll();
      });
    });
  }

  #disableScroll() {
    let scrollPosition = window.scrollY;
    this.body.dataset.scroll = scrollPosition;
    this.body.classList.add('disable-scroll');
    this.body.style.top = -scrollPosition + 'px';
  }

  #enableScroll() {
    let scrollPosition = parseInt(this.body.dataset.scroll, 10);
    this.body.style.top = 'auto';
    this.body.classList.remove('disable-scroll');
    window.scroll({ top: scrollPosition, left: 0 });
    this.body.removeAttribute('data-scroll');
  }

  #lockFocusWithInHeader() {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        this.firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  #addHandlerToLockFocusWithInHeader() {
    this.header?.addEventListener('keydown', this.#lockFocusWithInHeader);
  }

  #removeHandlerToLockFocusWithInHeader() {
    this.header?.removeEventListener('keydown', this.#lockFocusWithInHeader);
  }
}
