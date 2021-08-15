//import { viewFeed } from './viewFeed.js';

export const viewPost = () => {
  // eslint-disable-next-line no-var
  //const containerViews = document.querySelector('#root');
  const containerPostTemplate = document.createElement('div');
  containerPostTemplate.className = 'container__post-template';

  const postTemplate = `  
 <div id="container__modal-post" class="container__modal-post">
    <div class="content__modal-post">
      <span class="close__modal-post">&times;</span>
      <div>
        <form id="post-form">
            <div class="content__form">
              <div class="container__image-preview" id="container__image-post">
                      <img  src="" class="image-preview" id="image-post" alt="Image Preview"/>
                      <span class="image-preview__text">Vista Previa</span>
              </div>
              <div class="file">
              <label for="post-image__input">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id="iconImagePost" class="bi bi-card-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
              </svg>
            </label>
              <input type="file" id="post-image__input" class="content__form-input"/>
              </div>
              </div>
              <div class="content__form">
              <textarea type="text" id="post-description" class="content__form-input" name="description" rows="4" cols="50" maxlength="50" placeholder="Breve descripción..." autocomplete="off" required></textarea>
            </div>
            <div class="modal__footer">
              <button class="btn__modal-post" id="btn-save">Publicar</button>
            </div>
          </form>
    </div>
  </div>
  </div>`;
  containerPostTemplate.innerHTML += postTemplate;

  // Get the modal
  const modalPost = containerPostTemplate.querySelector('#container__modal-post');

  // Get the <span> element that closes the modal
  const closeModalPost = containerPostTemplate.querySelector('.close__modal-post');

  // When the user clicks on <span> (x), close the modal
  closeModalPost.addEventListener('click', () => {
    modalPost.style.display = 'none';
    containerPostTemplate.querySelector('#image-post').src = '';
    containerPostTemplate.querySelector('#post-form').reset();
  });

  // When the user clicks anywhere outside of the modal, close it//NO ESTA FUNCIONANDO
  window.onclick = (e) => {
    if (e.target === modalPost) {
      modalPost.style.display = 'none';
    }
  };

  const postForm = containerPostTemplate.querySelector('#post-form');
  // Saving data
  const uploadImage = async () => {
    const ref = firebase.storage().ref();
    const file = containerPostTemplate.querySelector('#post-image__input').files[0];
    let url;
    if (file) {
      const nameFile = `${new Date()}-${file.name}`;
      const metadata = {
        contentType: file.type,
      };
      const task = await ref.child(nameFile).put(file, metadata);
        console.log(task.ref.getDownloadURL());
        url = task.ref.getDownloadURL();
    } else {
      console.log('no existe ningun archivo');
    }
    return url;
  };

    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const imageURL = await uploadImage();
      const { displayName, email, uid } = firebase.auth().currentUser;
      const getPostInfo = containerPostTemplate.querySelector('#post-description').value;
      firebase
        .firestore()
        .collection('pyme-posts')
        .add({
          imageURL,
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
      //containerViews.appendChild(await viewFeed());
      console.log('Data Saved');
    });

  // preview image
  const inputFile = containerPostTemplate.querySelector('#post-image__input');
  const previewContainer = containerPostTemplate.querySelector('#container__image-post');
  const previewImage = previewContainer.querySelector('#image-post');
  const previewDefaultText = previewContainer.querySelector('.image-preview__text');

  inputFile.addEventListener('change', () => {
    const file = containerPostTemplate.querySelector('#post-image__input').files[0];
    if (file) {
      const reader = new FileReader();
      previewDefaultText.style.display = 'none';
      previewImage.style.display = 'block';
      reader.addEventListener('load', () => {
        previewImage.setAttribute('src', reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      previewDefaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute('src', '');
    }
  });

  return containerPostTemplate;
};
//imagen.src = URL.createObjectURL(file); preview image
