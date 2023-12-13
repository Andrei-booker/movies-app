import { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import MovieList from '../movie-list';
import MoviesService from '../../services/movie-service';
import MovieSearchForm from '../movie-search-form';

export default class SearchMovieList extends Component {
  static propTypes = {
    idGuestSession: PropTypes.string.isRequired,
  };

  movieService = new MoviesService();

  state = {
    movies: [],
    page: 1,
    totalPages: 0,
    title: '',
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateMovieList();
    this.updateTotalPages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title !== prevState.title) {
      this.updateMovieList();
      this.updateTotalPages();
    }
    if (this.state.page !== prevState.page) {
      this.updateMovieList();
    }
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies, loading: false });
  };

  updateTitle = (name) => {
    if (name) {
      this.setState({ title: name });
    }
  };

  onChangePage = (page) => this.setState({ page });

  updateTotalPages() {
    const { title } = this.state;
    this.movieService.getTotalPages(title).then((pages) => {
      this.setState({ totalPages: pages });
    });
  }

  updateMovieList() {
    const { title, page } = this.state;
    if (!title) {
      return;
    }
    this.setState({ loading: true });
    this.movieService.getMovieList(title, page).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movies, page, totalPages, loading, error } = this.state;
    const { idGuestSession } = this.props;
    const display = loading ? 'none' : 'block';
    return (
      <>
        <MovieSearchForm updateTitle={this.updateTitle} />
        <MovieList list={movies} loading={loading} error={error} idGuestSession={idGuestSession} />
        <Pagination
          current={page}
          total={totalPages}
          showSizeChanger={false}
          pageSize={20}
          hideOnSinglePage
          style={{ textAlign: 'center', display }}
          onChange={this.onChangePage}
        />
      </>
    );
  }
}
