export const viewHeaderMenu = () => {
  const containerHeaderMenuTemplate = document.createElement('div');
  containerHeaderMenuTemplate.className = 'container__menu-template';
  const headerMenuTemplate = `
    <div class="container__menu-template">menu provisional
    <ul>
      <il><a href='#/'>forms</a></il>
      <il><a href='#/wall'>wall</a></il>
      <il><a href='#/profile'>profile</a></il>
    </ul>
  </div>`;
  containerHeaderMenuTemplate.innerHTML = headerMenuTemplate;
  return containerHeaderMenuTemplate;
};
