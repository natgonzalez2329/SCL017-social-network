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
            <input class="input__form" type="text" placeholder="Correo Electrónico" required id="signin-email" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" placeholder="Contraseña" required id="signin-password" required maxlength="9"/>
            <i class="far fa-eye" id="unmaskify"></i>
            <i class="far fa-eye-slash" id="maskify" style ="display:none"></i>
          </div>
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
            <input class="input__form" type="text" id='user-name' placeholder="Usuario" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input class="input__form" type="email" id="user-email" placeholder="Correo Electrónico" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" id="user-password" placeholder="Contraseña" required maxlength="9"/>
            <i class="far fa-eye" id="unmaskify2"></i>
            <i class="far fa-eye-slash" id="maskify2" style ="display:none"></i>
          </div>
         <!-- <div class="input-field">
            <i class="fas fa-lock"></i>
            <select class="form__select" name="area" id="area__pyme">
              <option value="" active>Rubro</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Textil">Textil</option>
              <option value="Agropecuaria">Agropecuaria</option>
              </select>  
          </div>
          -->
          <button type="submit" id="btn-signup" form="form-signup" class="btn__form">Registrarte</button>
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
      <div class="divLogoImage>
      <img class="logoImage" src="./images/logo.png"/>
    </div>
        <div class="content">
          <h3>Punto Pyme</h3>
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
      <div class="divLogoImage>
      <img class="logoImage2" src="./images/logo.png"/>
    </div>
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

  //-------------------- Ocultar/mostrar contraseñas en input de password-signin--------------//
  const inputSigninPassword = containerFormTemplate.querySelector('#signin-password');
  const btnUnmaskify = containerFormTemplate.querySelector('#unmaskify');
  const btnMaskify = containerFormTemplate.querySelector('#maskify');
 

  btnUnmaskify.addEventListener('click', () => {
      inputSigninPassword.type="text";
      btnUnmaskify.style.display = "none";
      btnMaskify.style.display = "block";
     setTimeout(maskify, 2000);
  });

  btnMaskify.addEventListener('click', () => {
               maskify()
  });

  function maskify(){
    inputSigninPassword.type="password";
    btnUnmaskify.style.display = "block";
    btnMaskify.style.display = "none";
    }

 //-------------------- Ocultar/mostrar contraseñas en input de password-signup--------------//

 const inputPassword = containerFormTemplate.querySelector('#user-password');
 const btnUnmaskify2 = containerFormTemplate.querySelector('#unmaskify2');
 const btnMaskify2 = containerFormTemplate.querySelector('#maskify2');


 btnUnmaskify2.addEventListener('click', () => {
     inputPassword.type="text";
     btnUnmaskify2.style.display = "none";
     btnMaskify2.style.display = "block";
    setTimeout(maskify2, 2000);
 });

 btnMaskify2.addEventListener('click', () => {
              maskify2()
 });

 function maskify2(){
   inputPassword.type="password";
   btnUnmaskify2.style.display = "block";
   btnMaskify2.style.display = "none";
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

//registro de cuenta, email y contraseña-event
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = containerFormTemplate.querySelector('#user-email').value;
    const userPassword = containerFormTemplate.querySelector('#user-password').value;
    const userName = containerFormTemplate.querySelector('#user-name').value;
    const area = containerFormTemplate.querySelector('#area__pyme');
    const userArea = area.options[area.selectedIndex].text;
    firebaseSignUp({
      userEmail,
      userPassword,
      userName,
      userArea,
    });
  });

  //inicio de sesión email y contraseña-event
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = containerFormTemplate.querySelector('#signin-email').value;
    const userPassword = containerFormTemplate.querySelector('#signin-password').value;
    firebaseLogIn({ userEmail, userPassword });
  });

  //inicio de sesión google-event
  const googleLoginBtn = containerFormTemplate.querySelector('#google_login');
  googleLoginBtn.addEventListener('click', () => googleLogin());

  return containerFormTemplate;
};
