import { initNavigation } from './navigation.js';
import { initArchive } from './archive.js';

initNavigation();
initArchive();

document.querySelectorAll('#current-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
