import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';
import { isLogged } from './firebase.js';
import { standardTemplate } from '../views/standard.js';

const containerViews = document.querySelector('#root');

export const router = async (route) => {
  containerViews.innerHTML = '';
  const logged = window.localStorage.getItem('puntopyme-name');
  if (isLogged() || logged) {
    containerViews.innerHTML = '';
    switch (route) {
      //case '':
      //case '#':
      case '#feed':
        containerViews.innerHTML = '';
        //containerViews.appendChild(standardTemplate());
        //window.history.replaceState({}, 'feed', '/feed'); 
        containerViews.appendChild(await viewFeed()); // ruta muro posts
        break;
      case '#profile':
        document.getElementById('root').innerHTML = '';
        //window.history.replaceState({}, 'profile', '/profile');
        containerViews.appendChild(await viewProfile()); // ruta perfil
        break;
      case '#post':
        document.getElementById('root').innerHTML = '';
        //window.history.replaceState({}, 'post', '/post');
        containerViews.appendChild(viewPost()); // ruta post
        break;
      default:
        containerViews.innerHTML = 'Error 404';
        break;
    }
  } else {
    console.log('no tengo sesion');
    containerViews.innerHTML = '';
    containerViews.appendChild(viewForms());
    //const noHashURL = window.location.href.replace(/#.*$/, '');
   // window.history.replaceState({}, 'home', window.location.origin);
  }
 
};
