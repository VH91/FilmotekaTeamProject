import { GENRES } from "../genre";



export function createModalFilmCard({ movie }) {
  const genresArray = getGenresToId(movie.genres);
  const genresText = addGenres(genresArray);
  let isPoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    if (!movie.poster_path) {
      isPoster = `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png`;
   }
   if (movie.title === "") {
      movie.title = "Title was not found";
   }
   if (movie.overview === "") {
      movie.overview = "No description";
   }
  
    return `
         <div class="modal__container">
     <div class="film__image">
    
        <img class="image" src="${isPoster}" alt="${movie.title}" loading="lazy" width="500" />
     </div>
        <div class="film__information">
           
     <h2 class="film__title">${movie.title}</h2>
     <ul>
     <li class="film__item">
                        <p class="film__details ">Vote / Votes</p>
                        <p class="film__info--uper">
                           <span class=" film__rating--orange">${movie.vote_average}</span>
                           <span class="film__rating--divider"> / </span>
                           <span>${movie.vote_count}</span>
                       </p>
                    </li>
        <li class="film__item">
                       <p class="film__details ">Popularity</p>
                       <p class="film__info--uper">${movie.popularity}</p>
                  </li>
                   <li class="film__item">
                         <p class="film__details">Original title</p>
                         <p class="film__details-title">${movie.original_title}</p>
                    </li>
                    <li class="film__item">
                 <p class="film__details">Genre</p>
                 <p class="film__info">
              <span>${genresText}</span>
                                                                           
              </p>
                 </li>
                     </ul>
                     <div>
                      <button class="trailer__btn" data-id="${movie.id}">Trailer

      <svg class="icon-trailer" width="20" height="20">
    <path  d="M6 4l20 12-20 12z"></path>
      </svg>
     </button>
                     <h3 class="film__about__title">About</h3>
                     <p class="film__about__text">${movie.overview}</p>
          
           <div class="film__button__wrapper">

               <button type="button" class="film__button btn__watch" data-id="${
                 movie.id
               }">Add to watched</button>
               <button type="button" class="film__button btn__queue" data-id="${
                 movie.id
               }">Add to queue</button>

             </div>
              <button class="modal-close-btn">
     <svg class="close-modal__icon" width="30" height="30">
 <path d="M8 8L22 22"  stroke-width="2"/>
<path d="M8 22L22 8"  stroke-width="2"/>
</svg>
     </button>
               </div>
             </div>`;
  
}
    
function getGenresToId(idArray) {  
  return idArray.map(GENRES => GENRES.name);  
}

function addGenres(genreArray) {
     if (genreArray.length < 1) {
    return "Genres was no found";
  }
  
  return genreArray.join(", ")
}
