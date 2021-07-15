export const viewFeed = () => {
  const containerFeedTemplate = document.createElement('div');
  containerFeedTemplate.className = 'container__feed-template';

  const feedTemplate = `
    <div class="container__wall-template">
    <div class="view__wall">wall</div>
    </div>`;

  containerFeedTemplate.innerHTML = feedTemplate;
  return containerFeedTemplate;
};
