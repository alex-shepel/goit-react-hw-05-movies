import PropTypes from 'prop-types';
import s from './Cast.module.css';
import { nanoid } from 'nanoid';

const Cast = ({ actors }) => {
  return (
    <ul className={s.list}>
      {actors.map(actor => (
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

Cast.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      photo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hero: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Cast;
