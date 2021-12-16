import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>

        <input
          onChange={handleChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
