import { googleLogin, firebaseSignUp, firebaseLogIn, facebookLogin } from '../lib/firebase.js';
import { footerComponent } from './components/footer.js';

export const viewForms = () => {
  const containerFormTemplate = document.createElement('div');
  containerFormTemplate.className = 'container__form-template';
  containerFormTemplate.id = 'container__form-template';

  const formTemplate = `
  <div class="container__forms">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form" id="form-signin">
          <h2 class="title">Inicio de Sesión</h2>
          <div class="input-field">
          <i class="fas fa-user"></i>
            <input class="input__form" type="text" placeholder="Correo Electrónico" id="signin-email" autocomplete="off" />
          </div>
          <span class="error-input" id="email-in-error"></span>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" placeholder="Contraseña" id="signin-password" minlength="8" maxlength="12"/>
            <i class="far fa-eye" id="unmaskify"></i>
            <i class="far fa-eye-slash" id="maskify" style ="display:none"></i>
          </div>
          <span class="error-input" id="password-in-error"></span>
          <button type="submit" class="btn__form" form="form-signin" id="btn-signin">Iniciar Sesión</button>
          <p class="social-text">O accede con una Red Social</p>
          <div class="social-media">
            <a href="#" id="facebook_login" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" id="google_login" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form" id="form-signup">
          <h2 class="title">Crea una cuenta</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input class="input__form" type="text" id='user-name' placeholder="Usuario" autocomplete="off" minlength="4" maxlength="20" />
          </div>
          <span class="error-input" id="user-error"></span>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input class="input__form" type="email" id="user-email" placeholder="Correo Electrónico" autocomplete="off"/>
          </div>
          <span class="error-input" id="email-error"></span>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" id="user-password" placeholder="Contraseña"  minlength="8" maxlength="12"/>
            <i class="far fa-eye" id="unmaskify2"></i>
            <i class="far fa-eye-slash" id="maskify2" style ="display:none"></i>
          </div>
          <span class="error-input" id="password-error"></span>
          <button type="submit" id="btn-signup" form="form-signup" class="btn__form">Registrarte</button>
          <p class="social-text">Registrate con una Red Social</p>
          <div class="social-media">
            <a href="#"  id="facebook_login2" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" id="googleLoginBtn2" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
        <img src="./images/logo.png" class="image" style="border-radius:20%">
          <h3>Punto Pyme</h3>
          <p>
            La forma más sencilla de hacer crecer tu emprendimiento!
          </p>
          <button class="btn__form transparent" id="sign-up-btn">
            Registrate
          </button>
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
        <img src="./images/logo.png" class="image" style="border-radius:20%">  
          <h3>Bienvenid@s!</h3>
          <p>
            Únete a nuestra comunidad y potencia tu emprendimiento. Aquí encontrarás lo que necesitas!
          </p>
          <button class="btn__form transparent" id="sign-in-btn">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
  <div id="container__modal-verify" class="container__modal-verify">
  <div class="content__modal-verify">
    <span class="close__modal-verify" id="close__modal-verify">&times;</span>
    <div>
      <h1>Valida tu cuenta antes de Iniciar Sesión</h1>
      <p>Busca el correo electrónico de verificación en la bandeja de entrada y haz click en el vínculo que se muestra en el mensaje.</p>
    </div> 
    <div class="modal__footer">
      <button class="btn__modal-verify" id="btn-verify">Verifica e Inicia Sesión</button>
    </div>
  </div>
</div>`;

  containerFormTemplate.innerHTML = formTemplate;

  // -------------------- Ocultar/mostrar contraseñas en input de password-signin--------------//
  const inputSigninPassword = containerFormTemplate.querySelector('#signin-password');
  const btnUnmaskify = containerFormTemplate.querySelector('#unmaskify');
  const btnMaskify = containerFormTemplate.querySelector('#maskify');

  btnUnmaskify.addEventListener('click', () => {
    inputSigninPassword.type = 'text';
    btnUnmaskify.style.display = 'none';
    btnMaskify.style.display = 'block';
    setTimeout(maskify, 2000);
  });

  btnMaskify.addEventListener('click', () => {
    maskify();
  });

  function maskify() {
    inputSigninPassword.type = 'password';
    btnUnmaskify.style.display = 'block';
    btnMaskify.style.display = 'none';
    }

  // -------------------- Ocultar/mostrar contraseñas en input de password-signup--------------//

  const inputPassword = containerFormTemplate.querySelector('#user-password');
  const btnUnmaskify2 = containerFormTemplate.querySelector('#unmaskify2');
  const btnMaskify2 = containerFormTemplate.querySelector('#maskify2');

  btnUnmaskify2.addEventListener('click', () => {
    inputPassword.type = 'text';
    btnUnmaskify2.style.display = 'none';
    btnMaskify2.style.display = 'block';
    setTimeout(maskify2, 2000);
  });

  btnMaskify2.addEventListener('click', () => {
    maskify2();
  });

  function maskify2() {
    inputPassword.type = 'password';
    btnUnmaskify2.style.display = 'block';
    btnMaskify2.style.display = 'none';
  }

  // switch panel formularios
  const signInPanelBtn = containerFormTemplate.querySelector('#sign-in-btn');
  const signUpPanelBtn = containerFormTemplate.querySelector('#sign-up-btn');
  const signUpForm = containerFormTemplate.querySelector('#form-signup');
  const signInForm = containerFormTemplate.querySelector('#form-signin');
  const container = containerFormTemplate.querySelector('.container__forms');
  signUpPanelBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
  });
  signInPanelBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
  });

  // expresiones regulares para validar input
  const expression = {
    userName: new RegExp(/^\w+$/g), // Letras, numeros, guion y guion_bajo.
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  };

  // validación inputs sign up
  const userValidate = (userNameSignUp) => {
    const userError = containerFormTemplate.querySelector('#user-error');
    let valid = false;
    if (userNameSignUp === '' || userNameSignUp === null) {
      userError.innerHTML = '*Campo obligatorio. El usuario tiene que ser de 4 a 20 carácteres y solo puede contener números, letras y guión bajo';
      userError.style.display = 'block';
    }
    if (!expression.userName.test(userNameSignUp) || (userNameSignUp.length < 4 || userNameSignUp.length > 20)) {
      userError.innerHTML = '*Campo obligatorio. El usuario tiene que ser de 4 a 20 carácteres y solo puede contener números, letras y guión bajo.';
      userError.style.display = 'block';
    }
    if (userNameSignUp.length >= 4 && userNameSignUp.length <= 20) {
      userError.innerHTML = '';
      userError.style.display = 'none';
      valid = true;
    }
    return valid;
  };
  const emailValidate = (userEmailSignUp) => {
    const emailError = containerFormTemplate.querySelector('#email-error');
    let valid = false;
    if (userEmailSignUp === '' || userEmailSignUp === null) {
      emailError.innerHTML = '*Campo obligatorio. Correo no válido';
      emailError.style.display = 'block';
    } else {
      emailError.innerHTML = '';
      emailError.style.display = 'none';
      valid = true;
    }
    return valid;
  };
  const passwordValidate = (userPasswordSignUp) => {
    const passwordError = containerFormTemplate.querySelector('#password-error');
    let valid = false;
    if (userPasswordSignUp === '' || userPasswordSignUp === null) {
      passwordError.innerHTML = '*Campo obligatorio. La contraseña debe tener 8 a 12 carácteres.';
      passwordError.style.display = 'block';
    }
    if (userPasswordSignUp.length < 8 || userPasswordSignUp.length > 12) {
      passwordError.innerHTML = '*Campo obligatorio. La contraseña debe tener 8 a 12 carácteres.';
      passwordError.style.display = 'block';
    }
    if (userPasswordSignUp.length >= 8 && userPasswordSignUp.length <= 12) {
      passwordError.innerHTML = '';
      passwordError.style.display = 'none';
      valid = true;
    }
    return valid;
  };

  const inputUserNameSignUp = containerFormTemplate.querySelector('#user-name');
  inputUserNameSignUp.addEventListener('keyup', (e) => {
    userValidate(e.target.value);
  });
  const inputUserEmailSignUp = containerFormTemplate.querySelector('#user-email');
  inputUserEmailSignUp.addEventListener('keyup', (e) => {
    emailValidate(e.target.value);
  });
  const inputUserPasswordSignUp = containerFormTemplate.querySelector('#user-password');
  inputUserPasswordSignUp.addEventListener('keyup', (e) => {
    passwordValidate(e.target.value);
  });

  // validación inputs sign in
  const emailInValidate = (userEmailSignIn) => {
    const emailInError = containerFormTemplate.querySelector('#email-in-error');
    let valid = false;
    if (!expression.email.test(userEmailSignIn)) {
      emailInError.innerHTML = '*Campo obligatorio. Correo no válido';
      emailInError.style.display = 'block';
    }
    if (expression.email.test(userEmailSignIn)) {
      emailInError.innerHTML = '';
      emailInError.style.display = 'none';
      valid = true;
    }
    return valid;
  };
  const passwordInValidate = (userPasswordSignIn) => {
    const passwordInError = containerFormTemplate.querySelector('#password-in-error');
    let valid = false;
    if (userPasswordSignIn === '' || userPasswordSignIn === null) {
      passwordInError.innerHTML = '*Campo obligatorio. La contraseña debe tener 8 a 12 carácteres.';
      passwordInError.style.display = 'block';
    }
    if (userPasswordSignIn.length < 8 || userPasswordSignIn.length > 12) {
      passwordInError.innerHTML = '*Campo obligatorio. La contraseña debe tener 8 a 12 carácteres.';
      passwordInError.style.display = 'block';
    }
    if (userPasswordSignIn.length >= 8 && userPasswordSignIn.length <= 12) {
      passwordInError.innerHTML = '';
      passwordInError.style.display = 'none';
      valid = true;
    }
    return valid;
  };

  const inputUserEmailSignIn = containerFormTemplate.querySelector('#signin-email');
  inputUserEmailSignIn.addEventListener('keyup', (e) => {
    emailInValidate(e.target.value);
  });
  const inputUserPasswordSignIn = containerFormTemplate.querySelector('#signin-password');
  inputUserPasswordSignIn.addEventListener('keyup', (e) => {
    passwordInValidate(e.target.value);
  });
  
  const btnSignUpModal = containerFormTemplate.querySelector('#btn-signup');
  const modalVerify = containerFormTemplate.querySelector('#container__modal-verify');
  const closeModalVerify = containerFormTemplate.querySelector('#close__modal-verify');
  const btnVerify = containerFormTemplate.querySelector('#btn-verify');

  btnSignUpModal.onclick = () => {
    modalVerify.style.display = 'block';
  };
  closeModalVerify.addEventListener('click', () => {
    modalVerify.style.display = 'none';
  });
  btnVerify.addEventListener('click', () => {
    modalVerify.style.display = 'none';
  });
  window.onclick = (e) => {
    if (e.target === modalVerify) {
      modalVerify.style.display = 'none';
    }
  };

  // registro de cuenta, email y contraseña-event
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userNameSignUp = inputUserNameSignUp.value;
    const userEmailSignUp = inputUserEmailSignUp.value;
    const userPasswordSignUp = inputUserPasswordSignUp.value;

    userValidate(userNameSignUp);
    emailValidate(userEmailSignUp);
    passwordValidate(userPasswordSignUp);

    if (userValidate(userNameSignUp) && emailValidate(userEmailSignUp) && passwordValidate(userPasswordSignUp)) {
      firebaseSignUp({
        userEmailSignUp,
        userPasswordSignUp,
        userNameSignUp,
      });
      signUpForm.reset();
    }
  });

  // inicio de sesión email y contraseña-event
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmailSignIn = containerFormTemplate.querySelector('#signin-email').value;
    const userPasswordSignIn = containerFormTemplate.querySelector('#signin-password').value;

    emailInValidate(userEmailSignIn);
    passwordInValidate(userPasswordSignIn);

    if (emailInValidate(userEmailSignIn) && passwordInValidate(userPasswordSignIn)) {
      firebaseLogIn({ userEmailSignIn, userPasswordSignIn });
    }
  });

  // inicio de sesión google-event
  const googleLoginBtn = containerFormTemplate.querySelector('#google_login');
  googleLoginBtn.addEventListener('click', () => googleLogin());
  const googleLoginBtn2 = containerFormTemplate.querySelector('#googleLoginBtn2');
  googleLoginBtn2.addEventListener('click', () => googleLogin());

  // inicio de sesion Facebook
  const facebookLoginBtn = containerFormTemplate.querySelector('#facebook_login');
  facebookLoginBtn.addEventListener('click', () => facebookLogin());

  const facebookLoginBtn2 = containerFormTemplate.querySelector('#facebook_login2');
  facebookLoginBtn2.addEventListener('click', () => facebookLogin());
  containerFormTemplate.appendChild(footerComponent());
  return containerFormTemplate;
};
