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
 

  let containerPostFeed = '';
  const posts = await fetchPosts(firebase);
  if (posts.length > 0) {
    posts.forEach((post) => {
      containerPostFeed += `
      <li class="container_post-feed">
      <h5>${post.data.photo}</h5>
      <p>${post.data.description}</p>
    
      <div class="container-btn-like">
  <button class="like__btn">
    <span id="icon"><i class="far fa-thumbs-up"></i></span>
    <span id="count">0</span> Likes
  </button>
</div>

      </li>
      `;
    });
    const feedTemplate = `
    <div>tu nombre: <span id='username'>${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span></div>
    <div class='view__feed'>Feed</div>
    <ul id='posts'>${containerPostFeed}</ul>`;
    containerFeedTemplate.innerHTML += feedTemplate;
  } else {
    containerPostFeed = '<li>Se el primero en publicar</li>';
  }
  
  const likeBtn = containerFeedTemplate.querySelector('.like__btn');
  const likeIcon = containerFeedTemplate.querySelector('#icon');
  let count = containerFeedTemplate.querySelector('#count');
  let clicked = false;
  
  likeBtn.addEventListener('click', () =>{
if (!clicked){
  clicked =true;
  likeIcon.innerHTML =`<i class="fas fa-thumbs-up"></i>`
  count.textContent ++;
}else{
  clicked =false;
  likeIcon.innerHTML =`<i class="far fa-thumbs-up"></i>`
  count.textContent --;

}

  });
  
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
