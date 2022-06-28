import { popularFilm } from './fetch.js'
import { refs } from './refs.js';
import { GENRES } from './genre.js';
import { getWatchedMovie } from "./addWatched";
import { load, save, remove } from '../scripts/localStorageApi.js';
import { renderPaginationButtons } from './pagination.js';
import forEmpryPage from './forEmptyPage.js';


const cardRefs = {
  delete: null,
}

getPopularMovieList();

export function getPopularMovieList() {
  let currentPage = load("numberOfPagePopular");
  // console.log(currentPage);
  if (!currentPage) {
    currentPage = 1;
  }
  return popularFilm(currentPage).then((filmSet) => {
    const filmArray = filmSet.results;
    renderMovieCardOnMainPage(filmArray)
    renderPaginationButtons(filmSet.total_pages, currentPage);
    // console.log(filmArray);
    // console.log(filmSet);
  }).catch(err => console.log(err));
};

export function renderMovieCardOnMainPage(filmArray) {
  // console.log(filmArray);

  const markup = filmArray.reduce((html, film) => {
    const { original_title, poster_path, genre_ids, id, release_date } = film;
    let title = original_title;
    const genresArray = getGenresToId(genre_ids);
    const genresText = sliceGenres(genresArray);
    const slisedDate = sliceDate(release_date);
   
    let isPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    if (!poster_path) {
      isPoster = `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png`;
    }
    if (original_title === "") {
      title = "Title was not found";
    }
     return html +=
        `<li class="gallery__item">
          <a class="gallery__link" href="" data-id=${id}>
            <img class='gallery__poster' src='${isPoster}' loading="lazy" alt='Poster for film ${original_title}'/>
            <div class="gallery__movie-details">
              <p class="movie-details__movie-name">${title}</p>
              <p class="movie-details__movie-info">${genresText} | ${slisedDate}</p>
            </div>
          </a>
        </li>`
  }, "");
    return refs.movieGallery.insertAdjacentHTML('beforeend', markup);
}

//src="https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"

export function renderWatchedMovie(filmObject) {
  let btnclass = null;
  const markup = filmObject.reduce((html, film) => {
    const { original_title, poster_path, genres, id, release_date, vote_average } = film;
    btnclass = `.js-remove-btn-${id}`;
    let title = original_title;
    const genresNameArray = getGenresToName(genres);
    const genresText = sliceGenres(genresNameArray);
    const slisedDate = sliceDate(release_date);
    let isPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    if (!poster_path) {
      isPoster = `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png`;
    }
    if (original_title === "") {
      title = "Title was not found";
    }
    return html +=
      `<li class="gallery__item">
          <a class="gallery__link" href="" data-id=${id}>
            <img class='gallery__poster' src='${isPoster}' loading="lazy" alt='Poster for film ${original_title}' />
            <div class="gallery__movie-details">
              <p class="movie-details__movie-name">${title}</p>
              <div class="movie-details-wrap">
                <p class="movie-details__movie-info">${genresText} | ${slisedDate}</p>
                <div class="movie-details-rate">${vote_average}</div>
              </div>
            </div>
            
          
          <button type="button" class="remove-btn js-remove-btn-${id}" data-card-id=${id}>
          <svg class="close-icon">
              <path d="M8 8L22 22"  stroke-width="2"/>
              <path d="M8 22L22 8"  stroke-width="2"/>
          </svg>
          </button>
          </a>
        </li>`}, "");
  refs.movieGallery.insertAdjacentHTML('beforeend', markup);
  
  cardRefs.delete = document.querySelector(btnclass);
  cardRefs.delete.addEventListener('click', removeCard);
}

function removeCard(e) {
  let currentPage = load("currentPageInLibrary");
  // console.log(currentPage);
  const state = refs.watchedBtn.classList.contains("active");
  let activeLibrary = 'watched';
  if (!state) {
    activeLibrary = 'queue';
  }
  let localStorageFile = load(activeLibrary);
  
  const id = e.currentTarget.getAttribute(`data-card-id`);
  const resalt = localStorageFile.filter(item => item !== id);
  save(activeLibrary, resalt);
  // let newLocalStorageFile = ;
  let totalPages = Math.ceil(load(activeLibrary).length / 20);

  getWatchedMovie(totalPages, activeLibrary);
  forEmpryPage(activeLibrary);
  
  }

export function getGenresToId(idArray) {
  return idArray.map(genreId => GENRES[genreId]);
}

function getGenresToName(idArray) {  
  return idArray.map(GENRES => GENRES.name);  
}


export function sliceGenres(genreArray) {
  if (genreArray.length < 1) {
    return "Genres was no found";
  }
  if (genreArray.length > 3) {
    const slicedGenredWordArray = genreArray.slice(0, 2);
    slicedGenredWordArray.push('Other');
    return slicedGenredWordArray.join(", ");
  }
  return genreArray.join(", ")
};

function sliceDate(filmDate) {
  if (filmDate === "" || !filmDate) {
    return "Unknown date";
  }
  return filmDate.slice(0, 4);
}
