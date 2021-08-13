const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyA-7wjgyCL8NqhOvM0D_tlfirof1p-k5l0',
    authDomain: 'punto-pyme.firebaseapp.com',
    projectId: 'punto-pyme',
    storageBucket: 'punto-pyme.appspot.com',
    messagingSenderId: '332879123428',
    appId: '1:332879123428:web:bd43ea94ed68952721edf1',
  };
  firebase.initializeApp(firebaseConfig);
};

//  Email de Verificacion
const verificationEmail = () => {
  firebase.auth().currentUser.sendEmailVerification().then(() => {
    alert('Verification Sent');
  }).catch((error) => {
    alert(error);
  });
};
const createUserCollection = async () => {
  const user = firebase.auth().currentUser;
  await firebase.firestore().collection('users').doc(user.uid).set({
    name: user.email,
    email: user.displayName,
    description: null,
    area: null,
  });
} 
// registro con email y contraseña
const firebaseSignUp = async (userData) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        userData.userEmailSignUp,
        userData.userPasswordSignUp,
      );
    createUserCollection();
    await firebase.auth().currentUser.updateProfile({
      displayName: userData.userNameSignUp,
    });
    const user = firebase.auth().currentUser;
    verificationEmail();
    console.log(user.displayName);
    return null;
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
    const user = firebase.auth().currentUser;
    if (user != null && user.emailVerified) {
      window.localStorage.setItem(
        'puntopyme-name',
        user.displayName,
      );
      // Signed in
      window.location.hash = '#feed';
      return user;
    }
    console.log('usuario no verificado');
    return null;
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
    createUserCollection();
    verificationEmail();
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
      createUserCollection();
      verificationEmail();
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
const firebaseLogout = async () => {
  try {
    await firebase.auth().signOut();
    window.localStorage.removeItem('puntopyme-name');
    alert("se ejecutó logout");
  } catch (error) {
    console.log(error);
  }
};

// View Feed & Profile Posts
const fetchPosts = async (fs, uid) => {
  let posts;
  if (uid) {
    posts = await fs.firestore().collection('pyme-posts').where('user.uid', '==', uid).get();
  } else {
    posts = await fs.firestore().collection('pyme-posts').get();
  }
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
  firebaseLogout,
  facebookLogin,
  fetchPosts,
};
