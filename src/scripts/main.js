import { MenuModel } from './components/menu.js';

document.addEventListener('DOMContentLoaded', function () {
  runModels();
});

function runModels() {
  const body = document.body;

  new MenuModel();

  switch (body.id) {
    case 'index':
    case 'post':
      import('./components/newsletter-form.js').then(
        (module) => new module.NewsletterFormModel()
      );
      break;
    case 'contacts':
      import('./components/contacts-form.js').then(
        (module) => new module.ContactsFormModel()
      );
      break;
  }
}
