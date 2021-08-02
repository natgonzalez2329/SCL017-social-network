import { router } from './routers.js';
import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';

const containerViews = document.querySelector('#root');

export const init = () => {
  document.getElementById('root').innerHTML = '';
  document.getElementById('root').appendChild(viewForms());
  window.addEventListener('hashchange', () => {
    document.getElementById('root').innerHTML = '';
    router(window.location.hash);
    
    
  });
  
};

/*const currentPath = window.location.pathname;
switch (currentPath) {
  case '/feed':
    // document.getElementById('root').appendChild(standardTemplate());
    document.getElementById('root').appendChild(viewFeed()); // ruta muro posts
    
    break;
    case '/profile':
      document.getElementById('root').innerHTML = '';
      document.getElementById('root').appendChild(viewProfile()); // ruta perfil
      break;
      case '/post':
        document.getElementById('root').innerHTML = '';
        document.getElementById('root').appendChild(viewPost()); // ruta post
        break;
        default:
          document.getElementById('root').innerHTML = 'Error 404';
          break;
        }*/

       window.onpopstate = async () => {
        const currentPath = window.location.hash;
           switch (currentPath) {
           case '#feed':
            containerViews.innerHTML = '';
                // containerViews.appendChild(standardTemplate());
                containerViews.appendChild(await viewFeed()); // ruta muro posts
              
              break;
            case '#profile':
              containerViews.innerHTML = '';
              containerViews.appendChild(await viewProfile()); // ruta perfil
              break;
            case '#post':
              containerViews.innerHTML = '';
             containerViews.appendChild(viewPost()); // ruta post
             break;
             default:
              containerViews.innerHTML = 'Error 404';
              break;
          }
        };
