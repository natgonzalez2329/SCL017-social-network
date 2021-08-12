import { mobileMenuComponent, topMenuComponent } from './components/navbar.js';

// eslint-disable-next-line no-unused-vars
import { fetchPosts, firebaseLogout } from '../lib/firebase.js';

// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewFeed = async () => {
  containerViews.innerHTML = '';

  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';
  containerFeedTemplate.appendChild(topMenuComponent());

  /* const logOutBtn = containerFeedTemplate.querySelector('.logout-btn');
   logOutBtn.addEventListener('click', () => logOut()); */

  

  const containerPostFeed = '';
  const feedCont = document.createElement('div');
  const posts = await fetchPosts(firebase);
  if (posts.length > 0) {
    posts.forEach((post, i) => {
      const postTemplateFeed = `

      <li class="container_post-feed">
      <div class="container-btn-like">
      <button class="like__btn" id='like${i}'>
        <span id="icon${i}"><i id="iconUp${i}" class="far fa-thumbs-up"></i></span>
        <span id="count${i}">0</span> Me Gusta
        <div class="container-btn-recommended">
        </button> <button id='count2${i}' class="recommended__btn">
      <span id="icon2"${i}><i class="bi bi-check-circle"></i></span>
     Recomendado
    </button>
    </div>
    </div>
      <h5>${post.data.photo}</h5>
      <p>${post.data.description}</p>
     
      </li>
         
    
      `;
      feedCont.innerHTML = postTemplateFeed;
      containerFeedTemplate.appendChild(feedCont);

      const likeBtn = feedCont.querySelectorAll(`#like${i}`);
      const likeIcon = containerFeedTemplate.querySelector(`#icon${i}`);
      const count = containerFeedTemplate.querySelector(`#count${i}`);

      let clicked = false;

      likeBtn.forEach((btn,i) => {
        btn.addEventListener('click', () => {
          if (!clicked) {
            clicked = true;
            likeIcon.innerHTML = `<i id="iconUp2${i}" class="fas fa-thumbs-up"></i>`;
            // eslint-disable-next-line no-plusplus
            count.textContent++;
          } else {
            clicked = false;
            likeIcon.innerHTML = `<i id="iconUp${i}" class="far fa-thumbs-up"></i>`;
            // eslint-disable-next-line no-plusplus
            count.textContent--;
          }
        });
      });
    });
  }
 

 /* }else{
     containerPostFeed = '<li>Se el primero en publicar</li>';
   }*/

   const feedTemplate = `
   <div>tu nombre: <span id='username'>${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span></div>
   <div class='view__feed'>Feed</div>
   <ul id='posts'>${containerPostFeed}</ul>`;
 containerFeedTemplate.innerHTML += feedTemplate;

  containerFeedTemplate.appendChild(mobileMenuComponent());
  return containerFeedTemplate;
};
