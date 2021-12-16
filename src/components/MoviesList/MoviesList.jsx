import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  return (
    <ul>
      {movies.map(item => (
        <li key={item.id}>
          <Link to={`/movies/${item.id}`}>{item.title}</Link>
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
