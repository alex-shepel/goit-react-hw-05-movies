import * as api from 'services/movie-api';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

const Cast = lazy(() =>
  import('components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('components/Reviews' /* webpackChunkName: "Reviews" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();

  useEffect(() => {
    api
      .fetchMovie(id)
      .then(setMovie)
      .catch(err => {
        history.replace('/movies');
        console.log(err);
      });
  }, []);

  const handleBack = () => {
    history.push(location.state.from);
  };

  const showCasts = () =>
    api.fetchCasts(movie.id).then(setCasts).catch(console.log);

  const showReviews = () =>
    api.fetchReviews(movie.id).then(setReviews).catch(console.log);

  const toCasts = {
    pathname: `${match.url}/casts`,
    state: { from: location.state ? location.state.from : '/' },
  };

  const toReviews = {
    pathname: `${match.url}/reviews`,
    state: { from: location.state ? location.state.from : '/' },
  };

  const getReviewsMarkup = () => {
    if (!reviews.length) {
      return <p>There are no reviews yet...</p>;
    }
    return <Reviews reviews={reviews} />;
  };

  const getCastsMarkup = () => {
    if (!casts.length) {
      return <p>There are no cast information yet...</p>;
    }
    return <Cast actors={casts} />;
  };

  return (
    movie && (
      <section className={s.page}>
        {location.state && (
          <button type={'button'} onClick={handleBack}>
            Back
          </button>
        )}
        <div className={s.headWrapper}>
          <img className={s.poster} src={movie.poster} alt={'poster'} />
          <div>
            <h2>{movie.title}</h2>
            <p>Rating: {movie.rating} / 10</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genre</h4>
            <p>{movie.genre}</p>
            <div className={s.linksWrapper}>
              <Link to={toCasts} onClick={showCasts}>
                Casts
              </Link>
              <Link to={toReviews} onClick={showReviews}>
                Reviews
              </Link>
            </div>
          </div>
        </div>

        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path={`${match.url}/casts`}>
              {getCastsMarkup()}
            </Route>
            <Route exact path={`${match.url}/reviews`}>
              {getReviewsMarkup()}
            </Route>
          </Suspense>
          <Redirect to={match.url} />
        </Switch>
      </section>
    )
  );
};

export default MovieDetailsPage;
