import { getDurationInFormat, getClassNameUserControleBar } from '../utils.js';
import { createElement } from '../render.js';

const activeClassName = 'film-card__controls-item--active';
export const createCardFilm = (film) => {
  const { id, comments, filmInfo: { poster, title, reating }, release: { data }, runtime, genre, description } = film;
  const [addClassToAddToWatchlist, addClassToMarkAsWatched, addClassToFavorite] = getClassNameUserControleBar(film, activeClassName);
  return `<article class="film-card">
<a class="film-card__link" data-id='${id}'>
  <h3 class="film-card__title"> ${title}</h3>
  <p class="film-card__rating">${reating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${data}</span>
    <span class="film-card__duration">${getDurationInFormat(runtime)}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src= ${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addClassToAddToWatchlist}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addClassToMarkAsWatched}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${addClassToFavorite}" type="button">Mark as favorite</button>
</div>
</article>`;
};
export default class FilmView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createCardFilm(this.#film);
  }

  removeElement() {
    this.#element = null;
  }
}
