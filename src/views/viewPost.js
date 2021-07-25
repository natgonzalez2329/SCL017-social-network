export const viewPost = () => {
  const containerPostTemplate = document.createElement('div');
  containerPostTemplate.className = 'container__post-template';

  const postTemplate = `  
  <button id="btn__modal-post">Post</button>
  <div id="container__modal-post" class="container__modal-post">
    <div class="content__modal-post">
      <span class="close__modal-post">&times;</span>
      <div>
        <span>imagen perfil</span>
        <h2>Nombre Pyme/Usuario</h2>
        <form id="post-form">
            <div class="content__form">
              <input type="text" id="post-image" class="content__form-input" name="photo" placeholder="image" autocomplete="off" required/>
            </div>
            <div class="content__form">
              <input type="text" id="post-description" class="content__form-input" name="description" placeholder="Breve descripción..." autocomplete="off" required/>
            </div>
            <div class="modal__footer">
              <button class="btn__modal-post" id="btn-save">Guardar</button>
            </div>
          </form>
    </div>
  </div>
  </div>`;

  containerPostTemplate.innerHTML = postTemplate;

  // Get the modal
  const modalPost = containerPostTemplate.querySelector('#container__modal-post');

  // Get the button that opens the modal
  const btnModalPost = containerPostTemplate.querySelector('#btn__modal-post');

  // Get the <span> element that closes the modal
  const closeModalPost = containerPostTemplate.querySelector('.close__modal-post');

  // When the user clicks the button, open the modal
  btnModalPost.addEventListener('click', () => {
    modalPost.style.display = 'block';
  });

  // When the user clicks on <span> (x), close the modal
  closeModalPost.addEventListener('click', () => {
    modalPost.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modalPost) {
      modalPost.style.display = 'none';
    }
  };

  const postForm = containerPostTemplate.querySelector('#post-form');
// Saving data
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { displayName, email, uid } = firebase.auth().currentUser;
    const getPostPhoto = containerPostTemplate.querySelector('#post-image').value;
    const getPostInfo = containerPostTemplate.querySelector('#post-description').value;
    firebase.firestore().collection('posttestnat').add({
      photo: getPostPhoto,
      description: getPostInfo,
      user: {
        name: displayName,
        email,
        uid,
      },
    });

    modalPost.style.display = 'none';
    containerPostTemplate.querySelector('#post-image').value = '';
    containerPostTemplate.querySelector('#post-description').value = '';
    console.log('Data Saved');
  });

  return containerPostTemplate;
};
