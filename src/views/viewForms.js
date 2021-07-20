import { googleLogin, firebaseSignUp, firebaseLogIn } from '../lib/firebase.js';

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
            <input class="input__form" type="password" placeholder="Contraseña" id="signin-password" minlength="6" maxlength="6"/>
          </div>
          <span class="error-input" id="password-in-error"></span>
          <button type="submit" class="btn__form" form="form-signin" id="btn-signin">Iniciar Sesión</button>
          <p class="social-text">O accede con una Red Social</p>
          <div class="social-media">
            <a href="#" class="social-icon">
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
            <input class="input__form" type="text" id='user-name' placeholder="Usuario" autocomplete="off" minlength="4" maxlength="20"/>
          </div>
          <span class="error-input" id="user-error"></span>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input class="input__form" type="email" id="user-email" placeholder="Correo Electrónico" autocomplete="off"/>
          </div>
          <span class="error-input" id="email-error"></span>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" id="user-password" placeholder="Contraseña" minlength="6" maxlength="6"/>
          </div>
          <span class="error-input" id="password-error"></span>
          <button type="submit" form="form-signup" class="btn__form">Registrarte</button>
          <p class="social-text">Registrate con una Red Social</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Red Social de Pymes! Punto Pyme</h3>
          <p>
            La forma más sencilla de hacer crecer tu emprendimiento!
          </p>
          <button class="btn__form transparent" id="sign-up-btn">
            Registrate
          </button>
        </div>
      <!--LOGO PYME-->
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Bienvenid@s!</h3>
          <p>
            Únete a nuestra comunidad y potencia tu emprendimiento. Aquí encontrarás lo que necesitas!
          </p>
          <button class="btn__form transparent" id="sign-in-btn">
            Iniciar Sesión
          </button>
        </div>
        <!--LOGO PYME-->
      </div>
    </div>
  </div>`;

  containerFormTemplate.innerHTML = formTemplate;

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
    userName: new RegExp(/^\w+$/g), // Letras, numeros, guion y guion_bajo
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  };

//validación inputs sign up
  const userValidate = (userNameSignUp) => {
    const userError = containerFormTemplate.querySelector('#user-error');
    let valid = false;
    if (userNameSignUp === '' || userNameSignUp === null) {
      userError.innerHTML = '*Campo obligatorio.';
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
    if ((userPasswordSignUp === '' || userPasswordSignUp === null) || (userPasswordSignUp.length !== 6)) {
      passwordError.innerHTML = '*Campo obligatorio. La contraseña debe tener 6 carácteres.';
    } else if (userPasswordSignUp.length === 6) {
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

  //validación inputs sign in
  const emailInValidate = (userEmailSignIn) => {
    let valid = false;
    const emailInError = containerFormTemplate.querySelector('#email-in-error');
    if (userEmailSignIn === '' || userEmailSignIn === null) {
      console.log('email es obligatorio');
      emailInError.innerHTML = '*Campo obligatorio. Correo no válido';
    }
    if (!expression.email.test(userEmailSignIn)) {
      console.log('email es obligatorio2');
      emailInError.innerHTML = '*Campo obligatorio. Correo no válido';
    }
    if (expression.email.test(userEmailSignIn)) {
      emailInError.innerHTML = '';
      emailInError.style.display = 'none';
      valid = true;
    }
    return valid;
  };
  const passwordInValidate = (userPasswordSignIn) => {
    let valid = false;
    const passwordInError = containerFormTemplate.querySelector('#password-in-error');
    if ((userPasswordSignIn === '' || userPasswordSignIn === null) || (userPasswordSignIn.length !== 6)) {
      passwordInError.innerHTML = '*Campo obligatorio. La contraseña debe tener 6 carácteres.';
    } else if (userPasswordSignIn.length === 6) {
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
  


  // registro de cuenta, email y contraseña-event
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userNameSignUp = inputUserNameSignUp.value;
    const userEmailSignUp = inputUserEmailSignUp.value;
    const userPasswordSignUp = inputUserPasswordSignUp.value;

    if (userValidate(userNameSignUp) && emailValidate(userEmailSignUp) && passwordValidate(userPasswordSignUp)) {
      firebaseSignUp({
        userEmailSignUp,
        userPasswordSignUp,
        userNameSignUp,
      });
    }
  });

  //inicio de sesión email y contraseña-event
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmailSignIn = containerFormTemplate.querySelector('#signin-email').value;
    const userPasswordSignIn = containerFormTemplate.querySelector('#signin-password').value;

    if (emailInValidate(userEmailSignIn) && passwordInValidate(userPasswordSignIn)) {
      firebaseLogIn({ userEmailSignIn, userPasswordSignIn });
    }
  });

  //inicio de sesión google-event
  const googleLoginBtn = containerFormTemplate.querySelector('#google_login');
  googleLoginBtn.addEventListener('click', () => googleLogin());

  return containerFormTemplate;
};
