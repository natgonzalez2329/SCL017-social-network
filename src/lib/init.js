import { router } from './routers.js';
// import { viewHeaderMenu } from '../views/headerMenu.js';
import { viewForms } from '../views/viewForms.js';

export const init = () => {
  // document.getElementById('root').innerHTML = viewHeaderMenu();
  document.getElementById('root').innerHTML = '';
  document.getElementById('root').appendChild(viewForms());
  window.location.hash = '/';
  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
<<<<<<< HEAD
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container__forms');
  signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });
  signInBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });
};
=======
};
>>>>>>> 540118595174b5a52bf3a5e9fbacbe35d3fc08af
