import { renderTemplate, renderElement, RenderPosition } from './render.js';
import SiteMenuView from './view/menu.js';
import SiteProfileView from './view/profile.js';
import SiteMenuSortView from './view/menu-sort.js';
import SiteFilmsView from './view/films.js';
import ButtonMoreView from './view/show-more.js';
import { creatCardFilm } from './view/card-film.js';
import { createFilmsExtra } from './view/films-extra.js';
import { creatStatsTemplate } from './view/stats.js';
import { creatPopupFilmDetails } from './view/popup.js';
import { generateFilmCard } from './mocks/film.js';
import { creatComment } from './view/comment.js';
import SiteFooterStatisticsView from './view/footer-statistics.js';
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooter = document.querySelector('.footer');


renderElement(siteHeaderElement, new SiteProfileView().element, RenderPosition.BEFOREEND); //Элемент профайла

renderElement(siteMainElement, new SiteMenuView().element, RenderPosition.BEFOREEND); //Основное меню
renderElement(siteMainElement, new SiteMenuSortView().element, RenderPosition.BEFOREEND);//Сортировка основного меню

const filmsListComponent = new SiteFilmsView();//Новый экземпляр пустого списка фильмов
renderElement(siteMainElement, filmsListComponent.element, RenderPosition.BEFOREEND);
const siteFilmsContainer = filmsListComponent.element.querySelector('.films-list__container');//Ищем в экземпляре необходимое место вставки карточки фильма

const ALL_FILMS = 23;
const FILMS_COUNT_PER_STEP = 5;
const films = Array.from({ length: ALL_FILMS }, generateFilmCard);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmsContainer, creatCardFilm(films[i]), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const buttonShowMoreComponent = new ButtonMoreView();
  renderElement(siteFilmsContainer, buttonShowMoreComponent.element, RenderPosition.AFTEREND);
  buttonShowMoreComponent.element.addEventListener(('click'), (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(siteFilmsContainer, creatCardFilm(film), RenderPosition.BEFOREEND));
    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      buttonShowMoreComponent.element.remove();
    }
  });
}

renderTemplate(filmsListComponent.element, createFilmsExtra(), RenderPosition.BEFOREEND);
const FILMS_EXTRA_COUNT = 2;
const siteFilmsExtra = document.querySelectorAll('.films-list--extra');
const siteFilmsExtraContainerTopRated = siteFilmsExtra[0].querySelector('.films-list__container');
const siteFilmsExtraContainerMostCommented = siteFilmsExtra[1].querySelector('.films-list__container');

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  renderTemplate(siteFilmsExtraContainerTopRated, creatCardFilm(films[i]), RenderPosition.BEFOREEND);
}
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  renderTemplate(siteFilmsExtraContainerMostCommented, creatCardFilm(films[i]), RenderPosition.BEFOREEND);
}

renderTemplate(siteFooter, creatPopupFilmDetails(films[0]), RenderPosition.AFTEREND);

const commentsContainer = document.querySelector('.film-details__comments-list');
films[0].comments.forEach((element) => {
  renderTemplate(commentsContainer, creatComment(element), RenderPosition.BEFOREEND);
});


const closeButton = document.querySelector('.film-details__close-btn');
const filmDetails = document.querySelector('.film-details');
closeButton.addEventListener('click', () => {
  filmDetails.classList.toggle('visually-hidden');
});
//временный функционал

renderTemplate(siteMainElement, creatStatsTemplate(), RenderPosition.BEFOREEND);
const statisticElement = document.querySelector('.statistic');
statisticElement.classList.add('visually-hidden'); //временный функционал


renderElement(siteFooter, new SiteFooterStatisticsView(), RenderPosition.BEFOREEND);


