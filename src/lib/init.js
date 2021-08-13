import { router } from './routers.js';
import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';

const containerViews = document.querySelector('#root');

export const init = () => {
  containerViews.innerHTML = '';
  containerViews.appendChild(viewForms());
  window.addEventListener('hashchange', () => {
    containerViews.innerHTML = '';
    router(window.location.hash);
  });
};

const currentPath = window.location.hash;
switch (currentPath) {
  case '#feed':
    containerViews.appendChild(viewFeed()); // ruta muro posts
    break;
  case '#profile':
    containerViews.innerHTML = '';
    containerViews.appendChild(viewProfile()); // ruta perfil
    break;
  default:
    containerViews.innerHTML = 'Error 404';
    break;
}
