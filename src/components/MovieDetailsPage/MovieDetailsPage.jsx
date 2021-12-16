import PropTypes from 'prop-types';
import * as api from 'services/movie-api';
import { useEffect, useRef, useState } from 'react';
import s from './MovieDetailsPage.module.css';
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { nanoid } from 'nanoid';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [isCastsShown, setCastsShown] = useState(false);
  const [isReviewsShown, setReviewsShown] = useState(false);
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const isMounted = useRef(false);
  // const location = useLocation();
  // console.log('location -->', location);
  const match = useRouteMatch();
  const { id } = useParams();

  useEffect(() => {
    api
      .fetchMovie(id)
      .then(setMovie)
      .then(() => (isMounted.current = true))
      .catch(console.log);
  }, []);

  const showCasts = () =>
    api
      .fetchCasts(movie.id)
      .then(setCasts)
      .catch(console.log)
      .finally(() => {
        setCastsShown(true);
        setReviewsShown(false);
      });

  const showReviews = () =>
    api
      .fetchReviews(movie.id)
      .then(setReviews)
      .catch(console.log)
      .finally(() => {
        setCastsShown(false);
        setReviewsShown(true);
      });

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

  return (
    isMounted && (
      <section className={s.page}>
        <Link to={'/'}>Back</Link>
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
              <Link to={`${match.url}/casts`} onClick={showCasts}>
                Casts
              </Link>
              <Link to={`${match.url}/reviews`} onClick={showReviews}>
                Reviews
              </Link>
            </div>
          </div>
        </div>
        {isCastsShown && getCastsMarkup()}
        {isReviewsShown && getReviewsMarkup()}
      </section>
    )
  );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
