import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { isLogged } from './firebase.js';

const containerViews = document.querySelector('#root');

export const router = async (route) => {
  containerViews.innerHTML = '';
  const logged = window.localStorage.getItem('puntopyme-name');
  if (isLogged() || logged) {
    containerViews.innerHTML = '';
    switch (route) {
      // case '':
      // case '#':
      case '#feed':
        containerViews.innerHTML = '';

        containerViews.appendChild(await viewFeed()); // ruta muro posts
        break;
      case '#profile':
        document.getElementById('root').innerHTML = '';

        
        containerViews.appendChild(await viewProfile()); // ruta perfil
        break;
     default:
         containerViews.innerHTML = 'Error 404';
        break;
    }
  } else {
    console.log('no tengo sesion');
    containerViews.innerHTML = '';
    containerViews.appendChild(viewForms());

  }
 
};
