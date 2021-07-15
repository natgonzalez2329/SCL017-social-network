export const viewForms = () => {
  /*const containerFormTemplate = document.createElement('div');
  containerFormTemplate.className = 'container__form-template';
  containerFormTemplate.id = 'container__form-template';*/
  const formTemplate = `
  <div class="container__form-template">
  <div class="container__forms">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Inicio de Sesión</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input class="input__form" type="text" placeholder="Correo Electrónico" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" placeholder="Contraseña" />
          </div>
          <a href="#/posts"><input type="button" class="btn__form" value="Iniciar Sesión"/></a>
          <p class="social-text">O accede con una Red Social</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <h2 class="title">Crea una cuenta</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input class="input__form" type="text" placeholder="Usuario" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input class="input__form" type="email" placeholder="Correo Electrónico" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input class="input__form" type="password" placeholder="Contraseña" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <select class="form__select" name="area" id="area__pyme">
              <option value="" active>Rubro</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Textil">Textil</option>
              <option value="Agropecuaria">Agropecuaria</option>
              </select>  
          </div>
          <a href="#/posts"><input type="button" class="btn__form" value="Registrarte" /></a>
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
    </div>
  </div>`;
  /*containerFormTemplate.innerHTML = formTemplate;*/
  return formTemplate;
};
