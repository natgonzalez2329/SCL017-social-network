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

// registro con email y contraseña
const firebaseSignUp = async (userData) => {
  try {
    // eslint-disable-next-line max-len
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        userData.userEmailSignUp,
        userData.userPasswordSignUp
      );
    await firebase.auth().currentUser.updateProfile({
      displayName: userData.userNameSignUp,
    });
    window.localStorage.setItem('puntopyme-name', userData.userNameSignUp);
    window.location.hash = '#feed';
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  }
};

// observador de usuario activo
const isLogged = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return true;
  }
  return false;
};

// inicio de sesión con email y contraseña
const firebaseLogIn = async (userData) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(
        userData.userEmailSignIn,
        userData.userPasswordSignIn
      );
    console.log(userCredential);
    window.localStorage.setItem(
      'puntopyme-name',
      userCredential.user.displayName
    );
    // Signed in
    window.location.hash = '#feed';
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
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
    window.location.hash = '#feed';
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log('error', errorMessage);
  }
};

// Inicio de sesion con facebook

const facebookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /* @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;

      window.location.hash = '#feed';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      // ...
    });
};

// cierre de sesión
const logOut = async () => {
  try {
    await firebase.auth().signOut();
    window.localStorage.removeItem('puntopyme-name');
    window.location.href = '/';
    // Sign-out successful.
    // console.log('Sign-out successful.');
  } catch (error) {
    // An error happened.
    console.log(error);
  }
};

// View Feed & Profile Posts
const fetchPosts = async (fs) => {
  const posts = await fs.firestore().collection('pyme-posts').get();
  const result = posts.docs.map((doc) => {
    const res = { data: doc.data(), id: doc.id };
    return res;
  });
  return result;
};

export {
  firebaseInit,
  firebaseSignUp,
  isLogged,
  googleLogin,
  firebaseLogIn,
  logOut,
  facebookLogin,
  fetchPosts,
};
