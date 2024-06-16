import { ArticlesUtils } from '../utils/articles.js';

export class SearchForm {
  constructor() {
    this.header = document.querySelector('[data-header]');
    this.searchForm = document.querySelector('[data-search-form]');
    this.searchFormInput = this.searchForm?.querySelector('input#search');
    this.searchFormContentParent = this.searchForm?.querySelector(
      '.search-form__content'
    );
    this.#init();
  }

  #init() {
    this.header?.classList.add('header--search--open');

    ArticlesUtils.fetchArticles().then((data) => {
      this.#handleSubmitForm(data);
    });
  }

  #searchMatching(data, value) {
    if (!value.trim()) {
      this.#displayEmptyMessage();
      return;
    }
    const filteredData = this.#filterArticlesByTitle(data, value);

    if (!filteredData.length > 0) {
      this.#displayEmptyMessage();
      return;
    }
    this.#displayListOfArticles(filteredData);
  }

  #displayEmptyMessage() {
    const emptyMessage = document.createElement('span');
    emptyMessage.classList.add('empty-message');
    emptyMessage.textContent = 'Ничего не найдено.';
    this.searchFormContentParent.style.opacity = '1';
    this.searchFormContentParent.innerHTML = '';
    this.searchFormContentParent.appendChild(emptyMessage);
  }

  #displayListOfArticles(filteredData) {
    const listOfArticles = document.createElement('ul');
    listOfArticles.classList.add('search-form__list');

    filteredData.forEach((article) => {
      const articleElement = `
        <li class="search-form__item">
          <a href="#" class="search-form__link">${article.title}</a>
          <time class="search-form__date" datetime="2020-12-13">${article.date}</time>
        </li>
      `;
      listOfArticles.innerHTML += articleElement;
    });
    this.searchFormContentParent.innerHTML = '';
    this.searchFormContentParent.appendChild(listOfArticles);
    this.searchFormContentParent.style.opacity = '1';
  }

  #filterArticlesByTitle(data, query) {
    const queryLower = query.toLowerCase();

    const filteredData = data.filter((article) => {
      return article.title.toLowerCase().includes(queryLower);
    });

    if (!filteredData.length > 0) {
      this.#displayEmptyMessage();
    }
    return filteredData;
  }

  #handleSubmitForm(data) {
    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputValue = e.target.elements['search'].value;
      this.#searchMatching(data, inputValue);
    });
  }
}
