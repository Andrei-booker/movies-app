import React from 'react'

import TopTabs from '../top-tabs'
import MovieSearchForm from '../movie-search-form'
import MovieList from '../movie-list'
import Pagination from '../pagination'

// import './app.css'

const App = () => {
	return (
		<div>
			<TopTabs />
			<MovieSearchForm />
			<MovieList />
			<Pagination />
		</div>
	)
}

export default App
