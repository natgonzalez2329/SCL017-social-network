import { fetchPosts } from '../lib/firebase.js';

// eslint-disable-next-line no-var
var containerViews = document.querySelector('#root');

export const viewFeed = async () => {
  containerViews.innerHTML = '';

  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';

  let containerPostFeed = '';
  const posts = await fetchPosts(firebase);
  if (posts.length > 0) {
    posts.forEach((post) => {
      containerPostFeed += `
      <li class="container_post-feed">
      <h5>${post.data.photo}</h5>
      <p>${post.data.description}</p>
      </li>
      `;
    });
    const feedTemplate = `
    <div>tu nombre: <span id='username'>${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span></div>
    <div class='view__feed'>Feed</div>
    <ul id='posts'>${containerPostFeed}</ul>`;
    containerFeedTemplate.innerHTML = feedTemplate;
  } else {
    containerPostFeed = '<li>Se el primero en publicar</li>';
  }

  return containerFeedTemplate;
};
