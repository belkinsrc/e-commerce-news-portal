import { MenuModel } from './components/menu.js';

document.addEventListener('DOMContentLoaded', function() {
  runModels();
});

function runModels() {
  const body = document.body;

  switch (body.id) {
    case 'contacts':
      import('./components/contacts-form.js')
        .then((module) => new module.ContactsFormModel());
    default:
      new MenuModel();
  } 
}