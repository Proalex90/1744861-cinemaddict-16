import AbstractView from './abstract-view.js';

const createFilmsTemlate = () => `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">

      </div>
    </section>
  </section>`;

export default class SiteFilmsView extends AbstractView {

  get template() {
    return createFilmsTemlate();
  }

  setClickFilmHandler = (callback) => {
    this._callback.detailsClick = callback;
    this.element.addEventListener('click', this.#filmClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.detailsClick();

  }
}
