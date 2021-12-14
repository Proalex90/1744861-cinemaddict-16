import { createElement } from '../render.js';

const creatFilmsListEmptyTemlate = () => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>
</section>`;

export default class FilmsListEmptyView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return creatFilmsListEmptyTemlate();
  }

  removeElement() {
    this.#element = null;
  }
}