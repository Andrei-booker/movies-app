import MovieCard from '../movie-card'
import './movie-list.css'

function MovieList({list}) {
	const elements = list.map(movie => {
		const {id, ...movieProps} = movie;
		return (
			<li key={id}>
				<MovieCard {...movieProps}/>
			</li>
		)
	})
	return (
		<ul className='movie-list'>{elements}</ul>
	)
}
export default MovieList;