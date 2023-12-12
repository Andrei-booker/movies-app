import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert, Space, Tabs } from 'antd';

import TopTabs from '../top-tabs';
import MoviesService from '../../services/movie-service';
import RatedMovieList from '../rated-movie-list';
import SearchMovieList from '../search-movie-list';

import { MovieServiceProvider } from '../movie-service-context';

import './app.css';

export default class App extends Component {
  movieService = new MoviesService();

  state = {
    idGuestSession: '',
  };

  componentDidMount() {
    this.logInGuestSession();
    console.log('App mounted');
    console.log(this.state.idGuestSession);
  }

  logInGuestSession() {
    this.movieService.getGuestSession().then((id) => {
      this.setState({ idGuestSession: id });
      console.log('Got ID');
    });
  }

  render() {
    const { idGuestSession } = this.state;
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
      <MovieServiceProvider value={{}}>
        <Tabs defaultActiveKey="1" centered items={items} tabBarStyle={{ paddingTop: '13px' }} destroyInactiveTabPane />
      </MovieServiceProvider>
    );
  }
}
