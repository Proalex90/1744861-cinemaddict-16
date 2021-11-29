export const creatCardFilm = (film) => {
  const { poster, title, reating, releaseYear, duration, genre, description, comments, controlsBar } = film;

  const { addToWatchlist, markAsWatched, favorite } = controlsBar;
  const activeClassName = 'film-card__controls-item--active';
  const addClassToAddToWatchlist = addToWatchlist ? activeClassName : '';
  const addClassToMarkAsWatched = markAsWatched ? activeClassName : '';
  const addClassToFavorite = favorite ? activeClassName : '';
  return `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title"> ${title}</h3>
  <p class="film-card__rating">${reating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseYear}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src= ${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <span class="film-card__comments">${comments}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addClassToAddToWatchlist}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addClassToMarkAsWatched}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${addClassToFavorite}" type="button">Mark as favorite</button>
</div>
</article>`;
};
