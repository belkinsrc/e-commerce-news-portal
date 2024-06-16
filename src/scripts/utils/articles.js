export class ArticlesUtils {
  static createArticles(filteredData) {
    return filteredData.map((article) => {
      const { title, description, category, date, backgroundImage } = article;

      const styleBg = backgroundImage
        ? `style="background:url(${backgroundImage})"`
        : '';

      return `<article class="article" ${styleBg}>
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
    });
  }

  static displayArticles(articles, parentElement) {
    // const start = (page - 1) * this.pageSize;
    // const end = start + this.pageSize;
    // const paginatedArticles = data.slice(start, end);

    const articlesGridContainer = document.createElement('div');
    articlesGridContainer.classList.add('articles-grid-list');

    articles.forEach((article, i) => {
      if (i === 0) {
        article.classList.add('article--main');
        parentElement.innerHTML = article;
      }
      article.classList.add('articles-grid-list__item');
      articlesGridContainer.innerHTML += article;
    });
    this.parentElement.append(articlesGridContainer);
  }

  static fetchArticles() {
    return fetch('../../data/articles.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Произошла ошибка при запросе данных.');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Произошла ошибка при получении данных: ' + error);
        throw error;
      });
  }
}
