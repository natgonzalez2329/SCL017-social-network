export const viewPost = () => {
  const containerPostTemplate = document.createElement('div');
  containerPostTemplate.className = 'container__post-template';

  const postTemplate = `  
 <div id="container__modal-post" class="container__modal-post">
    <div class="content__modal-post">
      <span class="close__modal-post">&times;</span>
      <div>
        <span>imagen perfil</span>
        <h2>Nombre Pyme/Usuario</h2>
        <form id="post-form">
            <div class="content__form">
              <div class="image-preview" id="container__image-post">
              <img class="image-preview" id="image-post"/>
              <span class="image-preview__text">Imagen</span>
              </div>
              <div class="file">
              <label for="post-image">Selecciona Imagen</label>
              <input type="file" id="post-image" class="content__form-input"/>
              <button id="btn__upload-image"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewbox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg></button>
              </div>
              </div>
              <div class="content__form">
              <input type="text" id="post-photo" class="content__form-input" name="photo" placeholder="image" autocomplete="off"/>
              <input type="text" id="post-description" class="content__form-input" name="description" placeholder="Breve descripción..." autocomplete="off" required/>
            </div>
            <div class="modal__footer">
              <button class="btn__modal-post" id="btn-save">Guardar</button>
            </div>
          </form>
    </div>
  </div>
  </div>`;
  containerPostTemplate.innerHTML += postTemplate;

  // Get the modal
  const modalPost = containerPostTemplate.querySelector('#container__modal-post');

  // Get the button that opens the modal
  // const btnModalPost = containerPostTemplate.querySelector('#btn__modal-post');

  // Get the <span> element that closes the modal
  const closeModalPost = containerPostTemplate.querySelector('.close__modal-post');

  // When the user clicks the button, open the modal
  /* btnModalPost.addEventListener('click', () => {
    modalPost.style.display = 'block';
  }); */

  // When the user clicks on <span> (x), close the modal
  closeModalPost.addEventListener('click', () => {
    modalPost.style.display = 'none';
    containerPostTemplate.querySelector('#image-post').src = '';
    containerPostTemplate.querySelector('#post-form').reset();
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modalPost) {
      modalPost.style.display = 'none';
    }
  };

  const postForm = containerPostTemplate.querySelector('#post-form');
  // Saving data
  const savePost = (imageURL) => {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { displayName, email, uid } = firebase.auth().currentUser;
      const getPostPhoto = containerPostTemplate.querySelector('#post-photo').value;
      const getPostInfo = containerPostTemplate.querySelector('#post-description').value;
      firebase
        .firestore()
        .collection('pyme-posts')
        .add({
          imageURL,
          photo: getPostPhoto,
          description: getPostInfo,
          user: {
            name: displayName,
            email,
            uid,
          },
          likes: [],
          recommend: [],
        });

      modalPost.style.display = 'none';
      containerPostTemplate.querySelector('#image-post').src = '';
      containerPostTemplate.querySelector('#post-form').reset();
      console.log('Data Saved');
    });
  };

  // Upload Image
  const btnUploadImage = containerPostTemplate.querySelector('#btn__upload-image');
  btnUploadImage.addEventListener('click', () => {
    const ref = firebase.storage().ref();
    const file = containerPostTemplate.querySelector('#post-image').files[0];
    if (file) {
      const nameFile = `${new Date()}-${file.name}`;
      const metadata = {
        contentType: file.type,
      };
      const task = ref.child(nameFile).put(file, metadata);
      task
        .then((snapshot) => {
          // eslint-disable-next-line no-console
          console.log(snapshot.ref.getDownloadURL());
          return snapshot.ref.getDownloadURL();
        })
        .then((url) => {
          console.log(url);
          const imagePost = containerPostTemplate.querySelector('#image-post');
          imagePost.src = url;
          savePost(url);
        })
        .catch(console.error);
    } else {
      console.log('no existe ningun archivo');
    }
  });


  return containerPostTemplate;
};
//imagen.src = URL.createObjectURL(file); preview image
