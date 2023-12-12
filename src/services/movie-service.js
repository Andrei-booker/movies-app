export default class MoviesService {
  APIKEY = 'api_key=80747e906d18f776d84716d50f6a0acd';

  async getResource(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} received ${res.status}`);
    }
    return res.json();
  }

  async postRating(value, movieId, idGuestSession) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${value}}`,
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${idGuestSession}&${this.APIKEY}`,
      options
    );

    if (!res.ok) {
      throw new Error(`Could not fetch: ${res.status}`);
    }
    return res.json();
  }

  async getGuestSession() {
    const res = await this.getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?${this.APIKEY}`);
    console.log(res);
    return res.guest_session_id;
  }

  async getTotalPages(title) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=en-US&page=1&${this.APIKEY}`
    );
    return res.total_results;
  }

  async getRatedTotalPages(idGuestSession) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${idGuestSession}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&${this.APIKEY}`
    );
    return res.total_results;
  }

  async getMovieList(title, page = 1) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=en-US&page=${page}&${this.APIKEY}`
    );
    console.log(res);
    return res.results.map(this.getMovieData);
  }

  async getRatedMovieList(idGuestSession) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${idGuestSession}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&${this.APIKEY}`
    );
    console.log(res);
    return res.results.map(this.getMovieData);
  }

  getMovieData = (movie) => ({
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
    releaseDate: movie.release_date,
    genre: 'Drama',
    overview: movie.overview,
    rating: movie.rating,
  });
}
