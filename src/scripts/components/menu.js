document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const menu = header?.querySelector('[data-menu]');
  const burger = header?.querySelector('[data-burger-menu]');
  const menuLinks = header?.querySelectorAll('a');
  const body = document.body;
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
  const focusableElements = header?.querySelectorAll(focusableElementsString);
  let firstFocusableElement = focusableElements[0];
  let lastFocusableElement = focusableElements[focusableElements.length - 1];

  burger?.addEventListener('click', () => {
    burger.classList.toggle('burger-menu--expanded');
    if (burger.classList.contains('burger-menu--expanded')) {
      burger.setAttribute('aria-expanded', true);
      menu?.classList.add('menu--expanded');
      disableScroll();
      addHandlerToLockFocusWithInHeader();
    } else {
      burger.setAttribute('aria-expanded', false);
      menu?.classList.remove('menu--expanded');
      enableScroll();
      removeHandlerToLockFocusWithInHeader();
    }
  });

  menuLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger-menu--expanded');
      menu.classList.remove('menu--expanded');
      enableScroll();
    });
  });

  function disableScroll() {
    let scrollPosition = window.scrollY;
    body.dataset.scroll = scrollPosition;
    body.classList.add('disable-scroll');
    body.style.top = -scrollPosition + 'px';
  }

  function enableScroll() {
    let scrollPosition = parseInt(body.dataset.scroll, 10);
    body.style.top = 'auto';
    body.classList.remove('disable-scroll');
    window.scroll({ top: scrollPosition, left: 0 });
    body.removeAttribute('data-scroll');
  }

  function lockFocusWithInHeader(e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  function addHandlerToLockFocusWithInHeader() {
    header?.addEventListener('keydown', lockFocusWithInHeader);
  }

  function removeHandlerToLockFocusWithInHeader() {
    header?.removeEventListener('keydown', lockFocusWithInHeader);
  }
});
