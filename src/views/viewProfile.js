import { fetchPosts } from '../lib/firebase.js';

// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewProfile = async () => {
  containerViews.innerHTML = '';

  const containerProfileTemplate = document.createElement('div');
  containerProfileTemplate.className = 'container__profile-template';

  //---------------Inicio menú--------------------------------//
  const menuContainer = `<div class="headerContainer">
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
<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" id="persona2" class="bi bi-person-fill" viewBox="0 0 16 16">
<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>
</a>
</span>
</div>
</div> `
  //-------------------------------------------------------------------------------------//
  containerProfileTemplate.innerHTML = menuContainer;


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

  return containerProfileTemplate;
};

/* const area = containerFormTemplate.querySelector('#area__pyme');
    const userAreaSignUp = area.options[area.selectedIndex].text; */
