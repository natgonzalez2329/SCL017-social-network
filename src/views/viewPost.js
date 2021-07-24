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
        <div class="dropdown-post">
          <button id="dropbtn-menupost" class="dropbtn-post">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewbox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <div id="dropcontent-post" class="dropdown-content-post">
            <button>Editar</button>
            <button id="btn__modal-delete">Eliminar</button>
        <div id="container__modal-delete" class="container__modal-delete">
          <div class="content__modal-delete">
              <span class="close__modal-delete" id="close-delete">&times;</span>
              <h1>¿Eliminar Publicación?</h1>
              <hr>
              <p>La publicación se eliminará permanentemente.</p>
            <div class="modal__footer">
              <button class="btn__modal-delete" id="btn-cancel">Cancelar</button>
              <button class="btn__modal-delete" id="btn-delete">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div>imagen</div>
      <div>#likes y recomendaciones</div>
      <div>
        nombre Pyme/Usuario 
        <textarea id="post-info"  name="info" rows="4" cols="50" spellcheck="false" autocomplete="off"></textarea>
      </div>
      <div>Ver # de comentarios</div>
      <div>Añade un comentarios
        <textarea id="post-info"  name="info" rows="4" cols="50" spellcheck="false" autocomplete="off"></textarea>
      </div>
      <div class="modal__footer">
        <button class="btn__modal-post" id="btn-save">Guardar</button>
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

//menu Edit Delete
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  const dropBtnMenuPost = containerPostTemplate.querySelector('#dropbtn-menupost');
  dropBtnMenuPost.addEventListener('click', () => {
    containerPostTemplate.querySelector('#dropcontent-post').classList.toggle('show');
  });

// Close the dropdown if the user clicks outside of it
  window.onclick = (e) => {
    if (!e.target.matches('.dropbtn-post')) {
      const dropdownPost = containerPostTemplate.querySelector('.dropdown-content-post');
      let i;
      for (i = 0; i < dropdownPost.length; i++) {
        const openDropdownPost = dropdownPost[i];
        if (openDropdownPost.classList.contains('show')) {
          openDropdownPost.classList.remove('show');
        }
      }
    }
  };







//-------------- Get the modal delete message----------------
  const modalDelete = containerPostTemplate.querySelector('#container__modal-delete');

// Get the button that opens the modal
  const btnModalDelete = containerPostTemplate.querySelector('#btn__modal-delete');

// Get the <span> element that closes the modal
  const closeModalDelete = containerPostTemplate.querySelector('#close-delete');
  console.log(closeModalDelete);

// When the user clicks the button, open the modal
  btnModalDelete.addEventListener('click', () => {
    modalDelete.style.display = 'block';
  });

// When the user clicks on <span> (x), close the modal
  closeModalDelete.addEventListener('click', () => {
    modalDelete.style.display = 'none';
  });

// When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modalDelete) {
      modalDelete.style.display = 'none';
    }
  };

  return containerPostTemplate;
};
