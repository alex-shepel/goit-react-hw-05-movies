import { NavLink } from 'react-router-dom';
import * as api from '../../services/movie-api';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.fetchTrending().then(setMovies).catch(console.log);
  }, []);

  console.log('movies -->', movies);

  return (
    <ul>
      {movies.map(item => (
        <li key={item.id}>
          {/*<NavLink to="/movies/:id">{item.title}</NavLink>*/}
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
