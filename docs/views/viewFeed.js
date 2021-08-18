/* eslint-disable prefer-template */
import { topMenuComponent, mobileMenuComponent } from './components/navbar.js';
import { viewPost } from './viewPost.js';
import { fetchPosts, firebaseLogout, firebaseGetUserId } from '../lib/firebase.js';

const containerViews = document.querySelector('#root');

export const viewFeed = async () => {
  containerViews.innerHTML = '';

  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';
  containerFeedTemplate.appendChild(topMenuComponent());
  const feedTemplate = `
    <div class='view__feed'>
    <img src='images/UserImage.svg' class='image__user-feed' id='image__user-feed'/>
    <div><span id='username-feed'>${window.localStorage.getItem('puntopyme-name')}</span></div>
    </div>`;
  containerFeedTemplate.innerHTML += feedTemplate;

  let containerPostFeed = '';
  const posts = await fetchPosts(firebase);
  if (posts.length > 0) {
    posts.forEach((post, i) => {
      containerPostFeed += `
      <li class='container_post-feed'>
        <div class="user__post">
          <div class='user__post-info'>
            <img src='images/UserImage.svg' class='image__user-post' id='image__user-postFeed'/>
            <div class="user-info">
              <span class='username-post'>${post.data.user.name}</span><br>
              <small>Fecha</small>
            </div>
          </div>
        </div>
        <div class='container__image'>
          <img src='${post.data.imageURL}' class='image-post' id='image-post'/>
        </div>
        <div class='container-btn-like' pid='${post.id}'>
        <button class='like__btn' id='like'>
          <span id='iconLike${i}'><i id='iconUp${post.data.likes.includes(firebase.auth().currentUser.uid) ? '2' + i : i}' class='${post.data.likes.includes(firebase.auth().currentUser.uid) ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}'></i></span>
          <span id='countLike${i}'>${post.data.likes.length > 0 ? post.data.likes.length : ''}</span> Me Gusta </button> 
          <button class='recommend__btn' id='recommend'>
        <span id='iconRecommend${i}'><i id='iconCheck${post.data.recommend.includes(firebase.auth().currentUser.uid) ? '2' + i : i}' class='${post.data.recommend.includes(firebase.auth().currentUser.uid) ? 'fas fa-check-circle' : 'far fa-check-circle'}'></i></span>
        <span id='countRecommend${i}'>${post.data.recommend.length > 0 ? post.data.recommend.length : ''}</span> Recomendado </button>
        </div>
        <div><span class="area-post"><strong>${post.data.area}</strong></span></div>
        <div class="description-post">
          <span class='username-post'>${post.data.user.name}</span>
            <p class="text-post">${post.data.description}</p>
        </div>
      </li>`;
    });

    const feedPostTemplate = `<ul id='posts__feed'class="container__posts-feed">${containerPostFeed}</ul>`;
    containerFeedTemplate.innerHTML += feedPostTemplate;
    // likes
    const likeBtn = containerFeedTemplate.querySelectorAll('#like');
    likeBtn.forEach(async (btn, i) => {
      const idCurrentUser = firebaseGetUserId();
      const likeIcon = containerFeedTemplate.querySelector(`#iconLike${i}`);
      const countLike = containerFeedTemplate.querySelector(`#countLike${i}`);
      let clicked = false;
      btn.addEventListener('click', async (e) => {
        const id = e.target.parentElement.getAttribute('pid');
        const post = await firebase.firestore().collection('pyme-posts').doc(id);
        const dataPost = await post.get();
        const postLikes = await dataPost.data().likes;
        if (!postLikes.includes(idCurrentUser) && !clicked) {
          clicked = true;
          likeIcon.innerHTML = `<i id='iconUp2${i}' class="fas fa-thumbs-up"></i>`;
          postLikes.push(idCurrentUser);
          post.update({ likes: postLikes });
          countLike.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
        } else {
          clicked = false;
          likeIcon.innerHTML = `<i id='iconUp${i}' class="far fa-thumbs-up"></i>`;
          const index = postLikes.indexOf(idCurrentUser);
          postLikes.splice(index, 1);
          post.update({ likes: postLikes });
          countLike.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
        }
      });
    });

    // recommend
    const recommendBtn = containerFeedTemplate.querySelectorAll('#recommend');
    recommendBtn.forEach(async (btn, i) => {
      const idCurrentUser = firebaseGetUserId();
      const recommendIcon = containerFeedTemplate.querySelector(`#iconRecommend${i}`);
      const countRecommend = containerFeedTemplate.querySelector(`#countRecommend${i}`);
      let clicked = false;
      btn.addEventListener('click', async (e) => {
        const id = e.target.parentElement.getAttribute('pid');
        const post = await firebase.firestore().collection('pyme-posts').doc(id);
        const dataPost = await post.get();
        const postRecommend = await dataPost.data().recommend;
        if (!postRecommend.includes(idCurrentUser) && !clicked) {
          clicked = true;
          recommendIcon.innerHTML = `<i id='iconCheck2${i}' class="fas fa-check-circle"></i>`;
          postRecommend.push(idCurrentUser);
          post.update({ recommend: postRecommend });
          countRecommend.innerHTML = `${postRecommend.length > 0 ? postRecommend.length : ''}`;
        } else {
          clicked = false;
          recommendIcon.innerHTML = `<i id='iconCheck${i}' class="far fa-check-circle"></i>`;
          const index = postRecommend.indexOf(idCurrentUser);
          postRecommend.splice(index, 1);
          post.update({ recommend: postRecommend });
          countRecommend.innerHTML = `${postRecommend.length > 0 ? postRecommend.length : ''}`;
        }
      });
    });
  } else {
    containerFeedTemplate.innerHTML += '<ul id=\'posts\'><li>Se el primero en publicar</li></ul>';
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
    firebaseLogout();
  });
  return containerFeedTemplate;
};
