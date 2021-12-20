import AbstractView from './abstract-view.js';

const createFooterStatistics = () => `<section class="footer__statistics">
<p>130 291 movies inside</p>
</section>`;

export default class SiteFooterStatisticsView extends AbstractView {

  get template() {
    return createFooterStatistics();
  }

}
