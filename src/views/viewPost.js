export const viewPost = () => {
  const containerPostTemplate = document.createElement('div');
  containerPostTemplate.className = 'container__post-template';

//---------------Inicio menú--------------------------------//
const menuContainer =`<div class="headerContainer">
    <div class="nameApp">PUNTO PYME</div>

    <div class="search">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
       </svg>
      <input type="text" class="inputSearch" placeholder="Buscar">
    </div>

     <div class="menu-icons2">
       <span class="first_item" id="home2">
        <a href='#feed' style='color:white;'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house" viewbox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
        </svg> 
        </a>                          
      </span>
      <span class="second_item2">
      <a href='#post' style='color:white;'>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
      </svg>
      </a>
      </span>
      <span class="third_item2">
      <a href='#feed' style='color:white;'>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewbox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
  </a>
  </span>
  <span class="fourth_item2" id="usuario2">
  <a href='#profile' style='color:white;'>
  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" id="persona1" class="bi bi-person" viewbox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" id="persona2" display="none" class="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  </svg>
    </a>
    </span>
  </div>
   </div> `
   //----------------------------------------------------------//
   
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
              <!-- <video id="post-video" width="400" height="400" autoplay controls autoplay>
              <span id="errorMsg"></span>
              <button id="snap">Capture</button>
              <canvas id="canvas" width="640" height="480"></canvas>
              <button id="btn__image-camera">take pic</button> -->
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
  containerPostTemplate.innerHTML = menuContainer;
  containerPostTemplate.innerHTML += postTemplate;

  // Get the modal
  const modalPost = containerPostTemplate.querySelector('#container__modal-post');

  // Get the button that opens the modal
  const btnModalPost = containerPostTemplate.querySelector('#btn__modal-post');

  // Get the <span> element that closes the modal
  const closeModalPost =
    containerPostTemplate.querySelector('.close__modal-post');

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
          console.log(snapshot.ref.getDownloadURL());
          return snapshot.ref.getDownloadURL();
        })
        .then((url) => {
          console.log(url);
          const imagePost = containerPostTemplate.querySelector('#image-post');
          imagePost.src = url;
        })
        .catch(console.error);
    } else {
      console.log('no existe ningun archivo');
    }
  });

  // Webcam code
  /*const videoPost = containerPostTemplate.querySelector('#post-video');
  const canvas = containerPostTemplate.querySelector('#canvas');
  const snap = containerPostTemplate.querySelector('#snap');

  const constraints = {
    audio: false,
    video: {
      width: 400, height: 400,
    },
  };
  // Success to access webcam
  const handleSuccess = (stream) => {
    window.stream = stream;
    videoPost.srcObject = stream;
  };
  // Access webcam
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      const errorMsgElement = containerPostTemplate.querySelector('#errorMsg');
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  };

  // Load init
  initCamera();

  // Draw image
  const contextCanvas = canvas.getContext('2d');
  snap.addEventListener('click', () => {
    contextCanvas.drawImage(videoPost, 0, 0, 640, 480);
    const imageCameraPost = new Image();
    imageCameraPost.id = 'pic';
    imageCameraPost.src = canvas.toDataURL();
    console.log(imageCameraPost.src);
    const buttonTakePic = containerPostTemplate.querySelector('#btn__image-camera');

    buttonTakePic.addEventListener('click', () => {
      console.log(buttonTakePic)
      const ref = firebase.storage().ref();
      ref.child(`${new Date()}-base64`).putString(imageCameraPost.src, 'data_url')
      .then((snapshot) => {
        console.log('Uploaded a data_url string!');
        alert("Image Uploaded")
      });
    });
  });*/

  const postForm = containerPostTemplate.querySelector('#post-form');
  // Saving data
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { displayName, email, uid } = firebase.auth().currentUser;
    const getPostPhoto = containerPostTemplate.querySelector('#post-photo').value;
    const getPostInfo = containerPostTemplate.querySelector('#post-description').value;
    firebase
      .firestore()
      .collection('pyme-posts')
      .add({
        photo: getPostPhoto,
        description: getPostInfo,
        user: {
          name: displayName,
          email,
          uid,
        },
      });

    modalPost.style.display = 'none';
    containerPostTemplate.querySelector('#image-post').src = '';
    containerPostTemplate.querySelector('#post-form').reset();
    console.log('Data Saved');
  });

  return containerPostTemplate;
};
