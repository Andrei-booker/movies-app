import { Component } from 'react';

import TopTabs from '../top-tabs';
import MovieSearchForm from '../movie-search-form';
import MovieList from '../movie-list';
import Pagination from '../pagination';
import MoviesService from '../../services/movies-service';

export default class App extends Component {
  movieService = new MoviesService();

  state = {
    movies: [],
  };

  constructor() {
    super();
    this.updateMovieList('return');
  }

  updateMovieList(title) {
    this.movieService.getMovieList(title).then((movieList) => {
      this.setState({
        movies: movieList.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          releaseDate: movie.release_date,
          genre: 'Drama',
          overview: movie.overview,
        })),
      });
    });
  }

  render() {
    return (
      <div>
        <TopTabs />
        <MovieSearchForm />
        <MovieList list={this.state.movies} />
        <Pagination />
      </div>
    );
  }
}
