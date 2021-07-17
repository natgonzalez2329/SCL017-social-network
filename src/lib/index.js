//import { singIn } from './auth.js';


// aqui exportaras las funciones que necesites
const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('user', user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log('error', errorMessage);
    // ...
  });

}

const googleLoginBtn = document.getElementById("google_login");
 googleLoginBtn.addEventListener('click', ()=>{
          googleLogin();
 });


 const FacebookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
 firebase
 .auth()
 .signInWithPopup(provider)
 .then((result) => {
   /** @type {firebase.auth.OAuthCredential} */
   var credential = result.credential;

   // The signed-in user info.
   var user = result.user;

   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
   var accessToken = credential.accessToken;

   // ...
 })
 .catch((error) => {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;

   // ...
 });
}

const facebookLoginBtn = document.getElementById("facebook_login");
facebookLoginBtn.addEventListener('click', ()=>{
  FacebookLogin();
 });


export { myFunction, googleLogin, FacebookLogin};
