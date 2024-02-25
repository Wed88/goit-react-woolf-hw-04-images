import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast('Enter the name of the picture');
      return;
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
