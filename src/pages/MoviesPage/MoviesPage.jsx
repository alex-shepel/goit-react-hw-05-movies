import * as api from 'services/movie-api';
import { lazy, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MoviesList from 'components/MoviesList';
import Searchbar from 'components/Searchbar';

const MovieDetailsPage = lazy(() => import('pages/MovieDetailsPage'));

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const { path } = useRouteMatch();

  const handleSubmit = query => {
    api.fetchSearch(query).then(setMovies).catch(console.log);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Searchbar onSubmit={handleSubmit} />
        <MoviesList movies={movies} />
      </Route>
      <Route path={`${path}/:id`}>
        <MovieDetailsPage />
      </Route>
    </Switch>
  );
};

export default MoviesPage;
