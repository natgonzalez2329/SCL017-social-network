// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const containerRegister = document.getElementById('container-register');

signUpButton.addEventListener('click', () => {
	containerRegister.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	containerRegister.classList.remove("right-panel-active");
});