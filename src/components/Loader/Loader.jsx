import React from 'react';
import { Watch } from 'react-loader-spinner';
import './Loader.css';

export default function Loader() {
  return (
    <div className="Loader">
      <Watch />
    </div>
  );
}
