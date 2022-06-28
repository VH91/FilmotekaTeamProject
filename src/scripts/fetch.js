const key = '1e3bd345eb5d29ac0f4521d096bb0e9d';

// приклад імпорту: import { findWordKey } from './scripts/fetch';

//------- Пошук за ключовим словом----

export function findWordKey(word, page = 1) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${word}&page=${page}`
  ).then(respons => respons.json());
}

//------- Пошук по ід карти----
export function findCardId(idCard) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${idCard}?api_key=${key}&language=en-US`
  ).then(respons => respons.json());
}

//------ Популярні фільми---

export function popularFilm(page = 1) {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&page=${page}`
  ).then(respons => respons.json());
}

//------ Пошук трейлера по ід---

export function findTrailer(idCard) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${idCard}/videos?api_key=${key}&language=en-US`
  ).then(respons => respons.json());
}

// ------- Запити  для рендеренга розмітки

//  .title - назва фільма
//  .original_title - оригінальна назва фільма
//  .popularity - популярність
//  .release_date - дата вихода
//  .poster_path  -  картинка на заставку (щоб дістать картинку фільма треба спочатку вести сайт "https://image.tmdb.org/t/p/original/cсилка на картинку")
//  .backdrop_path - фонова картинка
//  .genre_ids - жанри ( тільки по ід запросу жанри можна витянуть прописом, через інші вони ідуть в цифровому значенні, обєкт значень в файлі genre.js  )
//  .overview - опис фільма
