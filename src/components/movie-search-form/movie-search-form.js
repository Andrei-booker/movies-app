import { Component } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import './movie-search-form.css';

export default class MovieSearchForm extends Component {
  static propTypes = {
    updateTitle: PropTypes.func.isRequired,
  };

  func = debounce(() => {
    this.props.updateTitle(this.state.title);
  }, 750);

  state = {
    title: '',
  };

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
    this.func();
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateTitle(this.state.title);
    this.setState({ title: '' });
  };

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
