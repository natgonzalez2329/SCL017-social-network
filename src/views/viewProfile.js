import { mobileMenuComponent } from './components/navbar.js';
import { topMenuComponent } from './components/navbarTop.js';
import { fetchPosts } from '../lib/firebase.js';

// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewProfile = async () => {
  containerViews.innerHTML = '';

  const containerProfileTemplate = document.createElement('div');
  containerProfileTemplate.className = 'container__profile-template';
 
  containerProfileTemplate.appendChild(topMenuComponent());


  const profileTemplate = `
  <div class='view__profile'>Profile</div>
  <div class="content__profile">
  <div class='image__profile-user'>IMAGEN PERFIL</div>
    <div class="profile-info">
    Your Name: <span id='username'>${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span>
    <div class='select-inputfield'>
            <i class='fas fa-lock'></i>
            <select class='form__select' name='area' id='area__pyme'>
              <option value='' active>Rubro</option>
              <option value='Alimentos'>Alimentos</option>
              <option value='Textil'>Textil</option>
              <option value='Agropecuaria'>Agropecuaria</option>
              </select>  
          </div>
          BREVE DESCRIPCIÓN
    </div>
    <button class='btn__edit-profile'>BOTON EDITAR PERFIL</button>
          </div>`;
  containerProfileTemplate.innerHTML += profileTemplate;

  let containerPostProfile = '';
  const posts = await fetchPosts(firebase, firebase.auth().currentUser.uid);
  if (posts.length > 0) {
    posts.forEach((post) => {
      containerPostProfile += `
      <li class="container_post-profile">
      <div class='dropdown-post'>
          <button id='dropbtn-menupost' class='dropbtn-post'>
            <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-three-dots-vertical' viewbox='0 0 16 16'>
              <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/>
            </svg>
          </button>
          <div id='dropcontent-post' class='dropdown-content-post'>
            <button id='btn__edit'>Editar</button>
            <div id='container__modal-edit' class='container__modal-edit'>
          <div class='content__modal-edit'>
              <span class='close__modal-edit' id='close-edit'>&times;</span>
              <h1>lo que se va a editar: ${post.data.photo}</h1>
              <p><input type='text' id='editText' value='${post.data.description}' /></p>
            <div class='modal__footer'>
              <button type='button' class='btn__modal-edit' id='btn-edit' pid='${post.id}'>Publicar</button>
              </div>
              </div>
            </div>
            <button id='btn__modal-delete'>Eliminar</button>
        <div id='container__modal-delete' class='container__modal-delete'>
          <div class='content__modal-delete'>
              <span class='close__modal-delete' id='close-delete'>&times;</span>
              <h1>¿Eliminar Publicación?</h1>
              <p>La publicación se eliminará permanentemente.</p>
            <div class='modal__footer'>
              <button class='btn__modal-delete' id='btn-cancel'>Cancelar</button>
              <button pid='${post.id}' class='btn__modal-delete' id='btn-delete'>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <h5>${post.data.photo}</h5>
      <p>${post.data.description}</p>
      </li>
      `;
    });
    const profilePostTemplate = `<ul id='posts' class="container__posts-profile">${containerPostProfile}</ul>`;
    containerProfileTemplate.innerHTML += profilePostTemplate;

    // menu Edit Delete
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    const dropBtnMenuPost = containerProfileTemplate.querySelector('#dropbtn-menupost');
    dropBtnMenuPost.addEventListener('click', () => {
      containerProfileTemplate
        .querySelector('#dropcontent-post')
        .classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.onclick = (e) => {
      if (!e.target.matches('.dropbtn-post')) {
        const dropdownPost = containerProfileTemplate.querySelector('.dropdown-content-post');
        let i;
        for (i = 0; i < dropdownPost.length; i + 1) {
          const openDropdownPost = dropdownPost[i];
          if (openDropdownPost.classList.contains('show')) {
            openDropdownPost.classList.remove('show');
          }
        }
      }
    };

    // -------------- Get the modal delete message----------------
    const modalDelete = containerProfileTemplate.querySelector('#container__modal-delete');

    // Get the button that opens the modal
    const btnModalDelete = containerProfileTemplate.querySelector('#btn__modal-delete');

    // Get the <span> element that closes the modal
    const closeModalDelete = containerProfileTemplate.querySelector('#close-delete');

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

    const btnDelete = containerProfileTemplate.querySelector('#btn-delete');
    const btnCancel = containerProfileTemplate.querySelector('#btn-cancel');
    btnCancel.addEventListener('click', () => {
      modalDelete.style.display = 'none';
    });

    btnDelete.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = e.target.getAttribute('pid');
      await firebase.firestore().collection('pyme-posts').doc(id).delete();
      console.log('Post Deleted');
      modalDelete.style.display = 'none';
      containerViews.appendChild(await viewProfile()); // ruta muro posts
    });

    // update modal
    const modalEdit = containerProfileTemplate.querySelector('#container__modal-edit');

    // Get the button that opens the modal
    const btnModalEdit = containerProfileTemplate.querySelector('#btn__edit');

    // Get the <span> element that closes the modal
    const closeModalEdit = containerProfileTemplate.querySelector('#close-edit');

    // When the user clicks the button, open the modal
    btnModalEdit.addEventListener('click', () => {
      modalEdit.style.display = 'block';
    });

    // When the user clicks on <span> (x), close the modal
    closeModalEdit.addEventListener('click', () => {
      modalEdit.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (e) => {
      if (e.target === modalEdit) {
        modalEdit.style.display = 'none';
      }
    };

    // Update post
    const editDescription = containerProfileTemplate.querySelector('#btn-edit');
    editDescription.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = e.target.getAttribute('pid');
      const newDescription = containerProfileTemplate.querySelector('#editText');
      try {
        const dataRef = await firebase.firestore().collection('pyme-posts').doc(id);
        await dataRef.update({ description: newDescription.value });
        console.log("Document successfully updated!");
        modalEdit.style.display = 'none';
        containerViews.appendChild(await viewProfile()); // ruta muro posts
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    });
  } else {
    containerPostProfile += '<li>Publica tu primer post</li>';
  }
  containerProfileTemplate.appendChild(mobileMenuComponent());
  return containerProfileTemplate;
};

/* const area = containerFormTemplate.querySelector('#area__pyme');
    const userAreaSignUp = area.options[area.selectedIndex].text; */
