
export const footerComponent = () => {
 const containerFooter = document.createElement('div');
 containerFooter.className = 'containerFooter';
 const footerTemplate = `
      <p class="form__p">Punto Pyme &copy; 2021</p>
     `;

 containerFooter.innerHTML = footerTemplate;
 return containerFooter;
}