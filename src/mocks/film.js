import { comment } from './comment.js';
const DISCRIPTION_TEXT = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const COUNT_RANDOM_TEXT = 5;
const POSTERS = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const TITLES = ['Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'Santa Claus Conquers the Martians', 'Popeye the Sailor Meets Sindbad the Sailor', 'Made for Each Other', 'The Great Flamarion'];
//Функция случайного числа
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция полчения случайного массива данных
const getRandomArray = (array) => {
  const countStrings = getRandomInteger(1, COUNT_RANDOM_TEXT);
  const numbers = [];
  while (numbers.length < countStrings) {
    const ranNum = getRandomInteger(0, array.length - 1);
    if (!numbers.length || numbers.every((num) => num !== ranNum)) {
      numbers.push(ranNum);
    }
  }
  return numbers.map((num) => array[num]);
};


export const generateFilmCard = () => ({
  id: getRandomInteger(0, 5000),
  comments: comment(),
  filmInfo: {
    title: TITLES[getRandomInteger(0, TITLES.length - 1)],
    originTitle: TITLES[getRandomInteger(0, TITLES.length - 1)],
    reating: 8.3,
    poster: `./images/posters/${POSTERS[getRandomInteger(0, POSTERS.length - 1)]}`,
    ageRating: getRandomInteger(6, 18),
    director: ['Anthony Mann'],
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'].join(', ')
  },
  actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
  release: {
    data: getRandomInteger(1929, 1970),
    releaseCountry: 'Finland'
  },
  runtime: getRandomInteger(20, 175),
  genre: ['Musical'],
  description: getRandomArray(DISCRIPTION_TEXT).join(' '),
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1))
  },
});

