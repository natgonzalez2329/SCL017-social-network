import { logOut } from './firebase.js';
// aqui exportaras las funciones que necesites
const myFunction = () => {
  // aqui tu codigo
  // console.log('Hola mundo!');
};

export { myFunction };

const logOutBtn = document.querySelector('#logout-btn');
logOutBtn.addEventListener('click', () => logOut());
