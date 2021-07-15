import { viewForms } from './views/viewForms.js';
import { viewWall } from './views/viewWall.js';
import { viewProfile } from './views/viewProfile.js';

const containerViews = document.querySelector('#root');

export const router = () => {window.addEventListener('hashchange', () => {
  containerViews.innerHTML = '#/';
  if (window.location.hash === '#/') {
    viewForms();
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container__forms');
  signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });
  signInBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });
  } else if (window.location.hash === '#/wall') {
    viewWall();
  } else if (
    window.location.hash === '#/profile') {
    viewProfile();
  } else {
    console.log(4);
    containerViews.innerHTML = 'Error 404';
  }
});
};


/*export const router = (route) => {
  console.log(route);
  //containerViews.innerHTML = '';
  if (route === '#/') {
    console.log(1);
    containerViews.innerHTML = viewForms();
    console.log(containerViews);
  } else if (route === '#/wall') {
    containerViews.innerHTML = viewWall();
    let form = document.getElementById('container__form-template');
    form = '';
    console.log(form);
    console.log(containerViews);
  } else if (route === '#/profile') {
    console.log(3);
    containerViews.innerHTML = viewProfile();
    console.log(containerViews);
  } else {
    console.log(4);
    containerViews.innerHTML = 'Error 404';
  }
  return containerViews;
};*/

/*const router = (route) => {
  switch (route) {
    case '#/':
      return containerViews.appendChild(viewForms());
    case '#/wall':
      return containerViews.appendChild(viewWall());
    case '#/profile':
      return containerViews.appendChild(viewProfile());
    default:
      return containerViews.innerHTML = 'Error 404';
  }
};*/
