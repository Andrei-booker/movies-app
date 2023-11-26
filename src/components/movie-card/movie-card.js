import React, { Component } from 'react'
import MoviesService from '../../services/movies-service'
import './movie-card.css'

export default class MovieCard extends Component {
	movieService = new MoviesService();

	state = {
		posterPath: null,
		title: null,
		releaseDate: null,
		genre: null,
		overview: null
	}

	constructor() {
		super();
		this.updateMoviesList();
	}

	updateMoviesList() {
		this.movieService.getMoviesList('return').then(list => {
			list.forEach(movie => {
				this.setState({
					posterPath: movie.poster_path,
					title: movie.title,
					releaseDate: movie.release_date,
					genre: 'Drama',
					overview: movie.overview
				})
			});
		})
	}

	render() {
		const {title, releaseDate, genre, overview, posterPath} = this.state
		return (
			<div className='movie-card'>
				<img
					alt='Movie poster'
					className='movie-card__image'
					src={`https://image.tmdb.org/t/p/w500${posterPath}`}
				/>
				<div>
					<h5 className='movie-card__title'>{title}</h5>
					<span className='movie-card__date'>{releaseDate}</span>
					<br />
					<button className='movie-card__button--genre'>{genre}</button>
					<button className='movie-card__button--genre'>{genre}</button>
					<p className='movie-card__overview'>{overview}</p>
				</div>
			</div>
		)
	}
	
}
