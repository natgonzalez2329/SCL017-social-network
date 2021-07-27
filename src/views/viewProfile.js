export const viewProfile = () => {
  const containerProfileTemplate = document.createElement('div');
  containerProfileTemplate.className = 'container__profile-template';
  const profileTemplate = `
    <div class="view__profile">profile</div>
    <div class="input-field">
            <i class="fas fa-lock"></i>
            <select class="form__select" name="area" id="area__pyme">
              <option value="" active>Rubro</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Textil">Textil</option>
              <option value="Agropecuaria">Agropecuaria</option>
              </select>  
          </div>`;
  containerProfileTemplate.innerHTML = profileTemplate;
  return containerProfileTemplate;
};

/*const area = containerFormTemplate.querySelector('#area__pyme');
    const userAreaSignUp = area.options[area.selectedIndex].text;*/
 