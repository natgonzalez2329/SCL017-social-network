import { router } from './routers.js';
import { viewForms } from '../views/viewForms.js';

export const init = () => {
  document.getElementById('root').innerHTML = '';
  document.getElementById('root').appendChild(viewForms());
  window.location.hash = '/';
  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};

/*export const init = () => {
  window.addEventListener('load', async () => {
    router(window.location.hash);
    window.addEventListener('hashchange', () => {
      router(window.location.hash);
    });
  });
};*/

/*export const init = () => {
  window.addEventListener('load', async () => {
    await router(window.location.hash);
    window.addEventListener('hashchange', async () => {
      console.log(window.location.hash);
      await router(window.location.hash);
    });
  });
};*/
