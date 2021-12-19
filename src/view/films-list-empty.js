import AbstractView from './abstract-view.js';

const createFilmsListEmptyTemlate = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>
</section>`;

export default class FilmsListEmptyView extends AbstractView {

  get template() {
    return createFilmsListEmptyTemlate();
  }
}
