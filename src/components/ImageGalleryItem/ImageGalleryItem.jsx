import React from 'react';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({
  smallImageURL,
  largeImageURL,
  tags,
  onOpenModal,
}) {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        onOpenModal(largeImageURL);
      }}
    >
      <img className="ImageGalleryItem-image" src={smallImageURL} alt={tags} />
    </li>
  );
}
