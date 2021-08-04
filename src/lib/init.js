import { router } from './routers.js';
import { viewForms } from '../views/viewForms.js';
import { viewFeed } from '../views/viewFeed.js';
import { viewProfile } from '../views/viewProfile.js';
import { viewPost } from '../views/viewPost.js';

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
    // document.getElementById('root').appendChild(standardTemplate());
    containerViews.appendChild(viewFeed()); // ruta muro posts
    
    break;
    case '#profile':
      containerViews.innerHTML = '';
      containerViews.appendChild(viewProfile()); // ruta perfil
      break;
      case '#post':
        containerViews.innerHTML = '';
        containerViews.appendChild(viewPost()); // ruta post
        break;
        default:
          containerViews.innerHTML = 'Error 404';
          break;
        }

       /*window.onpopstate = async () => {
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
        };*/
