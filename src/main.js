import { renderTemplate, renderElement } from './render.js';
import { createMenuTemlate } from './view/menu.js';
import { creatCardFilm } from './view/card-film.js';
import { creatFilmsTemlate } from './view/films.js';
import { creatButtonShowMore } from './view/show-more.js';
import { creatStatsTemplate } from './view/stats.js';
import { creatPopupFilmDetails } from './view/popup.js';
import { createProfileHeaderTemplate } from './view/profile.js';
import { generateFilmCard } from './mocks/film.js';
import { creatComment } from './view/comment.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooter = document.querySelector('.footer');


renderTemplate(siteHeaderElement, createProfileHeaderTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMenuTemlate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, creatFilmsTemlate(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsContainer = siteFilmsElement.querySelector('.films-list__container');

const ALL_FILMS = 23;
const FILMS_COUNT_PER_STEP = 5;
const films = Array.from({ length: ALL_FILMS }, generateFilmCard);
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmsContainer, creatCardFilm(films[i]), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  renderTemplate(siteFilmsContainer, creatButtonShowMore(), RenderPosition.AFTEREND);
  const buttonShowMore = document.querySelector('.films-list__show-more');
  buttonShowMore.addEventListener(('click'), (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(siteFilmsContainer, creatCardFilm(film), RenderPosition.BEFOREEND));
    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      buttonShowMore.remove();
    }
  });
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


