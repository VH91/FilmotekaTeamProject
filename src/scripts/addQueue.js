import { load, save, remove } from '../scripts/localStorageApi.js';
import { renderWatchedMovie } from './renderFilmCard';
import { resetGallery } from '../scripts/resetGallery.js';
import { findCardId } from './fetch';

const addQueue = () => {
  // console.log('1');
    const btn = document.querySelector('.modal__container .btn__queue');

  btn.addEventListener('click', function () {
    btn.classList.add('active');
    btn.textContent = "Added to queue";
    const id = btn.getAttribute('data-id');

    if (load('queue') === undefined) {
      let movieListId = [id];
      save('queue', movieListId);
    } else {
      const movieListId = load('queue');

      if (movieListId.includes(id) === false) {
        movieListId.push(id);
        save('queue',movieListId);
      }
    }
    // console.log(window.localStorage.getItem('queue'));
  });
};
export default addQueue;