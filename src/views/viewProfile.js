import { topMenuComponent, mobileMenuComponent } from './components/navbar.js';
import { firebaseLogout } from '../lib/firebase.js';
import { viewPost } from './viewPost.js';
//import { topMenuComponent } from './components/navbarTop.js';

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
    posts.forEach((post, i) => {
      containerPostProfile += `
      <li class="container_post-profile">
      <div class='dropdown-post'>
          <button id='dropbtn-menupost' class='dropbtn-post'>
            <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-three-dots-vertical' id='bi-three-dots-vertical${i}' viewbox='0 0 16 16'>
              <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/>
            </svg>
          </button>
          <div id='dropcontent-post${i}' class='dropdown-content-post'>
            <button id='btn__edit${i}'>Editar</button>
            <div id='container__modal-edit${i}' class='container__modal-edit'>
          <div class='content__modal-edit'>
              <span class='close__modal-edit' id='close-edit${i}'>&times;</span>
              <h1>lo que se va a editar: ${post.data.photo}</h1>
              <p><input type='text' id='editText${i}' value='${post.data.description}' /></p>
            <div class='modal__footer'>
              <button type='button' class='btn__modal-edit' id='btn-edit${i}' pid='${post.id}'>Publicar</button>
              </div>
              </div>
            </div>
            <button id='btn__modal-delete${i}'>Eliminar</button>
        <div id='container__modal-delete${i}' class='container__modal-delete'>
          <div class='content__modal-delete'>
              <span class='close__modal-delete' id='close-delete${i}'>&times;</span>
              <h1>¿Eliminar Publicación?</h1>
              <p>La publicación se eliminará permanentemente.</p>
            <div class='modal__footer'>
              <button class='btn__modal-delete' id='btn-cancel${i}'>Cancelar</button>
              <button pid='${post.id}' class='btn__modal-delete' id='btn-delete${i}'>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <div class="container__image" id="container__image-post">
          <img src='${post.data.imageURL}' class="image-post" id="image-post"/>
      </div>
      <h5>${post.data.photo}</h5>
      <p>${post.data.description}</p>
      </li>
      `;
    });
    const profilePostTemplate = `<ul id='posts' class="container__posts-profile">${containerPostProfile}</ul>`;
    containerProfileTemplate.innerHTML += profilePostTemplate;

    // menu Edit Delete

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
    const dropBtnMenuPost = containerProfileTemplate.querySelectorAll('#dropbtn-menupost');
    dropBtnMenuPost.forEach((dropbtnmenu, i) => {
      dropbtnmenu.addEventListener('click', () => {
        containerProfileTemplate
          .querySelector(`#dropcontent-post${i}`)
          .classList.toggle('show');
      });

      // -------------- Get the modal delete message----------------
      const modalDelete = containerProfileTemplate.querySelector(`#container__modal-delete${i}`);

      // Get the button that opens the modal
      const btnModalDelete = containerProfileTemplate.querySelector(`#btn__modal-delete${i}`);

      // Get the <span> element that closes the modal
      const closeModalDelete = containerProfileTemplate.querySelector(`#close-delete${i}`);

      // When the user clicks the button, open the modal
      btnModalDelete.addEventListener('click', () => {
        modalDelete.style.display = 'block';
      });

      // When the user clicks on <span> (x), close the modal
      closeModalDelete.addEventListener('click', () => {
        modalDelete.style.display = 'none';
      });

      const btnDelete = containerProfileTemplate.querySelector(`#btn-delete${i}`);
      const btnCancel = containerProfileTemplate.querySelector(`#btn-cancel${i}`);
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
      const modalEdit = containerProfileTemplate.querySelector(`#container__modal-edit${i}`);

      // Get the button that opens the modal
      const btnModalEdit = containerProfileTemplate.querySelector(`#btn__edit${i}`);

      // Get the <span> element that closes the modal
      const closeModalEdit = containerProfileTemplate.querySelector(`#close-edit${i}`);

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
        if (e.target === modalDelete) {
          modalDelete.style.display = 'none';
        }
        if (e.target === modalEdit) {
          modalEdit.style.display = 'none';
        }
      };

      // Update post
      const editDescription = containerProfileTemplate.querySelector(`#btn-edit${i}`);
      editDescription.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = e.target.getAttribute('pid');
        const newDescription = containerProfileTemplate.querySelector(`#editText${i}`);
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

    });

   /*  window.onclick = (e) => {
      const dropBtnPost = containerProfileTemplate.querySelectorAll('.dropbtn-post');
      const threeDots = containerProfileTemplate.querySelectorAll('.bi-three-dots-vertical');
      if (!e.target.matches('.dropbtn-post') && !e.target.matches('.bi.bi-three-dots-vertical')) {
        dropBtnPost.forEach((dbp) => {
          console.log(dbp.nextElementSibling.classList)
          if (dbp.nextElementSibling.classList.contains('show')) {
            dbp.nextElementSibling.classList.remove('show');
          }
        });
        if (e.target.matches('.bi.bi-three-dots-vertical')) {
          threeDots.forEach((dbp) => {
            dbp.classList.toggle()
          });
        }
      }
       dropBtnPost.forEach(() => {
         console.log(e.target.parentElement)
       })
       threeDots.forEach(() => {
         console.log(e.target.parentElement.parentElement)
       })
    }; */

   /*  window.onclick = (e) => {
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
    }; */

  } else {
    containerPostProfile += '<li>Publica tu primer post</li>';
  }
  containerProfileTemplate.appendChild(mobileMenuComponent());
  containerProfileTemplate.appendChild(viewPost());
  const btnPlus = containerProfileTemplate.querySelector('.second_item');
  const modalPost = containerProfileTemplate.querySelector('.container__modal-post');
  btnPlus.addEventListener('click', () => {
    modalPost.style.display = 'block';
  });

  const logOutBtn = containerProfileTemplate.querySelector('.logout-btn');
  logOutBtn.addEventListener('click', () => {
      alert("chao!");
      firebaseLogout();
  });


  return containerProfileTemplate;
};

/* const area = containerFormTemplate.querySelector('#area__pyme');
    const userAreaSignUp = area.options[area.selectedIndex].text; */
