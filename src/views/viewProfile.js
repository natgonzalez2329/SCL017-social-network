export const viewProfile = () => {
  window.location.hash = '#/profile';
  /*const containerProfileTemplate = document.createElement('div');
  containerProfileTemplate.className = 'container__profile-template';*/
  document.getElementById('root').innerHTML = `
     <div class="container__profile-template">
     <div class="view__profile">profile</div>
     </div>`;
  //containerProfileTemplate.innerHTML = profileTemplate;
  //return profileTemplate;
};
