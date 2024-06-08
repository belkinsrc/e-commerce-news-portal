export class Articles {
  constructor() {
    this.parentElement = document.querySelector('[data-articles-parent]');
    this.pageSize = 6;
    this.#fetchArticles(1);
  }

  #fetchArticles(page) {
    fetch('../../data/articles.json')
      .then((response) => response.json())
      .then((data) => {
        this.#displayArticles(data, page);
      })
      .catch((error) => console.error('Error fetching news:', error));
  }

  #displayArticles(data, page) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const paginatedArticles = data.slice(start, end);

    const mainArticle = this.#createArticle(
      paginatedArticles[0],
      'article--main'
    );
    this.parentElement.innerHTML += mainArticle;

    const articlesGridContainer = document.createElement('div');
    articlesGridContainer.classList.add('articles-grid-list');

    paginatedArticles.forEach((articleData, i) => {
      if (i === 0) return;
      const articleElement = this.#createArticle(
        articleData,
        'articles-grid-list__item'
      );
      articlesGridContainer.innerHTML += articleElement;
    });
    this.parentElement.append(articlesGridContainer);
  }

  #createArticle(data, extraClass) {
    const { title, description, category, date, backgroundImage } = data;

    const styleBg = backgroundImage
      ? `style="background:url(${backgroundImage})"`
      : '';
    console.log(styleBg);

    return `<article class="article ${extraClass ? extraClass : ''}" ${styleBg}>
        <a href="#category" class="article__category content-button">${category}</a>
        <h3 class="article__title section-title">
          <a href="#title" class="article__link">
            ${title}
          </a>
        </h3>
        <p class="article__descr">
          ${description}
        </p>
        <time datetime="2020-12-13" class="article__date">${date}</time>
      </article>`;
  }
}
