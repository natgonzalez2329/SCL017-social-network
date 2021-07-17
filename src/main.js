// Este es el punto de entrada de tu aplicacion
import { firebaseInit } from './lib/firebase.js';
import { myFunction } from './lib/index.js';
import { init } from './lib/init.js';

firebaseInit();
myFunction();
window.addEventListener('load', init);
