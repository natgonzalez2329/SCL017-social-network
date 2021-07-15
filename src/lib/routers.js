import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';

const containerViews = document.querySelector('#root');

export const router = (route) => {
  containerViews.innerHTML = '';

  switch (route) {
    case '':
      containerViews.appendChild(viewForms()); //ruta home page vista formularios-sign-in/up
      break;
    case '#/feed':
      containerViews.appendChild(viewFeed()); //ruta muro posts
      break;
    case '#/profile':
      containerViews.appendChild(viewProfile()); //ruta perfil
      break;
    default:
      containerViews.innerHTML = 'Error 404';
  }
};
