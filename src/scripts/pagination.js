import {findWordKey, findCardId, popularFilm} from "./fetch.js";
import { renderMovieCardOnMainPage } from "./renderFilmCard.js";
import { resetGallery } from './resetGallery.js';
import { refs } from './refs.js';
import { load, save, remove } from '../scripts/localStorageApi.js';
let globalPage = 0;

export function renderPaginationButtons(allPages, page) {
    let paginationMarkup = '';
    let beforePreviousPage = page - 2;
    let previousPage = page - 1;
    let nextPage = page + 1;
    let afterNextPage = page + 2;
    globalPage = page;
    if (allPages <= 1) {
        return deletePagination();
    }

    if (page > 1) {
        paginationMarkup += `<li class="pagination-item pagination-arrow">&lt;</li>`;
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

    if (page < allPages) {
        paginationMarkup += `<li class="pagination-item pagination-arrow">&gt;</li>`;
    }

    refs.paginationList.innerHTML = paginationMarkup;

    refs.paginationList.addEventListener('click', onPaginationChoice);
}

function onPaginationChoice(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const value = e.target.textContent;
  switch (value) {
    case '<':
      globalPage -= 1;
      break;
    case '>':
      globalPage += 1;
      break;
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
    // console.log(value);
  // console.log(globalPage);

  if (refs.searchInput.value) {
    findWordKey(refs.searchInput.value, globalPage)
      .then(inputValue => {
        // console.log(inputValue);

        renderMovieCardOnMainPage(inputValue.results);
        renderPaginationButtons(inputValue.total_pages, inputValue.page);
        save("numberOfPage", inputValue.page);
      }).catch(err => console.log(err));
  } else {
    popularFilm(globalPage).then((filmSet) => {
      // console.log(filmSet);
      const filmArray = filmSet.results;
      const totalPagesMovie = filmSet.total_pages;
      renderMovieCardOnMainPage(filmArray);
      // console.log(filmArray);
      // console.log(filmSet);
      renderPaginationButtons(totalPagesMovie, filmSet.page);
      save("numberOfPagePopular", filmSet.page);
  }).catch(err => console.log(err));
  }
}

export function deletePagination() {
  refs.paginationList.innerHTML = '';
  refs.paginationListLibrary.innerHTML = "";
}