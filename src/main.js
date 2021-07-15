// Este es el punto de entrada de tu aplicacion
import { myFunction } from './lib/index.js';
import { router } from './routers.js';

myFunction();
window.addEventListener('load', router);
