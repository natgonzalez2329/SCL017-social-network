import { viewForms } from './views/viewForms.js';
import { viewWall } from './views/viewWall.js';
import { viewProfile } from './views/viewProfile.js';

const containerViews = document.querySelector('#root');


export const router = (route) => {
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
};

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
