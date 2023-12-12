import { Spin, Alert, Space } from 'antd';
import { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movie-list.css';
// import MoviesService from '../../services/movie-service';

export default class MovieList extends Component {
  static defaultProps = {
    list: [],
  };

  static propTypes = {
    list: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    idGuestSession: PropTypes.string.isRequired,
  };

  // movieService = new MoviesService();

  state = {
    idGuestSession: '',
  };

  componentDidMount() {
    this.setState({ idGuestSession: this.props.idGuestSession });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rating !== prevState.rating) {
      console.log(this.state.rating);
    }
    if (this.props.idGuestSession !== prevProps.idGuestSession) {
      this.setState({ idGuestSession: this.props.idGuestSession });
      console.log(this.state.idGuestSession);
    }
  }

  render() {
    const { list, loading, error } = this.props;
    const { idGuestSession } = this.state;
    const elements = list.map((movie) => {
      const { id, rating, ...movieProps } = movie;
      return (
        <li key={id}>
          <MovieCard
            {...movieProps}
            movieId={id}
            idGuestSession={idGuestSession}
            updateRating={this.updateRating}
            rating={rating}
          />
        </li>
      );
    });
    const alert = (
      <Space direction="vertical" style={{ width: '50%', textAlign: 'left' }}>
        <Alert message="There are no movies that matched your query" type="info" showIcon />
      </Space>
    );
    const hasData = !(loading || error);
    const noData = !(list.length || loading);
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
    const noResult = noData ? alert : null;
    const spinner = loading ? <Spin /> : null;
    const content = hasData ? <ul className="movie-list">{elements}</ul> : null;
    return (
      <div className="content">
        {errorAlert}
        {spinner}
        {noResult}
        {content}
      </div>
    );
  }
}
