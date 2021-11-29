const DISCRIPTION_TEXT = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.']
const COUNT_RANDOM_TEXT = 5;

//Функция случайного числа
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция полчения случайного массива данных
export const getRandomArray = (array) => {
  const numbers = [];
  while (numbers.length < COUNT_RANDOM_TEXT) {
    const ranNum = getRandomInteger(0, array.length - 1);
    if (!numbers.length || numbers.every((num) => num !== ranNum)) {
      numbers.push(ranNum);
    }
  }
  return numbers.map((num) => array[num]);
};


export const generateFilmCard = () => ({
  poster: './images/posters/sagebrush-trail.jpg',
  controlsBar: {
    addToWatchlist: false,
    markAsWatched: false,
    favorite: false
  },
  title: 'The Dance of Life',
  reating: 8.3,
  releaseYear: getRandomInteger(1929, 1970),
  duration: 115,
  genre: 'Musical',
  discription: getRandomArray(DISCRIPTION_TEXT),
  comments: `${getRandomInteger(0, 200)} comments`,
});
