import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert, Space, Tabs } from 'antd';

import TopTabs from '../top-tabs';
import MoviesService from '../../services/movie-service';
import RatedMovieList from '../rated-movie-list';
import SearchMovieList from '../search-movie-list';

import { GenresProvider } from '../genres-context';

import './app.css';

export default class App extends Component {
  movieService = new MoviesService();

  state = {
    idGuestSession: '',
    genres: [],
  };

  componentDidMount() {
    this.logInGuestSession();
    this.updateGenres();
  }

  logInGuestSession() {
    this.movieService.getGuestSession().then((id) => {
      this.setState({ idGuestSession: id });
    });
  }

  updateGenres() {
    this.movieService.getGenres().then((res) => {
      this.setState({ genres: res });
    });
  }

  render() {
    const { idGuestSession, genres } = this.state;
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <div>
            <Online>
              <TopTabs />
              <SearchMovieList idGuestSession={idGuestSession} />;
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
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <div>
            <Online>
              <TopTabs />
              <RatedMovieList idGuestSession={idGuestSession} />
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
        ),
      },
    ];
    return (
      <GenresProvider value={genres}>
        <Tabs defaultActiveKey="1" centered items={items} tabBarStyle={{ paddingTop: '13px' }} destroyInactiveTabPane />
      </GenresProvider>
    );
  }
}
