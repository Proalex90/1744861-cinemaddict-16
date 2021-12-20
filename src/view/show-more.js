import AbstractView from './abstract-view';


const createButtonShowMore = () => `<button class="films-list__show-more">Show more
</button>`;

export default class ButtonMoreView extends AbstractView {

  get template() {
    return createButtonShowMore();
  }

}
