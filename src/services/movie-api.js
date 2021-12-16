import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = { api_key: 'f90c60ae8440c2fbb62ec293c9896619' };

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const fetchTrending = async () => {
  const RES = 'trending/movie/day';
  const { data } = await axios.get(RES);
  return data.results.map(({ id, title }) => ({
    id,
    title,
  }));
};

const fetchSearch = async query => {
  const RES = 'search/movie';
  const params = { query };
  const { data } = await axios.get(RES, { params });
  return data.results.map(({ id, title }) => ({
    id,
    title,
  }));
};

const fetchGenres = async () => {
  const RES = 'genre/movie/list';
  const { data } = await axios.get(RES);
  return data.genres;
};

const fetchMovie = async id => {
  const RES = 'movie/';
  const { data } = await axios.get(RES + id);
  return await normalize(data);
};

const fetchCasts = async id => {
  const LIST_LENGTH = 10;
  const RES = `movie/${id}/credits`;
  const { data } = await axios.get(RES);
  return data.cast.slice(0, LIST_LENGTH).map(actor => ({
    name: actor.name,
    hero: actor.character,
    photo: IMAGE_BASE + actor.profile_path,
  }));
};

const fetchReviews = async id => {
  const LIST_LENGTH = 10;
  const RES = `movie/${id}/reviews`;
  const { data } = await axios.get(RES);
  return data.results
    .slice(0, LIST_LENGTH)
    .map(({ author, content }) => ({ author, content }));
};

const normalize = async ({
  id,
  title,
  release_date,
  vote_average,
  genres,
  poster_path,
  overview,
}) => {
  return {
    id,
    title: `${title} (${new Date(release_date).getFullYear()})`,
    rating: vote_average,
    genre: genres.map(genre => genre.name).join(', '),
    poster: IMAGE_BASE + poster_path,
    overview,
  };
};

export { fetchTrending, fetchMovie, fetchSearch, fetchCasts, fetchReviews };
