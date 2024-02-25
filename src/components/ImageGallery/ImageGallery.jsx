import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

export default function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImageURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
}
