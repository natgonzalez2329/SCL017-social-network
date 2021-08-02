import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';
import { isLogged } from './firebase.js';
import { standardTemplate } from '../views/standard.js';

const containerViews = document.querySelector('#root');


//original
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

/*const changeRoute = (hash) => {
  // if (hash === '') { window.history.replaceState({}, 'homep', '/'); } else
  // if ((hash === '#') || (hash === '')) { window.history.replaceState({}, 'home', '/home');} else 
  if (hash === '#feed') {
    window.history.replaceState({}, 'feed', '/feed');
  } else if (hash === '#profile') {
    window.history.replaceState({}, 'profile', '/profile');
  } else if (hash === '#post') {
    window.history.replaceState({}, 'post', '/post');
  }
};*/

/*export const router = async (route) => {
  containerViews.innerHTML = '';
  const logged = window.localStorage.getItem('puntopyme-name');
  console.log('router');
  console.log('tengo sesion en localStorage: ' + logged);
  if (isLogged() || logged) {
    console.log(route);
    console.log('tengo sesion');
    console.log(window.location.origin);
    switch (route) {
      // containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
      // break;
      // containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
      // break;
      case '':
      case '#':
      case '#feed':
          containerViews.appendChild(standardTemplate());
          containerViews.appendChild(await viewFeed()); // ruta muro posts
        break;
      case '#profile':
          containerViews.appendChild(await viewProfile()); // ruta perfil
        break;
      case '#post':
          containerViews.appendChild(viewPost()); // ruta post
        break;
      default:
        containerViews.innerHTML = '404, ocurrio un error!!!';
        break;
    }
    //changeRoute(route);
  } else {
    console.log('no tengo sesion');
      containerViews.innerHTML = '';
      containerViews.appendChild(viewForms())
    // const noHashURL = window.location.href.replace(/#.*$/, '');
    //window.history.replaceState({}, 'home', window.location.origin);
  }
};*/
 




