import React, { Component } from 'react'
import { format } from 'date-fns'

import './movie-card.css'

export default class MovieCard extends Component {
	formatDate(date) {
		if(date) return format(new Date(date), 'MMMM dd, yyyy')
	}

	hiddenText(text) {
		const wordsArr = text.split(' ');
		const wordsCount = wordsArr.length;
		if (wordsCount > 46) {
			let cutArr = wordsArr.slice(0, 45);
			const cuttingText = `${cutArr.join(' ')}...`;
			return cuttingText;
		}
		return text;
	}

	render() {
		const { title, releaseDate, genre, overview, posterPath } = this.props
		let imageUrl = null
		if (posterPath === null)
			imageUrl =
				'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
		else imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
		return (
			<div className='movie-card'>
				<img alt='Movie poster' className='movie-card__image' src={imageUrl} />
				<div>
					<h5 className='movie-card__title'>{title}</h5>
					<span className='movie-card__date'>
						{this.formatDate(releaseDate)}
					</span>
					<br />
					<button className='movie-card__button--genre'>{genre}</button>
					<button className='movie-card__button--genre'>{genre}</button>
					<p className='movie-card__overview'>{this.hiddenText(overview)}</p>
				</div>
			</div>
		)
	}
}
