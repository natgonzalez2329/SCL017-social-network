// Este es el punto de entrada de tu aplicacion
import { router } from './router/routers.js';
import { myFunction } from './lib/index.js';

myFunction();

window.addEventListener('hashchange', () => {
  console.log(window.location.hash);
});

const router = (route) => {
  console.log(hj);
};
const signInBtn = document.querySelector('#sign-in-btn');
const signUpBtn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

signUpBtn.addEventListener('click', () => {
  container.classList.add('sign-up-mode');
});

signInBtn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
});



