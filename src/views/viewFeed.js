import { fetchPosts } from '../lib/firebase.js';

// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewFeed = async () => {
  containerViews.innerHTML = '';

  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';

  // ---------------Inicio menú--------------------------------//
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
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
    </div> `;
  // -------------------------------------------------------------------------------------//

  containerFeedTemplate.innerHTML = menuContainer;

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
        <h5>${post.data.photo}</h5>
        <p>${post.data.description}</p>
        <div class='container-btn-like' pid='${post.id}'>
          <button class='like__btn' id='like'>
            <span id='iconLike${i}'><i id='iconUp${post.data.likes.includes(firebase.auth().currentUser.uid) ? '2' + i : i}' class='${post.data.likes.includes(firebase.auth().currentUser.uid) ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}'></i></span>
            <span id='countLike${i}'>${post.data.likes.length > 0 ? post.data.likes.length : ''}</span> Me Gusta
          </button> 
          <button class='recommend__btn' id='recommend'><i class="bi bi-check-circle"></i>
          <span id='iconRecommend${i}'><i id='iconCheck${post.data.recommend.includes(firebase.auth().currentUser.uid) ? '2' + i : i}' class='${post.data.recommend.includes(firebase.auth().currentUser.uid) ? 'fas fa-check-circle' : 'far fa-check-circle'}'></i></span>
          <span id='countRecommend${i}'>${post.data.recommend.length > 0 ? post.data.recommend.length : ''}</span> Recomendado
          </button>
        </div>
      </li>`;
    });

    const feedPostTemplate = `<ul id='posts'>${containerPostFeed}</ul>`;
    containerFeedTemplate.innerHTML += feedPostTemplate;
    // likes
    const likeBtn = containerFeedTemplate.querySelectorAll('#like');

   likeBtn.forEach(async (btn, i) => {
      const post = await fetchPosts(firebase);
      const postLikes = post[i].data.likes;
      console.log(postLikes);
      const idCurrentUser = firebase.auth().currentUser.uid;
      const likeIcon = containerFeedTemplate.querySelector(`#iconLike${i}`);
      const countLike = containerFeedTemplate.querySelector(`#countLike${i}`);
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
          countLike.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
        } else {
          clicked = false;
          likeIcon.innerHTML = `<i id='iconUp${i}' class="far fa-thumbs-up"></i>`;
          const index = postLikes.indexOf(idCurrentUser);
          postLikes.splice(index, 1);
          // const newPostLike = postLikes.filter((like) => like !== idCurrentUser);
          dataRef.update({ likes: postLikes });
          countLike.innerHTML = `${postLikes.length > 0 ? postLikes.length : ''}`;
        }
      });
    });

       // recommend
       const recommendBtn = containerFeedTemplate.querySelectorAll('#recommend');

       recommendBtn.forEach(async (btn, i) => {
          const post = await fetchPosts(firebase);
          const postRecommend = post[i].data.recommend;
          console.log(postRecommend);
          const idCurrentUser = firebase.auth().currentUser.uid;
          const recommendIcon = containerFeedTemplate.querySelector(`#iconRecommend${i}`);
          const countRecommend = containerFeedTemplate.querySelector(`#countRecommend${i}`);
          let clicked = false;
          btn.addEventListener('click', async (e) => {
            const id = e.target.parentElement.getAttribute('pid');
            console.log(id);
            const dataRef = await firebase.firestore().collection('pyme-posts').doc(id);
            if (!postRecommend.includes(idCurrentUser) && !clicked) {
              clicked = true;
              recommendIcon.innerHTML = `<i id='iconCheck2${i}' class="fas fa-check-circle"></i>`;
              postRecommend.push(idCurrentUser);
              dataRef.update({ recommend: postRecommend });
              countRecommend.innerHTML = `${postRecommend.length > 0 ? postRecommend.length : ''}`;
            } else {
              clicked = false;
              recommendIcon.innerHTML = `<i id='iconCheck${i}' class="far fa-check-circle"></i>`;
              const index = postRecommend.indexOf(idCurrentUser);
              postRecommend.splice(index, 1);
              dataRef.update({ recommend: postRecommend });
              countRecommend.innerHTML = `${postRecommend.length > 0 ? postRecommend.length : ''}`;
            }
          });
        });
  } else {
    containerPostFeed = '<li>Se el primero en publicar</li>';
  }

  return containerFeedTemplate;
};
