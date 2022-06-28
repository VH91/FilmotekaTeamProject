import { refs } from './refs.js';
import { resetGallery } from './resetGallery.js';
import { getPopularMovieList } from './renderFilmCard.js';
import { getWatchedMovie } from './addWatched.js';
import { load, save, remove } from '../scripts/localStorageApi.js';
import { deletePagination } from './pagination.js';
import forEmpryPage from './forEmptyPage.js';
import {
  createListFilms,
  onHideSearchInfo,
  onClearSearchInput,
} from './searsh.js';

refs.headerNav.addEventListener('click', onChangePage);
refs.logo.addEventListener('click', onLogoClick);
refs.libraryBtn.addEventListener('click', onLiblaryClick);
refs.watchedBtn.addEventListener('click', onWatchedClick);
refs.queueBtn.addEventListener('click', onQueueClick);
refs.clearList.addEventListener("click", onClearList);

function onChangePage(e) {
  e.preventDefault();
  onHideSearchInfo();
  const currentElementClick = e.target;
  if (currentElementClick.nodeName !== 'A') {
    return;
  }

  if (currentElementClick.hasAttribute('data-libraryPage')) {
    showLibraryPage(currentElementClick);
    setActiveLink(currentElementClick);
  }
  if (currentElementClick.hasAttribute('data-homePage')) {
    showHomePage(currentElementClick);
    setActiveLink(currentElementClick);
  }
}

function onLogoClick(e) {
  e.preventDefault();
  const currentElementClick = e.target;
  onClearSearchInput();
  onHideSearchInfo();
  showHomePage(currentElementClick);
  deleteActiveLink();
  refs.homePage.classList.add('header-nav__link--active');
}

function showLibraryPage(targetElement) {
  if (!targetElement.classList.contains('header-nav__link--active')) {
    resetGallery();
    refs.changedElementsToOpenLibrary.forEach(el => {
      return el.classList.add('js-open-library');
    });
   
  }
}

function showHomePage(targetElement) {
  const currentPage = load("numberOfPage");
  if (!targetElement.classList.contains('header-nav__link--active')) {
    refs.paginationList.style.display = "flex";
    refs.paginationListLibrary.style.display = "none";
    resetGallery();
    refs.changedElementsToOpenLibrary.forEach(el => {
      return el.classList.remove('js-open-library');
    });
    if (refs.searchInput.value !== '') {
      return createListFilms(refs.searchInput.value, currentPage);
    }
    refs.mainSection.classList.remove('openLibrary');
    getPopularMovieList();
  }
}

function setActiveLink(targetElement) {
  deleteActiveLink();
  targetElement.classList.add('header-nav__link--active');
}

function deleteActiveLink() {
  return refs.headerNavLinks.forEach(link => {
    if (link.classList.contains('header-nav__link--active')) {
      link.classList.remove('header-nav__link--active');
    }
  });
}

function onLiblaryClick() {
  deletePagination();
  if (refs.queueBtn.classList.contains('active')) {
    getWatchedMovie(1, 'queue');
    forEmpryPage("queue");
    return;
  }
  getWatchedMovie(1, "watched");
  forEmpryPage("watched");
}

function onWatchedClick() {
  refs.clearList.innerText = "CLEAR WATCHED";
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
  deletePagination();
  getWatchedMovie(1, "watched");
  forEmpryPage("watched");
}

function onQueueClick() {
  refs.clearList.innerText = "CLEAR QUEUE";
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');
  deletePagination();
  getWatchedMovie(1, "queue");
  forEmpryPage("queue");
}

function onClearList() {
  deletePagination();
  if (refs.watchedBtn.classList.contains('active')) {
    localStorage.removeItem('watched');
    resetGallery();
    // getWatchedMovie(1, "watched");
    forEmpryPage("watched");
  }
  else if (refs.queueBtn.classList.contains('active')) {
    localStorage.removeItem('queue');
    resetGallery();
    // getWatchedMovie('queue');
    forEmpryPage("queue");
  }
  else {
    console.log('Choose your list in Library ');
  }
}

