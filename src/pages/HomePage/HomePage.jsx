import * as api from 'services/movie-api';
import { useEffect, useState } from 'react';
import MoviesList from 'components/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.fetchTrending().then(setMovies).catch(console.log);
  }, []);

  return <MoviesList movies={movies} />;
};

export default HomePage;
