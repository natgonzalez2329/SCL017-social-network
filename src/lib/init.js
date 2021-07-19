import { router } from '../routers.js';
//import { viewHeaderMenu } from '../views/headerMenu.js';
import { viewForms } from '../views/viewForms.js';

export const initialize = () => {
  //document.getElementById('root').innerHTML = viewHeaderMenu();
  document.getElementById('root').innerHTML += viewForms();
  window.location.hash = '/';
  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
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