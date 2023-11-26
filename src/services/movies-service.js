export default class MoviesService {
	async getResource(url) {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzRiOTIzOGU1OTExZDAyYTE2MjkzZDEzZmM4Zjk1ZCIsInN1YiI6IjY1NWY1Yjg0MWRiYzg4MDBlM2FmYWFkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uqgp0chNIuwKSqO19quB5NEq7ytjFOR3yFAY6We2Ywo',
			},
		}
		const res = await fetch(url, options)

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
		}

		return res.json()
	}

	async getMoviesList(title) {
		const res = await this.getResource(
			`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`
		)
    console.log('Success')
		return res.results
	}
}

const movies = new MoviesService()

movies.getMoviesList('return').then(list => {
	console.log(list)
})
