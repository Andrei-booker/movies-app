import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert, Space } from 'antd';

import TopTabs from '../top-tabs';
import MovieSearchForm from '../movie-search-form';
import MovieList from '../movie-list';
import Pagination from '../pagination';
import MoviesService from '../../services/movie-service';

export default class App extends Component {
  movieService = new MoviesService();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.updateMovieList('return');
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies, loading: false });
  };

  updateMovieList(title) {
    this.movieService.getMovieList(title).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { loading, movies, error } = this.state;
    return (
      <div>
        <Online>
          <TopTabs />
          <MovieSearchForm />
          <MovieList list={movies} loading={loading} error={error} />
          <Pagination />
        </Online>
        <Offline>
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Alert type="error" message="No Internet" banner />
          </Space>
        </Offline>
      </div>
    );
  }
}
