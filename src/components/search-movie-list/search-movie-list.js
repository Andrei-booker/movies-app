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
    rating: [],
    movies: [],
    page: 1,
    totalPages: 0,
    title: 'return',
    loading: true,
    error: false,
    idGuestSession: this.props.idGuestSession,
  };

  componentDidMount() {
    this.updateMovieList();
    this.updateTotalPages();
    if (this.state.idGuestSession) {
      this.getRating();
      this.setRating();
    }
    console.log('List mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title !== prevState.title) {
      this.updateMovieList();
      console.log('Title updated');
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

  getRating() {
    const { idGuestSession } = this.state;
    this.movieService.getRatedMovieList(idGuestSession).then((list) => {
      const rating = list.map((movie) => ({ movieId: movie.id, movieRating: movie.rating }));
      this.setState({ rating });
    });
  }

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
    this.movieService.getMovieList(title, page).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movies, page, totalPages, loading, error, rating } = this.state;
    const { idGuestSession } = this.props;
    console.log(rating);
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
          style={{ textAlign: 'center' }}
          onChange={this.onChangePage}
        />
      </>
    );
  }
}
