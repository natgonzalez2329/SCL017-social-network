export const viewWall = () => {
  window.location.hash = '#/wall';
  /*const containerWallTemplate = document.createElement('div');
  containerWallTemplate.className = 'container__wall-template';*/
  document.getElementById('root').innerHTML = `
     <div class="container__wall-template">
     <div class="view__wall">wall</div>
     </div>`;
  //containerWallTemplate.innerHTML = wallTemplate;
  //return wallTemplate;
};
