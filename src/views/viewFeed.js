export const viewFeed = () => {
  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';

  const feedTemplate = `
    <div>tu nombre: <span id="username">${firebase.auth().currentUser.displayName || window.localStorage.getItem('puntopyme-name')}</span></div>
    <div class="view__feed">Feed</div>`;

  containerFeedTemplate.innerHTML = feedTemplate;
  return containerFeedTemplate;
};
