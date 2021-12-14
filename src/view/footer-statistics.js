import { createElement } from '../render.js';

const createFooterStatistics = () => `<section class="footer__statistics">
<p>130 291 movies inside</p>
</section>`;

export default class SiteFooterStatisticsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFooterStatistics();
  }

  removeElement() {
    this.#element = null;
  }
}
