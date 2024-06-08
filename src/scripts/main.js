import { Menu } from './components/menu.js';

document.addEventListener('DOMContentLoaded', function () {
  runModels();
});

function runModels() {
  const body = document.body;

  new Menu();

  switch (body.id) {
    case 'index':
    case 'post':
      import('./components/newsletter-form.js').then(
        (module) => new module.NewsletterForm()
      );
      import('./components/articles.js').then(
        (module) => new module.Articles()
      );
      break;
    case 'contacts':
      import('./components/contacts-form.js').then(
        (module) => new module.ContactsForm()
      );
      break;
  }
}
