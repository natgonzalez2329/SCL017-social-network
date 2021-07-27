import { router } from './routers.js';
//import { viewHeaderMenu } from '../views/headerMenu.js';
import { viewForms } from '../views/viewForms.js';

export const init = () => {
  
  //document.getElementById('root').innerHTML = '';
  document.getElementById('root').appendChild(viewForms());
  window.location.hash = '/';
  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};
