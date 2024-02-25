import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast('Enter the name of the picture');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus={true}
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
