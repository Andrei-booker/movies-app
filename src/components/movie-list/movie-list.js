import { Spin, Alert, Space } from 'antd';

import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movie-list.css';

function MovieList({ list, error, loading }) {
  const elements = list.map((movie) => {
    const { id, ...movieProps } = movie;
    return (
      <li key={id}>
        <MovieCard {...movieProps} />
      </li>
    );
  });
  const hasData = !(loading || error);
  const errorAlert = error ? (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert type="error" message="Oops, something went wrong..." banner />
    </Space>
  ) : null;
  const spinner = loading ? <Spin /> : null;
  const content = hasData ? <ul className="movie-list">{elements}</ul> : null;
  return (
    <div className="content">
      {errorAlert}
      {spinner}
      {content}
    </div>
  );
}

MovieList.defaultProps = {
  list: [],
};

MovieList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};
export default MovieList;
