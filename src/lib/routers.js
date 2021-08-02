import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';
import { isLogged } from './firebase.js';
import { standardTemplate } from '../views/standard.js';

const containerViews = document.querySelector('#root');

// const currentPath = window.location.pathname;
/* const currentPathView = async () => {
  const currentPath = window.location.pathname;
switch (currentPath) {
  case '/':
    containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
    break;
  case '/home':
    containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
    break;
  case '/feed':
    if (isLogged()) {
      containerViews.appendChild(standardTemplate());
      containerViews.appendChild(await viewFeed()); // ruta muro posts
    } else { window.location.pathname = '/home';
  console.log("está aquí"); }
    break;
  case '/profile':
    if (isLogged()) {
      containerViews.appendChild(await viewProfile()); // ruta perfil
    } else { window.location.pathname = '/home'; }
    break;
  case '/post':
    if (isLogged()) {
      containerViews.appendChild(viewPost()); // ruta post
    } else { window.location.pathname = '/home'; }
    break;
  default:
    containerViews.innerHTML = 'Error 404';
    break;
}
}; */


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



/*const currentPathView = async (currentPath) => {
  switch (currentPath) {
  case '/':
    containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
    break;
  
  case '/feed':
    containerViews.innerHTML = '';
    containerViews.appendChild(await viewFeed()); // ruta muro posts
  break;
  case '/profile':
   
      containerViews.appendChild(await viewProfile()); // ruta perfil
    } else { window.location.pathname = '/home'; }
    break;
  case '/post':
    if (isLogged()) {
      containerViews.appendChild(viewPost()); // ruta post
    } else { window.location.pathname = '/home'; }
    break;
  default:
    containerViews.innerHTML = 'Error 404';
    break;
}
}; */



// containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
// containerViews.appendChild(viewForms()); // ruta home page vista formularios-sign-in/up
