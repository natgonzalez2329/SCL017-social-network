const firebaseInit = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyA-7wjgyCL8NqhOvM0D_tlfirof1p-k5l0',
    authDomain: 'punto-pyme.firebaseapp.com',
    projectId: 'punto-pyme',
    storageBucket: 'punto-pyme.appspot.com',
    messagingSenderId: '332879123428',
    appId: '1:332879123428:web:bd43ea94ed68952721edf1',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};

//registro con email y contraseña
const firebaseSignUp = async (userData) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(userData.userEmail, userData.userPassword);
    await firebase.auth().currentUser.updateProfile({
      displayName: userData.userName,
     // phoneNumber: userData.userArea,
      
    });
    verifyEmailAddress()
    window.localStorage.setItem('puntopyme-name', userData.userName);
    window.location.hash = '#/feed';
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  }
};

const verifyEmailAddress = () => {
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
      console.log("Enviando correo...");
    // Email verification sent!
    // ...
  });
}

//observador de usuario activo
const isLogged = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return true;
  }
  return false;
};

//inicio de sesión con email y contraseña
const firebaseLogIn = async (userData) => {
  try {
    const userCredential = await firebase
    .auth().signInWithEmailAndPassword(userData.userEmail, userData.userPassword);
    console.log(userCredential);
    window.localStorage.setItem('puntopyme-name', userCredential.user.displayName);
    // Signed in
    window.location.hash = '#/feed';
  } catch(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
  }
};

//inicio de sesión con google
const googleLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    /** @type {firebase.auth.OAuthCredential} */
    const credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('user', user);
    // ...
  } catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log('error', errorMessage);
  };
};

//cierre de sesión
const logOut = async () => {
  try {
    await firebase.auth().signOut();
    window.localStorage.removeItem('puntopyme-name');
    // Sign-out successful.
    // console.log('Sign-out successful.');
  } catch (error) {
    // An error happened.
    console.log(error);
  };
};

export {
  firebaseInit,
  firebaseSignUp,
  isLogged,
  googleLogin,
  firebaseLogIn,
  logOut,
};
