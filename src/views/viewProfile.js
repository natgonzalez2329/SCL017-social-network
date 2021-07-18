export const viewProfile = () => {
  const containerProfileTemplate = document.createElement('div');
  containerProfileTemplate.className = 'container__profile-template';
  const profileTemplate = `
    <div class="view__profile">profile</div>`;
  containerProfileTemplate.innerHTML = profileTemplate;
  return containerProfileTemplate;
};
