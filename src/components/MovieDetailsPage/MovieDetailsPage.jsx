import * as api from 'services/movie-api';
import { useEffect, useState } from 'react';
import s from './MovieDetailsPage.module.css';
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { nanoid } from 'nanoid';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();

  useEffect(() => {
    api.fetchMovie(id).then(setMovie).catch(console.log);
  }, []);

  const handleBack = () => {
    history.push(location.state.from);
  };

  const showCasts = () =>
    api.fetchCasts(movie.id).then(setCasts).catch(console.log);

  const showReviews = () =>
    api.fetchReviews(movie.id).then(setReviews).catch(console.log);

  const getCastsMarkup = () => {
    if (!casts.length) {
      return <p>There are no cast information yet...</p>;
    }
    return (
      <ul className={s.list}>
        {casts.map(actor => (
          <li className={s.cast} key={nanoid()}>
            <img src={actor.photo} alt={'actor photo'} height={100} />
            <span>
              <b>{actor.name}</b> as {actor.hero}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const getReviewsMarkup = () => {
    if (!reviews.length) {
      return <p>There are no reviews yet...</p>;
    }
    return (
      <ul className={s.list}>
        {reviews.map(review => (
          <li key={nanoid()}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  };

  const toCasts = {
    pathname: `${match.url}/casts`,
    state: { from: location.state ? location.state.from : '/' },
  };

  const toReviews = {
    pathname: `${match.url}/reviews`,
    state: { from: location.state ? location.state.from : '/' },
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
        {location.pathname.includes('casts') && getCastsMarkup()}
        {location.pathname.includes('reviews') && getReviewsMarkup()}
      </section>
    )
  );
};

export default MovieDetailsPage;
