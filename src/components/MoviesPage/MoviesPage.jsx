import * as api from 'services/movie-api';
import { useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import MoviesList from 'components/MoviesList';
import MovieDetailsPage from 'components/MovieDetailsPage';
import Searchbar from 'components/Searchbar';

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
