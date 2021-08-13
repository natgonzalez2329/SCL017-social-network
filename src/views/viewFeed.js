import { topMenuComponent,mobileMenuComponent } from './components/navbar.js';
import { viewPost } from './viewPost.js';
//import { topMenuComponent } from './components/navbarTop.js';

import { fetchPosts } from '../lib/firebase.js';
import { firebaseLogout } from '../lib/firebase.js';
// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewFeed = async () => {
  containerViews.innerHTML = '';

  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';

  
  containerFeedTemplate.appendChild(topMenuComponent());
 


  const feedTemplate = `
    <div>tu nombre: <span id='username'>${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span></div>
    <div class='view__feed'>Feed</div>`;
  containerFeedTemplate.innerHTML += feedTemplate;

  let containerPostFeed = '';
  const posts = await fetchPosts(firebase);
  if (posts.length > 0) {
    posts.forEach((post, i) => {
      containerPostFeed += `
      <li class='container_post-feed'>
        <div class='container__image' id='container__image-post'>
          <img src='${post.data.imageURL}' class='image-post' id='image-post'/>
        </div>
        <div class='container-btn-like' pid='${post.id}'>
        <button class='like__btn' id='like'>
          <span id='icon${i}'><i id='iconUp${post.data.likes.includes(firebase.auth().currentUser.uid) ? '2' + i : i}' class='${post.data.likes.includes(firebase.auth().currentUser.uid) ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}'></i></span>
          <span id='count${i}'>${post.data.likes.length  > 0 ? post.data.likes.length : ''}</span> Me Gusta
        </button> <button id='count2${i}' class='recommended__btn'>
        <span id='icon2${i}'><i class='bi bi-check-circle'></i></span>
          Recomendado
        </button>
      </div>
        <h5>${post.data.photo}</h5>
        <p>${post.data.description}</p>
       
      </li>`;
    });

    const feedPostTemplate = `<ul id='posts'>${containerPostFeed}</ul>`;
    containerFeedTemplate.innerHTML += feedPostTemplate;
    //likes
    const likeBtn = containerFeedTemplate.querySelectorAll('#like');

   likeBtn.forEach(async (btn, i) => {
      const post = await fetchPosts(firebase);
      const postLikes = post[i].data.likes;
      console.log(postLikes);
      const idCurrentUser = firebase.auth().currentUser.uid;
      const likeIcon = containerFeedTemplate.querySelector(`#icon${i}`);
      const count = containerFeedTemplate.querySelector(`#count${i}`);
      let clicked = false;
      btn.addEventListener('click', async (e) => {
        const id = e.target.parentElement.getAttribute('pid');
        console.log(id)
        const dataRef = await firebase.firestore().collection('pyme-posts').doc(id);
        if (!postLikes.includes(idCurrentUser) && !clicked) {
          clicked = true;
          likeIcon.innerHTML = `<i id='iconUp2${i}' class="fas fa-thumbs-up"></i>`;
          postLikes.push(idCurrentUser);
          dataRef.update({ likes: postLikes });
          count.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
        } else {
          clicked = false;
          likeIcon.innerHTML = `<i id='iconUp${i}' class="far fa-thumbs-up"></i>`;
          const index = postLikes.indexOf(idCurrentUser);
          postLikes.splice(index, 1);
          // const newPostLike = postLikes.filter((like) => like !== idCurrentUser);
          dataRef.update({ likes: postLikes });
          count.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
          console.log(`postlike: ${postLikes.includes(idCurrentUser)}`);
        }
      });
    });
    ;
  } else {
    containerPostFeed = '<li>Se el primero en publicar</li>';
  }
 
  containerFeedTemplate.appendChild(mobileMenuComponent());
   containerFeedTemplate.appendChild(viewPost());
   const btnPlus = containerFeedTemplate.querySelector('.second_item');
  const modalPost = containerFeedTemplate.querySelector('.container__modal-post');
  btnPlus.addEventListener('click', () => {
    modalPost.style.display = 'block';
  });

  const logOutBtn = containerFeedTemplate.querySelector('.logout-btn');
  logOutBtn.addEventListener('click', () => {
      alert("chao!");
      firebaseLogout();
  });
  
   

  return containerFeedTemplate;
};
