import { createMenuTemlate } from './view/menu.js';
import { creatCardFilm } from './view/card-film.js';
import { creatFilmsTemlate } from './view/films.js';
import { creatButtonShowMore } from './view/show-more.js';
import { creatStatsTemplate } from './view/stats.js';
import { creatPopupFilmDetails } from './view/popup.js';
import { createProfileHeaderTemplate } from './view/profile.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooter = document.querySelector('.footer');

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(siteHeaderElement, createProfileHeaderTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMenuTemlate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, creatFilmsTemlate(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsContainer = siteFilmsElement.querySelector('.films-list__container');

for (let i = 0; i < 5; i++) {
  renderTemplate(siteFilmsContainer, creatCardFilm(), RenderPosition.BEFOREEND);
}

renderTemplate(siteFilmsContainer, creatButtonShowMore(), RenderPosition.AFTEREND);

renderTemplate(siteMainElement, creatStatsTemplate(), RenderPosition.BEFOREEND);
const statisticElement = document.querySelector('.statistic');
statisticElement.classList.add('visually-hidden'); //временный функционал


renderTemplate(siteFooter, creatPopupFilmDetails(), RenderPosition.AFTEREND);
const filmDetails = document.querySelector('.film-details');
filmDetails.classList.add('visually-hidden'); //временный функционал

