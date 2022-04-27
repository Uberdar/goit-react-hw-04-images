import { useState } from 'react';
import { toast } from 'react-toastify';

export default function HooksSearchFrom({ whenSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (pictureName.trim() === '') {
      toast.error('Enter picture name');
      return;
    }
    whenSubmit(pictureName);
    setPictureName('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          Search
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
