import PropTypes from 'prop-types';

import './movie-genre.css';
import { GenresConsumer } from '../genres-context';

function Genre({ genre }) {
  const elements = genre.map((genreId) => (
    <li key={Math.random()} className="genre-list-item">
      <GenresConsumer>
        {(genres) => {
          let genreName = '';
          genres.forEach((item) => {
            if (item.id === genreId) {
              genreName = item.name;
            }
          });
          return <span className="movie-genre">{genreName}</span>;
        }}
      </GenresConsumer>
    </li>
  ));
  return <ul className="genre-list">{elements}</ul>;
}

Genre.propTypes = {
  genre: PropTypes.array.isRequired,
};

export default Genre;
