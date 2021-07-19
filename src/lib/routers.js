import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { isLogged } from './firebase.js';

const containerViews = document.querySelector('#root');

export const router = (route) => {
  containerViews.innerHTML = '';

  switch (route) {
    case '':
      containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
      break;
    case '#/':
      containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
      break;
    case '#/feed':
      if (isLogged()) {
        containerViews.appendChild(viewFeed()); // ruta muro posts
      } else { window.location.hash = ''; }
      break;
    case '#/profile':
      if (isLogged()) {
        containerViews.appendChild(viewProfile()); // ruta perfil
      } else { window.location.hash = ''; }
      break;
    default:
      containerViews.innerHTML = 'Error 404';
  }
};
