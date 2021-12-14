import { createElement } from '../render.js';

const creatFooterStatistics = () => `<section class="footer__statistics">
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
    return creatFooterStatistics();
  }

  removeElement() {
    this.#element = null;
  }
}
