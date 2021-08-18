/* eslint-disable no-console */
import { topMenuComponent, mobileMenuComponent } from './components/navbar.js';
import { firebaseLogout, fetchPosts } from '../lib/firebase.js';
import { viewPost } from './viewPost.js';

const containerViews = document.querySelector('#root');

export const viewProfile = async () => {
  containerViews.innerHTML = '';

  const containerProfileTemplate = document.createElement('div');

  containerProfileTemplate.className = 'container__profile-template';
  containerProfileTemplate.appendChild(topMenuComponent());

  const profileTemplate = `
  <div class="content__profile">
    <div class="profile-info">
    <div class='image__profile-user'>
        <img src='images/UserImage.svg' class='image__user-profile' id='image__user-profile'/>
    </div>
    <div class="info-user">
      <span id='username-profile'>${window.localStorage.getItem('puntopyme-name')}</span>
      <div class='select-inputfield'>
            <i id ="icon-store" class="fas fa-store"></i>
            <select class='form__select' name='area' id='area__pyme'>
              <option value='' active>Rubro</option>
              <option value='Alimentos'>Alimentos</option>
              <option value='Textil'>Textil</option>
              <option value='Agropecuaria'>Agropecuaria</option>
              </select>  
      </div>
      Información de Pyme
    </div>
    </div>
    <button class='btn__edit-profile'><i class="far fa-edit"></i>Editar Perfil</button>
          </div>`;

  containerProfileTemplate.innerHTML += profileTemplate;
  let containerPostProfile = '';

  const posts = await fetchPosts(firebase, firebase.auth().currentUser.uid);
  if (posts.length > 0) {
    posts.forEach((post, i) => {
      containerPostProfile += `
      <li class="container_post-profile">
      <div class="user__post">
        <div class='user__post-info'>
          <img src='images/UserImage.svg' class='image__user-post' id='image__user-postProfile'/>
          <div class="user-info">
            <span class='username-post'>${post.data.user.name}</span><br>
            <small>Fecha</small>
          </div>
        </div>
        <div class='dropdown-post'>
          <button id='dropbtn-menupost' class='dropbtn-post'>
            <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-three-dots-vertical' id='bi-three-dots-vertical${i}' viewbox='0 0 16 16'>
              <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/>
            </svg>
          </button>
            <div id='dropcontent-post${i}' class='dropdown-content-post'>
              <button class="btn__menudd" id='btn__edit${i}'>Editar</button>
              <div id='container__modal-edit${i}' class='container__modal-edit'>
                <div class='content__modal-edit'>
                  <span class='close__modal-edit' id='close-edit${i}'>&times;</span>
                  <div>
                    <span id="title-modalEdit">Editar descripción:</span>
                    <div class="wrapper__input">
                      <i class="fas fa-edit"></i>
                      <p id="text-modalEdit"><input type='text' class="wrapper__input-text" id='editText${i}' value='${post.data.description}' /></p>
                    </div>
                  </div>
                  <div class='modal__footer'>
                    <button type='button' class='btn__modal-edit' id='btn-edit${i}' pid='${post.id}'>Guardar</button>
                  </div>
                </div>
              </div>
            <button class="btn__menudd" id='btn__modal-delete${i}'>Eliminar</button>
        <div id='container__modal-delete${i}' class='container__modal-delete'>
          <div class='content__modal-delete'>
              <span class='close__modal-delete' id='close-delete${i}'>&times;</span>
              <div>
              <h1 id="title-modalDelete">¿Eliminar Publicación?</h1>
              <p id="text-modalDelete">La publicación se eliminará permanentemente.</p>
              </div>
            <div class='modal__footer'>
              <button class='btn__modal-delete' id='btn-cancel${i}'>Cancelar</button>
              <button pid='${post.id}' class='btn__modal-delete' id='btn-delete${i}'>Eliminar</button>
                </div>
              </div>
            </div>
            </div>
        </div> 
        </div>
      </div>
      <div class="container__image">
          <img src='${post.data.imageURL}' class="image-post" id="image-post"/>
      </div>
      <div class='container-btn-like'>
        <button class='like__btn'>
          <span><i class='fas fa-thumbs-up'></i></span>
          <span>${post.data.likes.length > 0 ? post.data.likes.length : ''}</span> Me Gusta </button> 
          <button class='recommend__btn'>
        <span id='iconRecommend${i}'><i class='fas fa-check-circle'></i></span>
        <span id='countRecommend${i}'>${post.data.recommend.length > 0 ? post.data.recommend.length : ''}</span> Recomendado </button>
      </div>
        <div class="area-post"><span><strong>${post.data.area}</strong></span></div>
        <div class="description-post">
          <span class='username-post'>${post.data.user.name}</span>
            <p class="text-post">${post.data.description}</p>
        </div>
      </li>
      `;
    });
    const profilePostTemplate = `<ul id='posts__Profile' class="container__posts-profile">${containerPostProfile}</ul>`;
    containerProfileTemplate.innerHTML += profilePostTemplate;

    // menu Edit Delete
    const dropBtnMenuPost = containerProfileTemplate.querySelectorAll('#dropbtn-menupost');
    dropBtnMenuPost.forEach((dropbtnmenu, i) => {
      dropbtnmenu.addEventListener('click', () => {
        containerProfileTemplate
          .querySelector(`#dropcontent-post${i}`)
          .classList.toggle('show');
      });

      const modalDelete = containerProfileTemplate.querySelector(`#container__modal-delete${i}`);
      const btnModalDelete = containerProfileTemplate.querySelector(`#btn__modal-delete${i}`);
      const closeModalDelete = containerProfileTemplate.querySelector(`#close-delete${i}`);

      btnModalDelete.addEventListener('click', () => {
        modalDelete.style.display = 'block';
      });

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
      const btnModalEdit = containerProfileTemplate.querySelector(`#btn__edit${i}`);
      const closeModalEdit = containerProfileTemplate.querySelector(`#close-edit${i}`);

      btnModalEdit.addEventListener('click', () => {
        modalEdit.style.display = 'block';
      });

      closeModalEdit.addEventListener('click', () => {
        modalEdit.style.display = 'none';
      });

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
          console.log('Document successfully updated!');
          modalEdit.style.display = 'none';
          containerViews.appendChild(await viewProfile()); // ruta muro posts
        } catch (error) {
          console.error('Error updating document: ', error);
        }
      });
    });
  } else {
    containerProfileTemplate.innerHTML += '<ul id=\'posts\' class="container__posts-profile"><li>Publica tu primer post</li></ul>';
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
    firebaseLogout();
  });

  return containerProfileTemplate;
};
