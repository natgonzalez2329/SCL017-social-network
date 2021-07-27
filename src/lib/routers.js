import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';
import { isLogged } from './firebase.js';
import { standardTemplate } from '../views/standard.js';

const containerViews = document.querySelector('#root');

export const router = async (route) => {
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
        containerViews.appendChild(standardTemplate());
        containerViews.appendChild(await viewFeed()); // ruta muro posts
      } else { window.location.hash = ''; }
      break;
    case '#/profile':
      if (isLogged()) {
        containerViews.appendChild(await viewProfile()); // ruta perfil
      } else { window.location.hash = ''; }
      break;
    case '#/post':
      if (isLogged()) {
        containerViews.appendChild(viewPost()); // ruta post
      } else { window.location.hash = ''; }
      break;
    default:
      containerViews.innerHTML = 'Error 404';
      break;
  }
};
