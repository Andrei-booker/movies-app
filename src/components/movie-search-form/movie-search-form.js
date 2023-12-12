import { Component } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import './movie-search-form.css';

export default class MovieSearchForm extends Component {
  static propTypes = {
    updateTitle: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  func = debounce(() => {
    this.props.updateTitle(this.state.title);
  }, 750);

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
    this.func();
  };

  onSubmit = (e) => e.preventDefault();

  render() {
    return (
      <form className="movie-form" onSubmit={this.onSubmit}>
        <input
          className="movie-input"
          placeholder="Type to search..."
          onChange={this.onTitleChange}
          value={this.state.title}
        />
      </form>
    );
  }
}
