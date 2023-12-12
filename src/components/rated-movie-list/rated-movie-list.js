import { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import MovieList from '../movie-list';
import MoviesService from '../../services/movie-service';

export default class RatedMovieList extends Component {
  static propTypes = {
    idGuestSession: PropTypes.string.isRequired,
  };

  movieService = new MoviesService();

  state = {
    movies: [],
    page: 1,
    totalPages: 0,
    idGuestSession: this.props.idGuestSession,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateRatedMovieList();
    this.updateTotalPages();
    console.log('Rated mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalPages !== prevState.totalPages) {
      this.updateRatedMovieList();
    }
    console.log('Rated updated');
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies, loading: false });
  };

  onChangePage = (page) => this.setState({ page });

  updateTotalPages() {
    const { idGuestSession } = this.state;
    this.movieService.getRatedTotalPages(idGuestSession).then((pages) => {
      this.setState({ totalPages: pages });
    });
  }

  updateRatedMovieList() {
    const { idGuestSession, page } = this.state;
    console.log(idGuestSession);
    if (!idGuestSession) {
      return;
    }
    this.movieService.getRatedMovieList(idGuestSession, page).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movies, page, totalPages, loading, error, idGuestSession } = this.state;
    return (
      <>
        <MovieList list={movies} loading={loading} error={error} idGuestSession={idGuestSession} />
        <Pagination
          current={page}
          total={totalPages}
          showSizeChanger={false}
          pageSize={20}
          hideOnSinglePage
          style={{ textAlign: 'center' }}
          onChange={this.onChangePage}
        />
      </>
    );
  }
}
