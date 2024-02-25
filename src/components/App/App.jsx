import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import api from 'services/pixabayApi';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    async function fetchImages() {
      setIsLoading(true);

      try {
        const data = await api.fetchImageNameWithQuery(imageName, page);

        if (data.hits.length === 0) {
          toast.error(
            'Ops, there are no images matching your search query. Please try again.'
          );

          return;
        }

        if (page * 12 >= data.totalHits) {
          toast.warn(
            'We are sorry, but you  reached the end of search results.'
          );
        }

        page === 1
          ? setImages(data.hits)
          : setImages(prevState => {
              return [...prevState, ...data.hits];
            });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [imageName, page]);

  const toggleModal = largeImageURL => {
    setShowModal(prevValue => !prevValue);
    setLargeImageURL(largeImageURL);
  };

  const handleSearchbarSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const handleIncrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={toggleModal} />
      )}
      {images.length > 0 && images.length % 12 === 0 && (
        <Button onClick={handleIncrementPage} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
