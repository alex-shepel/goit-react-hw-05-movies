import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const Reviews = ({ reviews }) => {
  return (
    <ul>
      {reviews.map(review => (
        <li key={nanoid()}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Reviews;
