import dayjs from 'dayjs';

//Получаем корректное время
export const getDurationInFormat = (runtime) => {
  const time = dayjs('0').minute(runtime);
  if (runtime > 59) {
    return time.format('H[h] m[m]');
  } else {
    return time.format('m[m]');
  }
};


export const getClassNameUserControleBar = (film, activeClassName) => {
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const addClassToAddToWatchlist = watchlist ? activeClassName : '';
  const addClassToMarkAsWatched = alreadyWatched ? activeClassName : '';
  const addClassToFavorite = favorite ? activeClassName : '';
  const classArray = [addClassToAddToWatchlist, addClassToMarkAsWatched, addClassToFavorite];
  return classArray;
};

