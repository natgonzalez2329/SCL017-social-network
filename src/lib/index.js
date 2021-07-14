import { singIn } from './auth.js';
import { initialize } from './init.js';

// aqui exportaras las funciones que necesites
const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

const init = () => {
  singIn();
  initialize();
};

export { myFunction, init };
