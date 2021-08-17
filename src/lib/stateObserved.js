/* import { viewForms } from '../views/viewForms';

const containerViews = document.querySelector('#root');

export const stateObserved = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      window.location.hash = '#feed';
    } else {
      containerViews.appendChild(viewForms());
    }
  });
};
stateObserved(); */
