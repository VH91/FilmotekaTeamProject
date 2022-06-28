import { load, save, remove } from '../scripts/localStorageApi.js';
import { renderWatchedMovie } from './renderFilmCard';
import { resetGallery } from '../scripts/resetGallery.js';
import { findCardId } from './fetch';
import { deletePagination } from './pagination.js';
// import { renderWatchedMovie } from './renderFilmCard.js';
import { refs } from './refs.js';
let globalPage = 0;


const addWatched = () => {
  const btn = document.querySelector('.modal__container .btn__watch');

  btn.addEventListener('click', function () {
    btn.classList.add('active');
    btn.textContent = "Added to watched";
    const id = btn.getAttribute('data-id');

    if (load('watched') === undefined) {
      let movieListId = [id];
      save('watched', movieListId);
    } else {
      const movieListId = load('watched');

      if (movieListId.includes(id) === false) {
        movieListId.push(id);
        save('watched', movieListId);
      }
    }
  });
};
export default addWatched;

export function getWatchedMovie(page, pageName) {
  const localStorageFile = load(pageName);
  resetGallery();
  if (localStorageFile) {
    const slicedArrayForPage = sliceLibraryArray(localStorageFile, page);
    
    
    return slicedArrayForPage.map((filmId) => {
      findCardId(filmId).then(filmObj => {
        const filmArr = [filmObj];
        renderWatchedMovie(filmArr);
      })
    })
  }
}


function sliceLibraryArray(array, valueOfPage) {
  let numberValueOfPage = Number(valueOfPage);
  save("currentPageInLibrary", numberValueOfPage);
  let totalPages = Math.ceil(array.length / 20);
  // console.log(totalPages);
  // if (load("currentPageInLibrary") > totalPages) {
    // totalPages -= 1;
  // };
  // console.log(totalPages);
  // console.log(numberValueOfPage);

  let showFrom = ((numberValueOfPage - 1) * 20);
  let showTo = (showFrom + 20);
  refs.paginationList.style.display = "none";
  refs.paginationListLibrary.style.display = "flex";
  renderPaginationButtonsLibrary(totalPages, numberValueOfPage);
  return array.slice(showFrom, showTo);
}

function renderPaginationButtonsLibrary(allPages, page) {
    let paginationMarkup = '';
    let beforePreviousPage = Number(page - 2);
    let previousPage = Number(page - 1);
    let nextPage = Number(page + 1);
    let afterNextPage = page + 2;
  globalPage = page;
  if (allPages <= 1) {
      return deletePagination();
    }

    if (page > 3) {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          
            paginationMarkup += `<li class="pagination-item pagination-pages">1</li>`;
        }
    }

    if (page > 2) {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && page > 4) {
          
            paginationMarkup += `<li class="pagination-item">...</li>`;
        }
      if (beforePreviousPage > 0) {
            console.log('here');
            paginationMarkup += `<li class="pagination-item pagination-pages">${beforePreviousPage}</li>`;
        }
    }

  if (previousPage > 0) {
        paginationMarkup += `<li class="pagination-item pagination-pages">${previousPage}</li>`;
    }

    paginationMarkup += `<li class="pagination-item pagination-pages current-page">${page}</li>`;

  if (page < allPages) {
        paginationMarkup += `<li class="pagination-item pagination-pages">${nextPage}</li>`;
    }

  if (page < allPages - 1) {
      

    if (page < allPages - 2) {
          
            paginationMarkup += `<li class="pagination-item pagination-pages">${afterNextPage}</li>`;
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && page < allPages - 3) {
              paginationMarkup += `<li class="pagination-item">...</li>`;
              
            }
        }
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          paginationMarkup += `<li class="pagination-item pagination-pages">${allPages}</li>`;
          
        }
    }
  refs.paginationListLibrary.innerHTML = paginationMarkup;
  refs.paginationListLibrary.addEventListener('click', onPaginationLibraryItemClick);
}

function onPaginationLibraryItemClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const value = e.target.textContent;
  switch (value) {
    case '...':
      return;
    default:
      globalPage = value;
  }
  window.scroll({
        top: 100,
        left: 100,
        behavior: 'smooth'
  });
  resetGallery();
  const state = refs.watchedBtn.classList.contains("active");
  let activeLibrary = 'watched';
  if (!state) {
    activeLibrary = 'queue';
  }
  getWatchedMovie(value, activeLibrary);
}