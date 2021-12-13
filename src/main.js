import { render, RenderPosition } from './render.js';
//import { onCardFilmClick } from './utils.js';
import SiteMenuView from './view/menu.js';
import SiteProfileView from './view/profile.js';
import SiteMenuSortView from './view/menu-sort.js';
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
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooter = document.querySelector('.footer');


render(siteHeaderElement, new SiteProfileView().element, RenderPosition.BEFOREEND); //Элемент профайла

render(siteMainElement, new SiteMenuView().element, RenderPosition.BEFOREEND); //Основное меню
render(siteMainElement, new SiteMenuSortView().element, RenderPosition.BEFOREEND);//Сортировка основного меню

const filmsListComponent = new SiteFilmsView();//Новый экземпляр пустого списка фильмов
render(siteMainElement, filmsListComponent.element, RenderPosition.BEFOREEND);
const siteFilmsContainer = filmsListComponent.element.querySelector('.films-list__container');//Ищем в экземпляре необходимое место вставки карточки фильма

//Films
const ALL_FILMS = 23;
const FILMS_COUNT_PER_STEP = 5;
const films = Array.from({ length: ALL_FILMS }, generateFilmCard);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(siteFilmsContainer, new FilmView(films[i]).element, RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const buttonShowMoreComponent = new ButtonMoreView();
  render(siteFilmsContainer, buttonShowMoreComponent.element, RenderPosition.AFTEREND);
  buttonShowMoreComponent.element.addEventListener(('click'), (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(siteFilmsContainer, new FilmView(film).element, RenderPosition.BEFOREEND));
    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      buttonShowMoreComponent.element.remove();
    }
  });
}

//Extra
render(filmsListComponent.element, new SiteFilmsExtraRatedView().element, RenderPosition.BEFOREEND);
render(filmsListComponent.element, new SiteFilmsExtraCommentedView().element, RenderPosition.BEFOREEND);

const FILMS_EXTRA_COUNT = 2;
const siteFilmsExtra = document.querySelectorAll('.films-list--extra');
const siteFilmsExtraContainerTopRated = siteFilmsExtra[0].querySelector('.films-list__container');
const siteFilmsExtraContainerMostCommented = siteFilmsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(siteFilmsExtraContainerTopRated, new FilmView((films[i])).element, RenderPosition.BEFOREEND);
}
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(siteFilmsExtraContainerMostCommented, new FilmView((films[i])).element, RenderPosition.BEFOREEND);
}

const getChoosenFilmElement = (array) => (evt) => {
  if (evt.target.closest('.film-card__link')) {
    const currentElement = evt.target.closest('.film-card__link').dataset.id;
    const currentObject = array.find((element) => element.id === parseInt(currentElement, 10));
    const currentFilmComponent = new PopupFilmDetailsView(currentObject);
    render(siteFooter, currentFilmComponent.element, RenderPosition.AFTEREND);
    const commentsContainer = currentFilmComponent.element.querySelector('.film-details__comments-list');
    currentObject.comments.forEach((element) => {
      render(commentsContainer, new CommentView(element).element, RenderPosition.BEFOREEND);
    });
    const closeButton = currentFilmComponent.element.querySelector('.film-details__close-btn');
    const parentElement = document.querySelector('body');
    closeButton.addEventListener('click', () => {
      parentElement.removeChild(currentFilmComponent.element);
    });
  }
};

const onCardFilmClick = (array) => document.querySelector('.films').addEventListener('click', getChoosenFilmElement(array));

onCardFilmClick(films);


/*       const commentsContainer = document.querySelector('.film-details__comments-list');
      films[0].comments.forEach((element) => {
      render(commentsContainer, new CommentView(element).element, RenderPosition.BEFOREEND); */
//onCardFilmClick(films)


/* const getChoosenFilm = () => {
  const getChoosenPhoto = (array) => (evt) => {
    if (evt.target.closest('.film-card__link')) {
      const currentElement = evt.target.closest('.film-card__link').dataset.id;
      const currentObject = array.find((element) => element.id === parseInt(currentElement, 10));
 render(siteFooter, new PopupFilmDetailsView(films[0]).element, RenderPosition.AFTEREND);
       const commentsContainer = document.querySelector('.film-details__comments-list');
       films[0].comments.forEach((element) => {
       render(commentsContainer, new CommentView(element).element, RenderPosition.BEFOREEND);
    });
  }
};

}
const onCardFilmClick = (array) => picturesSection.addEventListener('click', getChoosenPhoto(array));



 */
/* render(siteFooter, new PopupFilmDetailsView(films[0]).element, RenderPosition.AFTEREND);
const commentsContainer = document.querySelector('.film-details__comments-list');
films[0].comments.forEach((element) => {
  render(commentsContainer, new CommentView(element).element, RenderPosition.BEFOREEND);
}); */


/* const closeButton = document.querySelector('.film-details__close-btn');
const filmDetails = document.querySelector('.film-details');
closeButton.addEventListener('click', () => {
  filmDetails.classList.toggle('visually-hidden');
});//временный функционал
 */
render(siteMainElement, new SiteStatsView().element, RenderPosition.BEFOREEND);
const statisticElement = document.querySelector('.statistic');
statisticElement.classList.add('visually-hidden'); //временный функционал


render(siteFooter, new SiteFooterStatisticsView().element, RenderPosition.BEFOREEND);


