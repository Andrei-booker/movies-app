import { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Rate } from 'antd';

import MoviesService from '../../services/movie-service';

import './movie-card.css';
import Genre from '../movie-genre';

export default class MovieCard extends Component {
  movieService = new MoviesService();

  static defaultProps = {
    posterPath: '',
    rating: 0,
    vote: 0,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    movieId: PropTypes.number.isRequired,
    idGuestSession: PropTypes.string.isRequired,
    rating: PropTypes.number,
    vote: PropTypes.number,
    genre: PropTypes.array.isRequired,
  };

  state = {
    movieId: 0,
    idGuestSession: this.props.idGuestSession,
    rating: this.props.rating,
  };

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movieId !== prevState.movieId) {
      this.updateState();
    }
    if (this.props.idGuestSession !== prevProps.idGuestSession) {
      this.updateState();
    }
    if (this.state.rating !== prevState.rating) {
      this.updateState();
    }
  }

  postRating(rating) {
    const { movieId, idGuestSession } = this.state;
    this.movieService.postRating(rating, movieId, idGuestSession);
  }

  updateState() {
    this.setState({
      movieId: this.props.movieId,
      idGuestSession: this.props.idGuestSession,
      rating: this.props.rating,
    });
  }

  formatDate(date) {
    if (date) return format(new Date(date), 'MMMM dd, yyyy');
  }

  hiddenOverview(text) {
    if (text) {
      const wordsArr = text.split('');
      const wordsCount = wordsArr.length;
      if (wordsCount > 170) {
        const cutArr = wordsArr.slice(0, 170);
        const cuttingText = `${cutArr.join('')}...`;
        return cuttingText;
      }
    }
    return text;
  }

  hiddenTitle(text) {
    if (text) {
      const wordsArr = text.split('');
      const wordsCount = wordsArr.length;
      if (wordsCount > 20) {
        const cutArr = wordsArr.slice(0, 19);
        const cuttingText = `${cutArr.join('')}...`;
        return cuttingText;
      }
    }
    return text;
  }

  render() {
    const { title, releaseDate, overview, posterPath, vote, genre } = this.props;
    const { rating, movieId } = this.state;
    const shortVote = vote < 10 ? vote.toFixed(1) : vote;
    let voteColor = '';
    if (vote <= 3) {
      voteColor = 'red';
    } else if (vote <= 5) {
      voteColor = 'orange';
    } else if (vote <= 7) {
      voteColor = 'yellow';
    } else voteColor = 'green';
    let imageUrl = null;
    if (posterPath === null)
      imageUrl =
        'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
    else imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
      <div className="movie-card">
        <img alt="Movie poster" className="movie-card__image" src={imageUrl} />
        <div className="movie-card__right-side">
          <div className="movie-card__top">
            <h5 className="movie-card__title">{this.hiddenTitle(title)}</h5>
            <div className={`movie-card__vote vote--${voteColor}`}>{shortVote}</div>
          </div>
          <span className="movie-card__date">{this.formatDate(releaseDate)}</span>
          <Genre genre={genre} movieId={movieId} />
          <p className="movie-card__overview">{this.hiddenOverview(overview)}</p>
          <Rate
            allowHalf
            defaultValue={rating}
            count={10}
            className="rate"
            onChange={(value) => this.postRating(value)}
          />
        </div>
      </div>
    );
  }
}
