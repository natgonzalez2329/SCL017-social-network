import { router } from './routers.js';

export const init = () => {
  window.addEventListener('load', () => {
    router(window.location.hash);
  });
  window.addEventListener('hashchange', () => {
    router(window.location.hash);
  });
};
