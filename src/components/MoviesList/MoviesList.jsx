import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map(item => (
        <li key={item.id}>
          {/*<Link to={`/movies/${item.id}`}>{item.title}</Link>*/}
          <Link
            to={{
              pathname: `/movies/${item.id}`,
              state: {
                from: location.pathname,
              },
            }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MoviesList;
