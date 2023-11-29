// import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movie-list.css';

// eslint-disable-next-line react/prop-types
function MovieList({ list }) {
  // eslint-disable-next-line react/prop-types
  const elements = list.map((movie) => {
    const { id, ...movieProps } = movie;
    return (
      <li key={id}>
        <MovieCard {...movieProps} />
      </li>
    );
  });
  return <ul className="movie-list">{elements}</ul>;
}
export default MovieList;
