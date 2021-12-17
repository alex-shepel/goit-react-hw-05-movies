import * as api from 'services/movie-api';
import { lazy, useState, Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MoviesList from 'components/MoviesList';
import Searchbar from 'components/Searchbar';

const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);

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
      <Suspense fallback={<div>Loading...</div>}>
        <Route path={`${path}/:id`}>
          <MovieDetailsPage />
        </Route>
      </Suspense>
    </Switch>
  );
};

export default MoviesPage;
