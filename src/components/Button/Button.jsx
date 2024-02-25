import React from 'react';
import './Button.css';

export default function Button({ onClick }) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  );
}
