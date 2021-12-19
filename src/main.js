import { render, RenderPosition } from './render.js';
import { FilmViewParam } from './consts.js';
import SiteMenuView from './view/menu.js';
import SiteProfileView from './view/profile.js';
import SiteMenuSortView from './view/menu-sort.js';
import FilmsListEmptyView from './view/films-list-empty.js';
import SiteFilmsView from './view/films.js';
import ButtonMoreView from './view/show-more.js';
import FilmView from './view/card-film.js';
import SiteFilmsExtraRatedView from './view/films-extra-rated.js';
import SiteFilmsExtraCommentedView from './view/films-extra-commented.js';
import SiteStatsView from './view/stats.js';
import PopupFilmDetailsView from './view/popup.js';
import { generateFilmCard } from './mocks/film.js';
import CommentView from './view/comment.js';
import SiteFooterStatisticsView from './view/footer-statistics.js';
const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteFooter = siteBodyElement.querySelector('.footer');


render(siteHeaderElement, new SiteProfileView().element, RenderPosition.BEFOREEND); //Элемент профайла
render(siteMainElement, new SiteMenuView().element, RenderPosition.BEFOREEND); //Основное меню
render(siteMainElement, new SiteMenuSortView().element, RenderPosition.BEFOREEND);//Сортировка основного меню
const filmsListComponent = new SiteFilmsView();//Новый экземпляр пустого списка фильмов
render(siteMainElement, filmsListComponent.element, RenderPosition.BEFOREEND);
const siteFilmsContainer = filmsListComponent.element.querySelector('.films-list__container');//Ищем в экземпляре необходимое место вставки карточки фильма

//Films
const films = Array.from({ length: FilmViewParam.ALL }, generateFilmCard);
if (films.length === 0) {
  render(siteFilmsContainer, new FilmsListEmptyView().element, RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(films.length, FilmViewParam.COUNT_PER_STEP); i++) {
    render(siteFilmsContainer, new FilmView(films[i]).element, RenderPosition.BEFOREEND);
  }
  //Extra
  render(filmsListComponent.element, new SiteFilmsExtraRatedView().element, RenderPosition.BEFOREEND);
  render(filmsListComponent.element, new SiteFilmsExtraCommentedView().element, RenderPosition.BEFOREEND);

  const siteFilmsExtra = document.querySelectorAll('.films-list--extra');
  const siteFilmsExtraContainerTopRated = siteFilmsExtra[0].querySelector('.films-list__container');
  const siteFilmsExtraContainerMostCommented = siteFilmsExtra[1].querySelector('.films-list__container');

  for (let i = 0; i < FilmViewParam.COUNT_EXTRA; i++) {
    render(siteFilmsExtraContainerTopRated, new FilmView((films[i])).element, RenderPosition.BEFOREEND);
  }
  for (let i = 0; i < FilmViewParam.COUNT_EXTRA; i++) {
    render(siteFilmsExtraContainerMostCommented, new FilmView((films[i])).element, RenderPosition.BEFOREEND);
  }
  if (films.length > FilmViewParam.COUNT_PER_STEP) {
    let renderedFilmsCount = FilmViewParam.COUNT_PER_STEP;
    const buttonShowMoreComponent = new ButtonMoreView();
    render(siteFilmsContainer, buttonShowMoreComponent.element, RenderPosition.AFTEREND);
    buttonShowMoreComponent.element.addEventListener(('click'), (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FilmViewParam.COUNT_PER_STEP)
        .forEach((film) => render(siteFilmsContainer, new FilmView(film).element, RenderPosition.BEFOREEND));
      renderedFilmsCount += FilmViewParam.COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        buttonShowMoreComponent.element.remove();
      }
    });
  }
}


const getChoosenFilmElement = (array) => (evt) => {
  if (evt.target.closest('.film-card__link')) {
    const currentElement = evt.target.closest('.film-card__link').dataset.id;
    const currentObject = array.find((element) => element.id === parseInt(currentElement, 10));
    const currentFilmComponent = new PopupFilmDetailsView(currentObject);
    siteBodyElement.classList.add('hide-overflow');
    const secondPopup = document.querySelector('.film-details');
    const parentBodyElement = document.querySelector('body');
    const removeComponent = (parent, component) => {
      parent.removeChild(component.element);
      parent.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evtEsc) => {
      if (evtEsc.key === 'Escape' || evtEsc.key === 'Esc') {
        evt.preventDefault();
        removeComponent(parentBodyElement, currentFilmComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);

    if (secondPopup) {    //Проверка на открытие нескольких Popups
      secondPopup.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
    render(siteFooter, currentFilmComponent.element, RenderPosition.AFTEREND);
    const commentsContainer = currentFilmComponent.element.querySelector('.film-details__comments-list');
    currentObject.comments.forEach((element) => {
      render(commentsContainer, new CommentView(element).element, RenderPosition.BEFOREEND);
    });


    currentFilmComponent.setClickCloseButtonHandler(() => {     //вешаем обработчик клика
      removeComponent(parentBodyElement, currentFilmComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    });


  }
};

//document.querySelector('.films').addEventListener('click', getChoosenFilmElement(films));
filmsListComponent.setClickFilmHandler(() => {
  getChoosenFilmElement(films);
});

render(siteMainElement, new SiteStatsView().element, RenderPosition.BEFOREEND);
const statisticElement = document.querySelector('.statistic');
statisticElement.classList.add('visually-hidden'); //временный функционал


render(siteFooter, new SiteFooterStatisticsView().element, RenderPosition.BEFOREEND);
